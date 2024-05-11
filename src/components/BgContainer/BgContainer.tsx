import { Flex } from "@components";
import React from "react";
import * as S from "./styles";

const BgContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="100%" h="100%" bgColor={"BABY_BLUE"} position={"relative"}>
      <S.Circle />
      <Flex zIndex={1} direction={"column"} w="100dvw" h="100dvh">
        {children}
      </Flex>
    </Flex>
  );
};
// /* Ellipse 2073 */

// position: absolute;
// width: 488px;
// height: 488px;
// left: -56px;
// top: 125px;

// background: #D0E9FF;
// filter: blur(34.1px);

export default BgContainer;
