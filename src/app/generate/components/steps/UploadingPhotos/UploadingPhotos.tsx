import { photoApis } from "@apis";
import { useStepContext } from "@app/generate/StepContext";
import { photoRequestState } from "@atoms";
import { Flex, Text } from "@components";
import { WebPushManager } from "@lib";
import { commonHooks } from "@web-core";
import { useRef } from "react";
import { useSetRecoilState } from "recoil";

const UploadingPhotos = () => {
  const { goNext, photos, goPrev } = useStepContext();

  const setPhotoRequest = useSetRecoilState(photoRequestState);

  const uploadPhotos = async () => {
    const photoIds = await Promise.all(
      photos.map(
        (photo) =>
          new Promise(async (resolve: (photoId: string) => void, reject) => {
            const { data: imageIdData, isError: linkIdError } =
              await photoApis.getPhotoLinkId();
            if (linkIdError) {
              reject();
              return;
            }

            const formData = new FormData();
            formData.append("Filedata", photo);

            const { isError: photoUploadError } = await photoApis.uploadPhoto({
              imageId: imageIdData.imageId,
              data: formData,
            });

            if (!photoUploadError) reject();

            resolve(imageIdData.imageId);
          })
      )
    );

    return photoIds;
  };

  const handleError = () => {
    // TODO: 에러 보여주기
    goPrev("UPLOADING_PHOTOS");
  };

  const firstRender = useRef(false);
  commonHooks.useAsyncEffect(async () => {
    if (firstRender.current) return;
    firstRender.current = true;

    WebPushManager.initialize();
    const photoIds = await uploadPhotos();
    const { isError: uploadPhotoError } = await photoApis.createPhotoRequest({
      imageList: photoIds,
      imageProcessType: "NORMAL",
    });

    if (uploadPhotoError) return handleError();

    const { data: photoRequest, isError: requestPhotoError } =
      await photoApis.getPhotoRequest();
    if (requestPhotoError) return handleError();

    setPhotoRequest(photoRequest);
  }, []);

  return (
    <Flex w="100%" h="100%" alignItems={"center"} justifyContent={"center"}>
      <Text type="16_Light_Multi" color="YONSEI_NAVY">
        독수리가 사진을 전달하는 중... 🦅
      </Text>
    </Flex>
  );
};

export default UploadingPhotos;
