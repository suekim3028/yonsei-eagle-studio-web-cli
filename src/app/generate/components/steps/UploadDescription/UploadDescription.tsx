"use client";

import { useStepContext } from "@app/generate/StepContext";
import { Button, Flex, Icon, NavBar, Text } from "@components";
import ScreenTemplate from "../../ScreenTemplate/ScreenTemplate";

const UploadDescription = () => {
  const { goNext, goPrev } = useStepContext();

  return (
    <ScreenTemplate
      mention={`자연스런 AI 프로필을 위해\n가이드에 따라 사진을 올려주세요!`}
    >
      <NavBar onClick={() => goPrev("UPLOAD_DESCRIPTION")} />
      <>
        <Flex direction={"column"} mt={28} w="100%">
          <Text type={"18_Medium_Single"} color={"YONSEI_NAVY"} ml={28} mb={16}>
            이런 사진은 NO
          </Text>
          <div
            style={{
              width: "100%",
              overflowX: "scroll",
              padding: "0px 20px",
            }}
          >
            <img
              src={"/images/upload_description/no_images.png"}
              height={157}
              width={360}
              style={{ width: 360, height: 157, overflowX: "scroll" }}
            />
          </div>

          <Text
            type={"18_Medium_Single"}
            color={"YONSEI_NAVY"}
            ml={28}
            mt={40}
            mb={16}
          >
            이런 사진은 YES
          </Text>
          <div
            style={{
              width: "100%",
              overflowX: "scroll",
              padding: "0px 20px",
            }}
          >
            <img
              src={"/images/upload_description/yes_images.png"}
              height={157}
              width={360}
              style={{ width: 360, height: 157, overflowX: "scroll" }}
            />
          </div>
        </Flex>
      </>
      <Flex
        w="100%"
        p={20}
        bgColor={"WHITE"}
        direction={"column"}
        alignItems={"center"}
      >
        {
          // TODO: 개인정보 연결 필요
        }
        <Flex mb={12} alignItems={"center"}>
          <Text type={"12_Light_Single"} color={"YONSEI_BABY_GRAY"}>
            개인정보 수집 및 이용 정책
          </Text>
          <Icon name="chevron_right" size={14} />
        </Flex>
        <Button
          type={"NAVY_GRADIENT"}
          stretch
          title={"내 사진 등록하기"}
          onClick={() => goNext("UPLOAD_DESCRIPTION")}
        />
      </Flex>
    </ScreenTemplate>
  );
};

export default UploadDescription;
