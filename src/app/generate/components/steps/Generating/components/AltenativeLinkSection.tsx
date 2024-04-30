import { Button, Flex, Text } from "@components";

const AlternativeLinkSection = () => {
  return (
    <Flex w="100%" px={20}>
      <Flex direction={"column"} flex={1} bgColor={"WHITE"} borderRadius={20}>
        <Text type={"14_Light_Multi"} color={"YONSEI_CHARCOAL"}>
          {`또는 내 링크를 복사해두면\n결과를 쉽게 확인할 수 있어요`}
        </Text>
        <Button title={"내 링크 복사"} type={"NAVY"} mt={12} icon="copy" />
      </Flex>
    </Flex>
  );
};

export default AlternativeLinkSection;
