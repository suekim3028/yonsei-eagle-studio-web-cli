"use client";

import { useStepContext } from "@app/generate/StepContext";
import {
  Button,
  Flex,
  Icon,
  NavBar,
  Text,
  UploadPhotoExamples,
} from "@components";
import { APP_CONSTS } from "@consts";
import Link from "next/link";
import ScreenTemplate from "../../ScreenTemplate/ScreenTemplate";

const UploadDescription = () => {
  const { goNext, goPrev } = useStepContext();
  const warnings = [
    "사진 등록 가이드에 부합하지 않는 사진을 등록할 경우, 나와 닮지 않았거나 어색한 AI 이미지가 생성될 수 있어요.",
    "독수리 사진관에서 사용하는 AI는 학습 진행 중으로, 생성되는 일부 결과물이 만족스럽지 않을 수 있어요. 너른 마음으로 양해를 부탁 드릴게요.",
  ];

  return (
    <ScreenTemplate
      mention={`자연스런 AI 프로필을 위해\n가이드에 따라 사진을 올려주세요!`}
    >
      <NavBar onClick={() => goPrev("UPLOAD_DESCRIPTION")} />
      <>
        <Flex direction={"column"} mt={8} w="100%" mb={50}>
          <UploadPhotoExamples />
          <Text
            type="16_Light_Single"
            mx={28}
            mt={40}
            mb={12}
            color="YONSEI_BABY_GRAY"
          >
            {"가끔 이렇게 생성될 수 있어요"}
          </Text>
          {warnings.map((warn, idx) => (
            <Flex key={warn.slice(0, 5)} px={28} mt={idx === 0 ? 0 : 4}>
              <Text type="12_Light_Multi" color={"YONSEI_BABY_GRAY"}>
                -
              </Text>
              <Text type="12_Light_Multi" ml={8} color={"YONSEI_BABY_GRAY"}>
                {warn}
              </Text>
            </Flex>
          ))}
        </Flex>
      </>
      <Flex
        w="100%"
        p={20}
        bgColor={"WHITE"}
        direction={"column"}
        alignItems={"center"}
      >
        <Flex mb={12} alignItems={"center"}>
          <Link
            href={APP_CONSTS.PRIVACY_POLICY_URL}
            style={{ width: "fit-content" }}
            target={"_blank"}
          >
            <Text type={"12_Light_Single"} color={"YONSEI_BABY_GRAY"}>
              개인정보 처리방침
            </Text>
          </Link>
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
