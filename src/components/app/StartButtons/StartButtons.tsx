import { Flex } from "@components";
import Button from "@components/Button/Button";

const StartButtons = () => {
  return (
    <Flex p={"20px 60px"} w={"100%"} direction={"column"} alignItems={"center"}>
      <Button
        title={"시작하기"}
        type={"NAVY_GRADIENT"}
        stretch
        href={"/sign-in"}
      />
      <Button title={"친구에게 알려주기"} type={"WHITE"} size={"M"} mt={8} />
    </Flex>
  );
};

export default StartButtons;
