import { Flex, Text } from "@components";

const Loading = () => {
  return (
    <Flex p={20} alignItems={"center"} justifyContent={"center"}>
      <Text type={"20_Medium_Multi"}>로그인중!!!</Text>
      <Text type={"20_Medium_Multi"}>디자인 적용할 예정!!!</Text>
    </Flex>
  );
};

export default Loading;
