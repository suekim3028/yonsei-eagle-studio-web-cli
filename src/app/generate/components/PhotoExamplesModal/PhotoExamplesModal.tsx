import { Button, Flex, UploadPhotoExamples } from "@components";
import { ModalManager } from "@web-core";

const PhotoExamplesModal = () => {
  return (
    <Flex
      pt={28}
      direction={"column"}
      w="100%"
      flex={1}
      alignItems={"center"}
      bgColor={"WHITE"}
      borderTopRadius={20}
    >
      <UploadPhotoExamples />
      <Flex w="100%" p={20}>
        <Button
          title="닫기"
          type={"BABY_GRAY"}
          onClick={ModalManager.close}
          stretch
        />
      </Flex>
    </Flex>
  );
};

export default PhotoExamplesModal;
