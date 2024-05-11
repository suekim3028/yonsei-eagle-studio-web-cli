import { Button, Flex, Text } from "@components";
import { ModalManager } from "@web-core";

const ErrorModal = ({
  title,
  body,
  yesText,
  noText,
  onPressYes,
  onPressNo,
}: ErrorModalProps) => {
  const { close } = ModalManager;
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      w="100%"
    >
      <img
        src={"/images/crying_eagle.svg"}
        width={80}
        height={80}
        style={{ width: 80, height: 80 }}
      />
      <Flex
        direction={"column"}
        bgColor={"WHITE"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={20}
        py={24}
        mx={20}
        px={40}
        flex={1}
      >
        <Text
          type={"18_Medium_Multi"}
          color="YONSEI_NAVY"
          mb={20}
          textAlign={"center"}
        >
          {title}
        </Text>
        <Text type="16_Light_Multi" color="YONSEI_NAVY" textAlign={"center"}>
          {body}
        </Text>
        <Flex w="100%" mt={20}>
          {!!noText && (
            <Button
              stretch
              title={noText}
              onClick={() => {
                onPressNo && onPressNo();
                close();
              }}
              type={"WHITE"}
              size="M"
            />
          )}
          <Button
            stretch
            title={yesText}
            onClick={() => {
              close();
              onPressYes && onPressYes();
            }}
            type={"NAVY"}
            size="M"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export type ErrorModalProps = {
  title: string;
  body: string;
  yesText: string;
  noText?: string;
  onPressYes?: () => void;
  onPressNo?: () => void;
};

export default ErrorModal;
