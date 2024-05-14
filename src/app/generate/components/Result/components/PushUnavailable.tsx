import { Button, Flex, Text } from "@components";
import { copyLink } from "../utils";

const PushUnavailable = () => {
  return (
    <Flex w="100%" p={20} direction={"column"}>
      <Text
        type={"16_Light_Multi"}
        color={"YONSEI_NAVY"}
        mb={14}
        textAlign={"center"}
      >{`잠시 후 독수리 사진관에 다시 들어오면\n완성된 결과를 볼 수 있어요!`}</Text>
      <Button
        type={"NAVY_GRADIENT"}
        title={"내 링크 복사해두기"}
        onClick={copyLink}
        icon={"copy"}
      />
    </Flex>
  );
};

export default PushUnavailable;
