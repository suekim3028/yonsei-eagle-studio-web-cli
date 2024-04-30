import { Flex } from "@components";
import { L } from "@web-core";

const Icon = ({ name, size, ...flexProps }: IconsProps) => {
  return (
    <Flex {...flexProps}>
      <img
        src={`/icons/${name}.svg`}
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    </Flex>
  );
};

export type IconNames =
  | "kakaotalk"
  | "arrow_left"
  | "chevron_right"
  | "eye"
  | "gallery"
  | "copy";

type IconsProps = {
  name: IconNames;
  size: number;
} & Pick<L.FlexProps, "m" | "mr" | "ml" | "mt" | "mb" | "mx" | "my">;

export default Icon;
