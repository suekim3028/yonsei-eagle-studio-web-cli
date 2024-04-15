import { useStepContext } from "@app/generate/StepContext";
import { Flex, Text } from "@components";
import { commonHooks, jsUtils } from "@web-core";

const UploadingPhotos = () => {
  const { goNext } = useStepContext();
  commonHooks.useAsyncEffect(async () => {
    await jsUtils.wait(3); //TODO: api 붙이기
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
