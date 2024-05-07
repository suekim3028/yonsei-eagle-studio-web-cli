import { useStepContext } from "@app/generate/StepContext";
import { Flex, Text } from "@components";
import { WebPushManager } from "@lib";
import { commonHooks, jsUtils } from "@web-core";

const UploadingPhotos = () => {
  const { goNext } = useStepContext();

  commonHooks.useAsyncEffect(async () => {
    //TODO: api 붙이기
    await Promise.all([jsUtils.wait(3), WebPushManager.initialize()]);
    goNext("UPLOADING_PHOTOS");
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
