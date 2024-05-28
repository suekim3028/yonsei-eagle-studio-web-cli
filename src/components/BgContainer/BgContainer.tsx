import { Flex } from "@components";
import React from "react";
import S from "./styles.module.css";
const BgContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="100%" h="100%" bgColor={"BABY_BLUE"} position={"relative"}>
      <div className={S.circle} />
      <Flex zIndex={1} direction={"column"} w="100dvw" h="100dvh">
        {children}
      </Flex>
    </Flex>
  );
};

export default BgContainer;
