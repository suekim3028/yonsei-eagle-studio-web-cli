import { Flex } from "@components";
import { L } from "@web-core";
import Image from "next/image";

const Icon = ({ name, size, ...flexProps }: IconsProps) => {
  return (
    <Flex {...flexProps}>
      <Image
        alt={`${name} icon`}
        src={`/icons/${name}.svg`}
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    </Flex>
  );
};

export const ICON_NAMES = [
  "kakaotalk",
  "arrow_left",
  "chevron_right",
  "eye",
  "gallery",
  "copy",
  "bell",
  "lock",
  "instagram",
] as const;
export type IconNames = (typeof ICON_NAMES)[number];

type IconsProps = {
  name: IconNames;
  size: number;
} & Pick<L.FlexProps, "m" | "mr" | "ml" | "mt" | "mb" | "mx" | "my">;

export default Icon;
