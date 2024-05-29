"use client";
import { Button, Flex, Text } from "@components";
import { ModalManager, commonHooks } from "@web-core";
import Image from "next/image";
import { useState } from "react";

const ErrorModal = ({
  title,
  body,
  yesText,
  noText,
  onPressYes,
  onPressNo,
  positive,
  wait,
}: ErrorModalProps) => {
  const { close } = ModalManager;
  const [leftSeconds, setLeftSeconds] = useState(wait ? 2 : 0);

  const handleClick = (fn?: () => void) => {
    if (leftSeconds > 0) return;
    close();
    fn && fn();
  };

  commonHooks.useSecondEffect(2, (times) => {
    if (wait) setLeftSeconds(2 - times - 1);
  });

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      w="100%"
    >
      <Image
        alt="crying eagle"
        src={
          positive ? "/images/talking_eagle.png" : "/images/crying_eagle.svg"
        }
        width={80}
        height={80}
        style={{ width: 80, height: 80 }}
      />
      <Flex
        direction={"column"}
        bgColor={"WHITE"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={20}
        py={24}
        mx={20}
        px={40}
        flex={1}
      >
        {!!title && (
          <Text
            type={"18_Medium_Multi"}
            color="YONSEI_NAVY"
            mb={20}
            textAlign={"center"}
          >
            {title}
          </Text>
        )}
        <Text type="16_Light_Multi" color="YONSEI_NAVY" textAlign={"center"}>
          {body}
        </Text>
        <Flex w="100%" mt={20} direction={"column"} alignItems={"center"}>
          <Button
            stretch
            disabled={leftSeconds > 0}
            title={`${
              wait && leftSeconds > 0 ? `(${leftSeconds}) ` : ""
            }${yesText}`}
            onClick={() => {
              handleClick(onPressYes);
            }}
            type={"NAVY"}
            size="M"
          />
          {!!noText && (
            <Text
              mt={12}
              type={"16_Light_Single"}
              color="YONSEI_CHARCOAL"
              onClick={() => {
                handleClick(onPressNo);
              }}
            >
              {noText}
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export type ErrorModalProps = {
  title?: string;
  body: string;
  yesText: string;
  noText?: string;
  onPressYes?: () => void;
  onPressNo?: () => void;
  positive?: boolean;
  wait?: boolean;
};

export default ErrorModal;
