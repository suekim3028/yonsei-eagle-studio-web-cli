import { photoApis } from "@apis";
import { useStepContext } from "@app/generate/StepContext";
import { Flex, Text } from "@components";
import { useErrorModal, useRefetchUser } from "@hooks";
import { WebPushManager } from "@lib";
import { commonHooks, jsUtils } from "@web-core";
import { useRef } from "react";

const UploadingPhotos = () => {
  const { goNext, photos, goPrev, imageProcessType } = useStepContext();

  const { showError } = useErrorModal();
  const refetchUser = useRefetchUser();

  const uploadPhotos = async (
    index: number,
    array: string[]
  ): Promise<string[]> => {
    if (index >= photos.length) return array;
    const photoFile = photos[index];
    const image = await jsUtils.fileToImage(photoFile);
    const photo = await jsUtils.resizeImage(image, 750, "Blob");
    image.remove();
    if (!photo) throw new Error();

    console.log("===1===", { photo });

    const { data: imageIdData, isError: linkIdError } =
      await photoApis.getPhotoLinkId();

    console.log("===2===", imageIdData);

    if (linkIdError) throw new Error();
    const formData = new FormData();
    formData.append("file", photo, "photo.png");

    console.log("===3===", formData);

    const { data: photoUpload, isError: photoUploadError } =
      await photoApis.uploadPhoto({
        imageId: imageIdData.imageId,
        data: formData,
      });

    console.log("===4===", { photoUploadError, photoUpload });

    if (photoUploadError) throw new Error();

    return uploadPhotos(index + 1, [...array, imageIdData.imageId]);
  };

  const handleError = () => {
    showError("이미지 생성 요청에 실패했어요. ");
    goPrev("UPLOADING_PHOTOS");
  };

  const firstRender = useRef(false);
  commonHooks.useAsyncEffect(async () => {
    if (firstRender.current) return;
    firstRender.current = true;

    WebPushManager.initialize();
    if (!imageProcessType) return;
    try {
      const photoIds = await uploadPhotos(0, []);
      console.log(photoIds);
      const { isError: createRequestError } =
        await photoApis.createPhotoRequest({
          imageList: photoIds,
          imageProcessType,
        });

      console.log("===7===", createRequestError);
      if (createRequestError) throw new Error();

      refetchUser();
    } catch (e) {
      return handleError();
    }
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
