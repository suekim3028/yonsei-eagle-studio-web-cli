import { Flex } from "@components";
import { L } from "@web-core";

const Icon = ({ name, size, ...flexProps }: IconsProps) => {
  return (
    <Flex {...flexProps}>
      <img
        src={`/icons/${name}.${PNG_ICON_NAMES.includes(name) ? "png" : "svg"}`}
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    </Flex>
  );
};

const SVG_ICON_NAMES = [
  "kakaotalk",
  "arrow_left",
  "chevron_right",
  "eye",
  "gallery",
  "copy",
  "bell",
  "lock",
  "instagram",
  "confetti",
] as const;

const PNG_ICON_NAMES = ["kakaotalk"];

export const ICON_NAMES = [...SVG_ICON_NAMES, ...PNG_ICON_NAMES] as const;

export type IconNames = (typeof ICON_NAMES)[number];

type IconsProps = {
  name: IconNames;
  size: number;
} & Pick<L.FlexProps, "m" | "mr" | "ml" | "mt" | "mb" | "mx" | "my">;

export default Icon;
