import { photoApis } from "@apis";
import { useStepContext } from "@app/generate/StepContext";
import { photoRequestState } from "@atoms";
import { Flex, Text } from "@components";
import { useErrorModal } from "@hooks";
import { WebPushManager } from "@lib";
import { commonHooks } from "@web-core";
import { useRef } from "react";
import { useSetRecoilState } from "recoil";

const UploadingPhotos = () => {
  const { goNext, photos, goPrev } = useStepContext();

  const setPhotoRequest = useSetRecoilState(photoRequestState);
  const { showError } = useErrorModal();

  const uploadPhotos = async () => {
    try {
      const photoIds = await Promise.all(
        photos.slice(0, 1).map(
          (photo) =>
            new Promise(async (resolve: (photoId: string) => void, reject) => {
              console.log("===1===", { photo });

              const { data: imageIdData, isError: linkIdError } =
                await photoApis.getPhotoLinkId();

              console.log("===2===", imageIdData);

              if (linkIdError) {
                reject();
                return;
              }

              const formData = new FormData();
              formData.append("Filedata", photo);

              console.log("===3===", formData);

              const { data: photoUpload, isError: photoUploadError } =
                await photoApis.uploadPhoto({
                  imageId: imageIdData.imageId,
                  data: formData,
                });

              console.log("===4===", { photoUploadError, photoUpload });

              if (!photoUploadError) reject();

              resolve(imageIdData.imageId);
            })
        )
      );
      console.log("===6===", photoIds);

      return photoIds;
    } catch (e) {
      handleError();
      return null;
    }
  };

  const handleError = () => {
    // TODO: 에러 보여주기
    showError("이미지 생성 요청에 실패했어요. ");
    goPrev("UPLOADING_PHOTOS");
  };

  const firstRender = useRef(false);
  commonHooks.useAsyncEffect(async () => {
    if (firstRender.current) return;
    firstRender.current = true;

    WebPushManager.initialize();
    const photoIds = await uploadPhotos();
    if (!photoIds) return;
    const { isError: uploadPhotoError } = await photoApis.createPhotoRequest({
      imageList: photoIds,
      imageProcessType: "NORMAL",
    });

    console.log("===7===", uploadPhotoError);
    if (uploadPhotoError) return handleError();

    const { data: photoRequest, isError: requestPhotoError } =
      await photoApis.getPhotoRequest();

    console.log("===8===", { photoRequest });

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
