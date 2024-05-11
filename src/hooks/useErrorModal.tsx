import { ErrorModal } from "@components";
import { ModalManager } from "@web-core";

export const useErrorModal = () => {
  const { show } = ModalManager;

  const showError = (errorMsg: string) => {
    show({
      Component: (
        <ErrorModal
          title={"앗! 잠시 후 다시 시도해 주세요"}
          body={errorMsg}
          yesText="확인"
          noText="아니"
        />
      ),
      closeOnDim: true,
    });
  };

  return { showError };
};
