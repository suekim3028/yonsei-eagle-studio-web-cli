"use client";
import { UserAtoms } from "@atoms";
import { Flex } from "@components";
import Button from "@components/Button/Button";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

const StartButtons = () => {
  const hasUser = useRecoilValue(UserAtoms.hasUserState);
  const router = useRouter();

  return (
    <Flex p={"20px 60px"} w={"100%"} direction={"column"} alignItems={"center"}>
      <Button
        title={"시작하기"}
        type={"NAVY_GRADIENT"}
        stretch
        onClick={() => {
          router.push(hasUser ? "/generate" : "/sign-in");
        }}
      />
      <Button title={"친구에게 알려주기"} type={"WHITE"} size={"M"} mt={8} />
    </Flex>
  );
};

export default StartButtons;
