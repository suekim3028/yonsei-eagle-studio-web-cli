"use client";

import { Flex } from "@components";
import Button from "@components/Button/Button";
import { commonUtils } from "@utils";
import { useRouter } from "next/navigation";

const StartButtons = () => {
  const router = useRouter();

  return (
    <Flex p={"20px 60px"} w={"100%"} direction={"column"} alignItems={"center"}>
      <Button
        title={"시작하기"}
        type={"NAVY_GRADIENT"}
        stretch
        onClick={() => {
          router.push("/generate");
        }}
      />
      <Button
        title={"친구에게 알려주기"}
        type={"WHITE"}
        size={"M"}
        mt={8}
        onClick={commonUtils.sharePage}
      />
    </Flex>
  );
};

export default StartButtons;
