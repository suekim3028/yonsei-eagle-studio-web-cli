import { L } from "@web-core";

const FONT_SIZES = [12, 14, 16, 18, 20] as const;
type FontSize = (typeof FONT_SIZES)[number];

const FONT_WEIGHT_NAMES = ["Light", "Medium", "Bold"] as const;
type FontWeightName = (typeof FONT_WEIGHT_NAMES)[number];
const fontWeightValueObj: Record<FontWeightName, string> = {
  Light: "GongGothicLight",
  Bold: "GongGothicBold",
  Medium: "GongGothicMedium",
};

const LINE_HEIGHT_NAMES = ["Single", "Multi"] as const;
type LineHeightName = (typeof LINE_HEIGHT_NAMES)[number];
const lineHeightValueObj: Record<LineHeightName, string> = {
  Single: "120%",
  Multi: "160%",
};

type FontType = `${FontSize}_${FontWeightName}_${LineHeightName}`;

const factory = ((): L.TextComponentFactory<FontType> => {
  const _factory: L.TextComponentFactory<FontType> =
    {} as L.TextComponentFactory<FontType>;

  FONT_SIZES.forEach((fontSize) => {
    FONT_WEIGHT_NAMES.forEach((fontWeightName) => {
      LINE_HEIGHT_NAMES.forEach((lineHeightName) => {
        const fontType: FontType = `${fontSize}_${fontWeightName}_${lineHeightName}`;
        _factory[fontType] = {
          fontFamily: fontWeightValueObj[fontWeightName],
          fontSize,
          lineHeight:
            fontType === "18_Medium_Multi" || fontType === "20_Medium_Multi"
              ? "152%"
              : lineHeightValueObj[lineHeightName],
        };
      });
    });
  });
  return _factory;
})();

const Text = L.TextComponentGenerator(factory);

export default Text;
