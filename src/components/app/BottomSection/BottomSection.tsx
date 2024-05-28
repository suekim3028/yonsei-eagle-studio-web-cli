import { Button, Flex, Text } from "@components";

const BottomSection = () => {
  return (
    <Flex
      direction={"column"}
      w={"100%"}
      px={40}
      mt={20}
      alignItems={"flex-start"}
    >
      <Text type={"18_Medium_Multi"} color="YONSEI_NAVY">
        {`독수리 사진관은\n어디서 진행하는 프로젝트인가요?`}
      </Text>
      <Text type={"14_Light_Multi"} color="YONSEI_NAVY" mt={16}>
        {`독수리 사진관은 연세대학교 구글 학생 개발자 커뮤니티 Google Developer Student Clubs Yonsei 소속 팀 ‘LAVA’에서 낭만에 죽고 낭만에 사는 멤버들이 모여서 제작한 서비스입니다.\n더 자세한 내용이 궁금하다면 인스타그램에 @gdsc.yonsei를 검색해 주세요!`}
      </Text>
      <Button
        size={"XS"}
        mt={12}
        href="https://www.instagram.com/gdsc.yonsei"
        type={"WHITE"}
        title={"gdsc.yonsei 인스타그램"}
        icon={"instagram"}
      />
      <Text type={"18_Medium_Multi"} color="YONSEI_NAVY" mt={48}>
        {`이미지를 여러 장 만들 수 있나요?`}
      </Text>
      <Text type={"14_Light_Multi"} color="YONSEI_NAVY" mt={16}>
        {`독수리 사진관에서는 1계정 당 1개의 이미지만 생성해드리고 있어요. 한 번 만들 때 신중하게 사진을 골라 주세요!`}
      </Text>

      <Text type={"18_Medium_Multi"} color="YONSEI_NAVY" mt={48}>
        {`제 사진과 개인정보가\n다른 곳에 사용될까봐 걱정돼요`}
      </Text>
      <Text type={"14_Light_Multi"} color="YONSEI_NAVY" mt={16}>
        {`독수리 사진관에 제출해주신 개인정보는 AI 프로필 생성에만 활용되니, 안심하고 이용해주세요!`}
      </Text>
      <Text type={"14_Light_Single"} color={"YONSEI_NAVY"} mt={80} mb={20}>
        Sponsored By.
      </Text>
      <img
        src={"/images/sponsors.png"}
        // width={295}
        // height={57.06}
        style={{ width: "100%" }}
      />
    </Flex>
  );
};

export default BottomSection;
