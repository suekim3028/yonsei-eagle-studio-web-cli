import { UiTypes } from "@types";
import Icon, { IconNames } from "../Icon/Icon";
import Text, { FontType } from "../Text";
import { L } from "@web-core";
import React from "react";
import Link from "next/link";
import { Flex } from "@components";
import { UI_CONSTS } from "@consts";

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
  L: { py: 18, px: 20, fontType: "18_Medium_Single", iconSize: 32, iconMr: 6 },
  M: { py: 14, px: 20, fontType: "16_Light_Single", iconSize: 20, iconMr: 6 },
  S: { py: 10, px: 16, fontType: "14_Light_Single", iconSize: 20, iconMr: 4 },
  XS: { py: 8, px: 12, fontType: "12_Light_Single", iconSize: 16, iconMr: 4 },
};

const ButtonComponent = ({
  title,
  type,
  size = "L",
  icon,
  stretch,
  bgColor,
  bgRgbColor,
  textRgbColor,
  textColor,
  ...props
}: ButtonProps) => {
  const {
    backgroundStart,
    backgroundEnd,
    textColor: themeTextColor,
    border,
  } = TYPE_SETTINGS[type];
  const { py, px, fontType, iconSize, iconMr } = SIZE_SETTINGS[size];

  return (
    <Flex
      w={stretch ? "100%" : undefined}
      // flex={0}
      // flexGrow={0}

      background={
        bgColor
          ? UI_CONSTS.THEME[bgColor]
          : bgRgbColor ||
            `linear-gradient(90deg, ${backgroundStart}, ${backgroundEnd})`
      }
      py={`${py}px`}
      px={stretch ? undefined : `${px}px`}
      justifyContent={"center"}
      alignItems={"center"}
      borderRadius={"40px"}
      border={border ? `1px solid ${border}` : undefined}
      cursor={props.onClick ? "pointer" : undefined}
      {...props}
    >
      {!!icon && <Icon name={icon} size={iconSize} mr={`${iconMr}px`} />}

      <Text
        type={fontType}
        color={textColor || themeTextColor}
        colorRgb={textRgbColor}
      >
        {title}
      </Text>
    </Flex>
  );
};

const Button = ({ href, openInNewTab, ...buttonProps }: ButtonProps) => {
  if (!href) return <ButtonComponent {...buttonProps} />;

  return (
    <Link
      href={href}
      style={{ width: buttonProps.stretch ? "100%" : "fit-content" }}
      target={openInNewTab ? "_blank" : undefined}
    >
      <ButtonComponent {...buttonProps} />
    </Link>
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
} & L.SpaceProps & {
    bgColor?: UiTypes.ColorKey;
    bgRgbColor?: string;
    textColor?: UiTypes.ColorKey;
    textRgbColor?: string;
  } & (
    | {
        href?: undefined;
        openInNewTab?: undefined;
      }
    | {
        href?: string;
        openInNewTab?: boolean;
      }
  );

export default React.memo(Button);
