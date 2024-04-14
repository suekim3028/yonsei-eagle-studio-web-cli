"use client";

import { Flex, Icon } from "@components";

const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Flex
      p={8}
      alignItems={"center"}
      justifyContent={"center"}
      bgColor={"WHITE"}
      boxShadow={"0px 0px 20px 0px rgba(141, 202, 255, 0.4)"}
      borderRadius={40}
      onClick={onClick}
      cursor={"pointer"}
    >
      <Icon name="arrow_left" size={20} />
    </Flex>
  );
};

export default BackButton;
