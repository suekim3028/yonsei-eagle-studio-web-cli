import { Flex, Text } from "@components";

export default function SignIn() {
  return (
    <Flex
      w={"100%"}
      py={20}
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
    >
      <img
        src={"/images/logo_title.svg"}
        width={144}
        height={98}
        style={{ width: 144, height: 98 }}
      />
      <Flex direction={"column"} py={20} alignItems={"center"}>
        <img
          src={"/images/logo_icon.svg"}
          width={64}
          height={64}
          style={{ width: 64, height: 64 }}
        />
        <Flex mt={8} py={12}>
          <Text
            align={"center"}
            color={"YONSEI_NAVY"}
            type={"18_Light_Multi"}
          >{`카카오로 3초만에 로그인하고\n내 AI 프로필 확인하기!`}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
