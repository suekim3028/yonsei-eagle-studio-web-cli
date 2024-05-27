"use client";
import { BgContainer, Flex, Text } from "@components";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const ScreenTemplate = ({
  children,
  mention,
}: // anim,
{
  children: React.ReactNode[];
  mention: string;
  // anim?: boolean;
}) => {
  const [showStatus, setShowStatus] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setShowStatus(1);
    }, 200);
    setTimeout(() => {
      setShowStatus(2);
    }, 600);
    setTimeout(() => {
      setShowStatus(3);
    }, 1200);
  }, []);

  return (
    <BgContainer>
      {children[0]}
      <Flex w="100%" direction={"row"} px={20} mb={20}>
        <img
          className={styles.animation}
          alt={"talking eagle"}
          src={"/images/talking_eagle.png"}
          width={66.32}
          height={62.98}
          style={{
            width: 66.32,
            height: 62.98,
            opacity: showStatus >= 1 ? 1 : 0,
          }}
        />
        <Flex
          ml={8}
          w="100%"
          alignItems={"center"}
          className={styles.animation}
          opacity={showStatus >= 2 ? 1 : 0}
        >
          <Flex position={"relative"} zIndex={2} right={-1}>
            <div className={styles.triangle} />
            <div className={styles.inner_triangle} />
          </Flex>

          <Flex
            bgRgbColor={"#FFFFFFB2"}
            border={"1px solid white"}
            borderRadius={8}
            flex={1}
            mr={22.5}
            py={13.5}
            px={22}
            alignItems={"center"}
            alignSelf={"center"}
          >
            <Text type={"14_Light_Multi"} color={"YONSEI_NAVY"}>
              {mention}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        direction={"column"}
        flex={1}
        overflow={"hidden"}
        justifyContent={"space-between"}
        opacity={showStatus >= 3 ? 1 : 0}
        className={styles.animation_body}
      >
        <Flex
          direction={"column"}
          w="100%"
          overflowY={"scroll"}
          style={{ scrollbarWidth: "none" }}
          alignItems={"center"}
        >
          {children[1]}
        </Flex>
        {children[2]}
      </Flex>
    </BgContainer>
  );
};

export default ScreenTemplate;
