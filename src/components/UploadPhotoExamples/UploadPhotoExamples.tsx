import { Flex, Text } from "@components";
import Image from "next/image";
import * as S from "./style";
const UploadPhotoExamples = () => {
  const badDescriptions = ["얼굴 일부를 가린", "전신 사진", "단체 사진 크롭"];

  const goodDescriptions = ["정면에서 찍은", "얼굴 위주 사진", "배경이 단색인"];

  const renderImages = (type: "good" | "bad") => {
    return (
      <S.ScrollWrapper>
        {(type === "bad" ? badDescriptions : goodDescriptions).map(
          (desc, idx) => (
            <Flex
              key={desc.slice(0, 5)}
              direction={"column"}
              ml={idx === 0 ? 0 : 12}
              py={16}
            >
              <Image
                alt={"photo example"}
                src={`/images/photo_examples/${type}_${idx + 1}.png`}
                width={112}
                height={128}
                style={{ width: 112, height: 128, borderRadius: 32 }}
              />
              <Flex>
                <Text
                  type="14_Light_Single"
                  color="YONSEI_CHARCOAL"
                  mt={12}
                  mr={4}
                >
                  {type === "good" ? "✅" : "❌"}
                </Text>
                <Text type="14_Light_Single" color="YONSEI_CHARCOAL" mt={12}>
                  {desc}
                </Text>
              </Flex>
            </Flex>
          )
        )}
      </S.ScrollWrapper>
    );
  };
  return (
    <Flex w="100%" direction={"column"}>
      <Flex direction={"column"}>
        <Text type={"18_Medium_Single"} color={"YONSEI_NAVY"} ml={28}>
          이런 사진은 NO
        </Text>
        {renderImages("bad")}
      </Flex>
      <Flex direction={"column"}>
        <Text type={"18_Medium_Single"} color={"YONSEI_NAVY"} ml={28} mt={24}>
          이런 사진은 YES
        </Text>
        {renderImages("good")}
      </Flex>
      <Text type="14_Light_Multi" color="YONSEI_CHARCOAL" ml={28}>
        {"*비슷한 각도의 정면 셀카가 많을수록 좋아요."}
      </Text>
    </Flex>
  );
};

export default UploadPhotoExamples;
