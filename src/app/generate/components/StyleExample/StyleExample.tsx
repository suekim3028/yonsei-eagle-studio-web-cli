import { Button, Flex } from "@components";
import { UI_CONSTS } from "@consts";

const StyleExample = ({
  style,
  selectedStyle,
  onClick,
  idx,
}: StyleExampleProps) => {
  const isSelected = selectedStyle === style;
  return (
    <Flex
      direction={"column"}
      ml={idx === 0 ? 0 : 12}
      flex={1}
      onClick={() => onClick(style)}
      cursor={"pointer"}
    >
      <img
        src={`images/style_${style === "A" ? "a" : "b"}.png`}
        width={"100%"}
        style={{
          outline: isSelected
            ? `5px solid ${UI_CONSTS.THEME["YONSEI_NAVY"]}`
            : undefined,
          borderRadius: 40,
          opacity: selectedStyle !== null && !isSelected ? 0.2 : 1,
        }}
      />
      <Button
        mt={20}
        type={isSelected ? "NAVY" : "WHITE"}
        onClick={() => undefined}
        title={style}
      />
    </Flex>
  );
};

type StyleExampleProps = {
  style: "A" | "B";
  selectedStyle: "A" | "B" | null;
  onClick: (style: "A" | "B" | null) => void;
  idx: number;
};

export default StyleExample;
