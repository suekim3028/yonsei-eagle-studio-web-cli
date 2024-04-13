import { UiTypes } from "@types";
import Icon, { IconNames } from "../Icon/Icon";
import Text, { FontType } from "../Text";
import { L } from "@web-core";
import React from "react";

const TYPE_SETTINGS: Record<
  ButtonType,
  {
    backgroundStart: string;
    backgroundEnd: string;
    border?: string;
    textColor: UiTypes.ColorKey;
  }
> = {
  NAVY_GRADIENT: {
    backgroundStart: "#0043C6",
    backgroundEnd: "#002875",
    textColor: "WHITE",
  },
  BLUE: {
    backgroundStart: "#0099FF",
    backgroundEnd: "#0099FF",
    textColor: "WHITE",
  },
  NAVY: {
    backgroundStart: "#002875",
    backgroundEnd: "#002875",
    textColor: "WHITE",
  },
  WHITE: {
    backgroundStart: "#FFFFFFB2",
    backgroundEnd: "#FFFFFFB2",
    border: "WHITE",
    textColor: "YONSEI_NAVY",
  },
  BABY_GRAY: {
    backgroundStart: "#9CA7B8",
    backgroundEnd: "#9CA7B8",
    textColor: "WHITE",
  },
};

const SIZE_SETTINGS: Record<
  ButtonSize,
  {
    py: number;
    px: number;

    fontType: FontType;
    iconSize: number;
    iconMr: number;
  }
> = {
  L: { py: 18, px: 143, fontType: "18_Medium_Single", iconSize: 20, iconMr: 6 },
  M: { py: 14, px: 20, fontType: "16_Light_Single", iconSize: 20, iconMr: 6 },
  S: { py: 10, px: 16, fontType: "14_Light_Single", iconSize: 20, iconMr: 4 },
  XS: { py: 8, px: 12, fontType: "12_Light_Single", iconSize: 16, iconMr: 4 },
};

const Button = ({
  title,
  type,
  size = "L",
  icon,
  stretch,
  ...props
}: ButtonProps) => {
  const { backgroundStart, backgroundEnd, textColor, border } =
    TYPE_SETTINGS[type];
  const { py, px, fontType, iconSize, iconMr } = SIZE_SETTINGS[size];

  return (
    <L.Flex
      w={stretch ? "100%" : undefined}
      background={`linear-gradient(90deg, ${backgroundStart}, ${backgroundEnd})`}
      py={`${py}px`}
      px={stretch ? undefined : `${px}px`}
      //   flexBasis={"fit-content"}
      justifyContent={"center"}
      alignItems={"center"}
      borderRadius={"40px"}
      border={border ? `1px solid ${border}` : undefined}
      {...props}
    >
      {!!icon && <Icon name={icon} size={iconSize} mr={`${iconMr}px`} />}
      <Text type={fontType} color={textColor}>
        {title}
      </Text>
    </L.Flex>
  );
};

type ButtonType = "NAVY_GRADIENT" | "BLUE" | "NAVY" | "WHITE" | "BABY_GRAY";
type ButtonSize = "L" | "M" | "S" | "XS";
type ButtonProps = {
  title: string;
  type: ButtonType;
  size?: ButtonSize;
  icon?: IconNames;
  stretch?: boolean;
  onClick?: () => void;
} & L.SpaceProps;

export default React.memo(Button);
