import { Flex, Text } from "@components";

const ScreenTemplate = ({
  children,
  mention,
}: {
  children: React.ReactNode[];
  mention: string;
}) => {
  return (
    <Flex w="100%" h={"100dvh"} direction={"column"}>
      {children[0]}
      <Flex w="100%" direction={"row"} px={20}>
        <img
          src={"/images/talking_eagle.svg"}
          width={66.32}
          height={62.98}
          style={{ width: 66.32, height: 62.98 }}
        />
        <Flex ml={8} flex={1}>
          <Flex
            bgRgbColor={"#FFFFFFB2"}
            border={"1px solid white"}
            borderRadius={8}
            flex={1}
            py={18}
            pl={22}
          >
            <Text type={"14_Light_Multi"} color={"YONSEI_NAVY"}>
              {mention}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        direction={"column"}
        flex={1}
        overflow={"hidden"}
        justifyContent={"space-between"}
      >
        <Flex
          direction={"column"}
          w="100%"
          overflowY={"scroll"}
          alignItems={"center"}
        >
          {children[1]}
        </Flex>
        {children[2]}
      </Flex>
    </Flex>
  );
};

export default ScreenTemplate;
