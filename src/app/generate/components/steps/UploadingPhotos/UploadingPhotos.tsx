import { photoApis } from "@apis";
import { useStepContext } from "@app/generate/StepContext";
import { Flex, Text } from "@components";
import { useUserContext } from "@contexts";
import { WebPushManager } from "@lib";
import { Player } from "@lottiefiles/react-lottie-player";
import Camera from "@public/lottie/camera.json";
import { commonUtils } from "@utils";
import { commonHooks, jsUtils } from "@web-core";
import { useRef } from "react";

const UploadingPhotos = () => {
  const { goNext, photos, goPrev, imageProcessType } = useStepContext();

  const { refreshUserInfo } = useUserContext();

  const uploadPhotos = async (
    index: number,
    array: string[]
  ): Promise<string[]> => {
    if (index >= photos.length) return array;
    const photoFile = photos[index];
    const image = await jsUtils.fileToImage(photoFile);
    const photo = await jsUtils.resizeImage(image, 750, "Blob");
    image.remove();

    if (!photo) {
      alert("사진 변환 실패");
      throw new Error();
    }

    console.log("===1===", { photo });

    const { data: imageIdData, isError: linkIdError } =
      await photoApis.getPhotoLinkId();

    console.log("===2===", imageIdData);

    if (linkIdError) {
      alert("링크 생성 에러");
      throw new Error();
    }
    const formData = new FormData();
    formData.append("file", photo, "photo.png");

    console.log("===3===", formData);

    const { isError: photoUploadError } = await photoApis.uploadPhoto({
      imageId: imageIdData.imageId,
      data: formData,
    });

    if (photoUploadError) {
      const { isError: photoUploadError2 } = await photoApis.uploadPhoto({
        imageId: imageIdData.imageId,
        data: formData,
      });
      if (photoUploadError2) {
        alert("사진 업로드 에러");

        throw new Error();
      }
    }

    await jsUtils.wait(0.5);
    return uploadPhotos(index + 1, [...array, imageIdData.imageId]);
  };

  const handleError = () => {
    commonUtils.showError("이미지 생성 요청에 실패했어요. ");
    goPrev("UPLOADING_PHOTOS");
  };

  const firstRender = useRef(false);
  commonHooks.useAsyncEffect(async () => {
    if (firstRender.current) return;
    firstRender.current = true;

    await Promise.all([
      new Promise((r: (value: null) => void) =>
        setTimeout(() => r(null), 2000)
      ),

      new Promise(async (r: (value: null) => void, reject) => {
        new WebPushManager().initialize();
        if (!imageProcessType) return;
        try {
          const photoIds = await uploadPhotos(0, []);
          console.log(photoIds);
          const { isError: createRequestError } =
            await photoApis.createPhotoRequest({
              imageList: photoIds,
              imageProcessType,
            });

          if (createRequestError) {
            const { isError: createRequestError2 } =
              await photoApis.createPhotoRequest({
                imageList: photoIds,
                imageProcessType,
              });

            console.log("===7.5===", createRequestError2);

            if (createRequestError2) {
              alert("사진 리퀘스트 에러");

              throw new Error();
            }
          }

          console.log("===7===", createRequestError);
          if (createRequestError) throw new Error();

          await refreshUserInfo();
          r(null);
        } catch (e) {
          handleError();
          reject();
        }
      }),
    ]);

    try {
      await refreshUserInfo();
    } catch (e) {
      handleError();
    }
  }, []);

  return (
    <Flex
      w="100%"
      h="100%"
      alignItems={"center"}
      justifyContent={"center"}
      flexDir={"column"}
    >
      <Text type="16_Light_Multi" color="YONSEI_NAVY">
        독수리가 사진을 전달하는 중... 🦅
      </Text>
      <Player
        autoplay
        loop
        src={Camera}
        style={{ width: "280px", height: "264px", marginTop: 20 }}
      />
    </Flex>
  );
};

export default UploadingPhotos;
