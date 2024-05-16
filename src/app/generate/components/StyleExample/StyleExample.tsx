import { Button, Flex } from "@components";
import { UI_CONSTS } from "@consts";
import { PhotoTypes } from "@types";
import Image from "next/image";

const StyleExample = ({ type, selected, onClick, idx }: StyleExampleProps) => {
  const isSelected = selected === type;

  return (
    <Flex
      direction={"column"}
      ml={idx === 0 ? 0 : 12}
      flex={1}
      onClick={() => onClick(type)}
      cursor={"pointer"}
    >
      <Image
        src={`/images/process_type_example/${
          type === "FEMALE" ? "F" : "M"
        }.png`}
        alt="Process Type Example"
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        style={{
          outline: isSelected
            ? `5px solid ${UI_CONSTS.THEME["YONSEI_NAVY"]}`
            : undefined,
          borderRadius: 40,
          opacity: selected !== null && !isSelected ? 0.2 : 1,

          width: "100%",
          flex: 1,
        }}
      />
      <Button
        mt={20}
        type={isSelected ? "NAVY" : "WHITE"}
        onClick={() => undefined}
        title={type}
      />
    </Flex>
  );
};

const IMAGE_WIDTH = 160 * 2;
const IMAGE_HEIGHT = 220 * 2;

type StyleExampleProps = {
  type: PhotoTypes.ProcessType;
  selected: PhotoTypes.ProcessType | null;
  onClick: (type: PhotoTypes.ProcessType | null) => void;
  idx: number;
};

export default StyleExample;
