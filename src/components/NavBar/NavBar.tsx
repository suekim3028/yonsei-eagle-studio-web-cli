"use client";
import { Flex } from "@components";
import Icon from "../Icon/Icon";
import { L } from "@web-core";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  return (
    <Flex justifyContent={"space-between"} py={12} px={20} w={"100%"}>
      <Flex
        p={8}
        alignItems={"center"}
        justifyContent={"center"}
        bgColor={"WHITE"}
        boxShadow={"0px 0px 20px 0px rgba(141, 202, 255, 0.4)"}
        borderRadius={40}
        onClick={router.back}
      >
        <Icon name="arrow_left" size={20} />
      </Flex>
    </Flex>
  );
};

export default NavBar;
