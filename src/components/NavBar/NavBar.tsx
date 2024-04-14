"use client";
import { Flex } from "@components";
import { useRouter } from "next/navigation";
import BackButton from "../BackButton/BackButton";

const NavBar = ({ onClick }: { onClick?: () => void }) => {
  const router = useRouter();
  return (
    <Flex justifyContent={"space-between"} py={12} px={20} w={"100%"}>
      <BackButton onClick={onClick || router.back} />
    </Flex>
  );
};

export default NavBar;
