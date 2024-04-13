import Text from "@components/Text";
import { L } from "@web-core";
import React from "react";

const BUTTON_SETTINGS: Record<
  ButtonType,
  {
    backgroundStart: string;
    backgroundEnd: string;
    border?: string;
    textColor: string;
  }
> = {
  NAVY_GRADIENT: {
    backgroundStart: "#0043C6",
    backgroundEnd: "#002875",
    textColor: "#FFFFFF",
  },
  BLUE: {
    backgroundStart: "#0099FF",
    backgroundEnd: "#0099FF",
    textColor: "#FFFFFF",
  },
  NAVY: {
    backgroundStart: "#002875",
    backgroundEnd: "#002875",
    textColor: "#FFFFFF",
  },
  WHITE: {
    backgroundStart: "#FFFFFFB2",
    backgroundEnd: "#FFFFFFB2",
    border: "#FFFFFF",
    textColor: "#002875",
  },
  BABY_GRAY: {
    backgroundStart: "#9CA7B8",
    backgroundEnd: "#9CA7B8",
    textColor: "#FFFFFF",
  },
};

const Button = ({ title, type }: ButtonProps) => {
  const setting = BUTTON_SETTINGS[type];
  return (
    <L.Flex
      w={"100%"}
      background={`linear-gradient(90deg, ${setting.backgroundStart}, ${setting.backgroundEnd})`}
      py="18px"
      justifyContent={"center"}
      borderRadius={"40px"}
    >
      <Text type="18_Medium_Single" color={setting.textColor}>
        {title}
      </Text>
    </L.Flex>
  );
};

type ButtonType = "NAVY_GRADIENT" | "BLUE" | "NAVY" | "WHITE" | "BABY_GRAY";

type ButtonProps = {
  title: string;
  type: ButtonType;
};
export default React.memo(Button);
