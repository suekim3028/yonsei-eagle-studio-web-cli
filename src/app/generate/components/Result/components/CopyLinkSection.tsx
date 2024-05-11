import { Button, Flex, Text } from "@components";
import { copyLink } from "../utils";

const CopyLinkSection = () => {
  return (
    <Flex direction={"column"} w="100%" alignItems={"center"} px={20}>
      <Text
        type={"16_Light_Multi"}
        color={"YONSEI_NAVY"}
      >{`잠시 후 독수리 사진관에 다시 들어오면\n완성된 결과를 볼 수 있어요!`}</Text>
      <Button
        type="NAVY_GRADIENT"
        title={"내 링크 복사해두기"}
        icon="copy"
        onClick={copyLink}
      />
    </Flex>
  );
};
