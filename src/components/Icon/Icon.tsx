import { L } from "@web-core";

const Icon = ({ name, size, ...flexProps }: IconsProps) => {
  return (
    <L.Flex {...flexProps}>
      <img
        src={`/icons/${name}.svg`}
        width={size}
        height={size}
        style={{ width: size, height: size }}
      />
    </L.Flex>
  );
};

export type IconNames = "kakaotalk";

type IconsProps = {
  name: IconNames;
  size: number;
} & Pick<L.FlexProps, "m" | "mr" | "ml" | "mt" | "mb" | "mx" | "my">;

export default Icon;
