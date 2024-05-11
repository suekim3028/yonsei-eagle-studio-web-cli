import { Button, Flex, Text } from "@components";

const NotiSection = ({ onClick }: { onClick: () => void }) => {
  return (
    <Flex direction={"column"} py={20} w="100%" alignItems={"center"}>
      <Text type="16_Light_Single" color="YONSEI_NAVY">
        이미지가 완성되면 알려드릴까요?
      </Text>
      <Button
        type={"NAVY_GRADIENT"}
        title={"알림 받기"}
        icon={"bell"}
        stretch
        size={"L"}
        mt={14}
        onClick={onClick}
      />
    </Flex>
  );
};

export default NotiSection;
