// "use client";
import { Flex } from "@components";
import Button from "@components/Button/Button";
import { L } from "@web-core";
import { redirect } from "next/navigation";

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
      <img
        src={"/images/main/ribbon_sticker.svg"}
        style={{ alignSelf: "flex-end" }}
      />
      <img
        src={"/images/main/gdsc_sticker.svg"}
        style={{ alignSelf: "flex-start" }}
      />
    </Flex>
  );
};

export default StartButtons;
