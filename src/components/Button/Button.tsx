import { UI_CONSTS } from "@consts";
import { L } from "@web-core";
import React from "react";
import Icon, { ICON_NAMES } from "../Icon/Icon";
import Text from "../Text";

const Button = L.ButtonComponentGenerator(
  {
    buttonTypes: [
      "NAVY_GRADIENT",
      "BLUE",
      "NAVY",
      "WHITE",
      "BABY_GRAY",
    ] as const,
    fontTypes: [
      "18_Medium_Single",
      "16_Light_Single",
      "14_Light_Single",
      "12_Light_Single",
    ] as const,
    iconNames: ICON_NAMES,
    colorSettings: UI_CONSTS.THEME,
  },

  {
    sizeSettings: {
      XL: {
        py: 18,
        px: 20,
        fontType: "18_Medium_Single",
        iconSize: 20,
        iconMr: 6,
      },
      L: {
        py: 18,
        px: 20,
        fontType: "18_Medium_Single",
        iconSize: 20,
        iconMr: 6,
      },
      M: {
        py: 14,
        px: 20,
        fontType: "16_Light_Single",
        iconSize: 20,
        iconMr: 6,
      },
      S: {
        py: 10,
        px: 16,
        fontType: "14_Light_Single",
        iconSize: 20,
        iconMr: 4,
      },
      XS: {
        py: 8,
        px: 12,
        fontType: "12_Light_Single",
        iconSize: 16,
        iconMr: 4,
      },
    },
    typeSettings: {
      NAVY_GRADIENT: {
        backgroundStart: "#0043C6",
        backgroundEnd: "#002875",
        textColor: "WHITE",
        disabledBgColor: "YONSEI_BABY_GRAY",
        disabledTextColor: "YONSEI_CHARCOAL",
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
    },
    colorSettings: UI_CONSTS.THEME,
    defaultSettings: {
      borderRadius: 20,
      defaultSize: "L",
    },
    renderIcon: (props) => <Icon {...props} />,
    renderText: ({ title, ...props }) => <Text {...props}>{title}</Text>,
  }
);
export default React.memo(Button);
