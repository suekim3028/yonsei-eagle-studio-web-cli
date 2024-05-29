import { ErrorModal, ErrorModalProps } from "@components";
import { ModalManager, webUtils } from "@web-core";

export const sharePage = async () => {
  const url = process.env.NEXT_PUBLIC_WEB_URL;

  const canShare =
    "canShare" in navigator &&
    navigator.canShare({
      title: "독수리 사진관",
      text: `아카라카 기념 나만의 AI 프로필 확인하러 가기!\n${url}`,
    });

  if (canShare) {
    try {
      await navigator.share({
        title: "독수리 사진관",
        text: `아카라카 기념 나만의 AI 프로필 확인하러 가기!\n${url}`,
      });
    } catch (e) {
      console.warn("canceled");
    }
  } else {
    webUtils.copyToClipboard(url, () =>
      alert(`링크 복사가 완료되었어요!\n복사된 링크를 공유해보세요.`)
    );
  }
};

export const showError = (errorMsg: string) => {
  ModalManager.show({
    Component: (
      <ErrorModal
        title={"앗! 잠시 후 다시 시도해 주세요"}
        body={errorMsg}
        yesText="확인"
      />
    ),
    closeOnDim: true,
  });
};

export const showConfirmPopup = (props: ErrorModalProps) => {
  ModalManager.show({
    Component: <ErrorModal {...props} />,
    closeOnDim: true,
  });
};
