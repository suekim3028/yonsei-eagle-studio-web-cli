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
  const { goNext, photos, goPrev, imageProcessType } = useStepContext();

  const setPhotoRequest = useSetRecoilState(photoRequestState);
  const { showError } = useErrorModal();

  const uploadPhotos = async (
    index: number,
    array: string[]
  ): Promise<string[]> => {
    if (index >= photos.length) return array;
    const photo = photos[index];

    console.log("===1===", { photo });

    const { data: imageIdData, isError: linkIdError } =
      await photoApis.getPhotoLinkId();

    console.log("===2===", imageIdData);

    if (linkIdError) throw new Error();

    const formData = new FormData();
    formData.append("Filedata", photo);

    console.log("===3===", formData);

    const { data: photoUpload, isError: photoUploadError } =
      await photoApis.uploadPhoto({
        imageId: imageIdData.imageId,
        data: formData,
      });

    console.log("===4===", { photoUploadError, photoUpload });

    // if (photoUploadError) throw new Error();

    return uploadPhotos(index + 1, [...array, index.toString()]);
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

      const { data: photoRequest, isError: requestPhotoError } =
        await photoApis.getPhotoRequest();

      console.log("===8===", { photoRequest });

      if (requestPhotoError) throw new Error();

      setPhotoRequest(photoRequest);
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
