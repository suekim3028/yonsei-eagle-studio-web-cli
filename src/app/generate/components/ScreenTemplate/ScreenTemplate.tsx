import { Flex } from "@components";

const ScreenTemplate = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <Flex w="100%" h={"100dvh"} direction={"column"}>
      {children[0]}
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
