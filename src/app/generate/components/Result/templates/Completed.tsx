import { PhotoTypes } from "@types";
import { commonUtils } from "@utils";
import React, { useCallback, useState } from "react";
import CompletedLanding from "../components/CompletedLanding";
import CompletedResult from "../components/CompletedResult";

const Completed = ({
  resultImageUrl,
  imageProcessType,
}: {
  imageProcessType: PhotoTypes.ProcessType;
  resultImageUrl: string | null;
}) => {
  const [showResult, setShowResult] = useState(false);
  const showError = useCallback(() => {
    if (!resultImageUrl) {
      commonUtils.showError(
        `예상보다 트래픽이 몰려 AI 프로필\n생성이 지연되고 있어요 🥲\n30분 후 다시 결과를 확인해 주세요!`
      );
      return;
    }
    setShowResult(true);
  }, [resultImageUrl]);

  if (!showResult || !resultImageUrl)
    return (
      <CompletedLanding imageProcessType={imageProcessType} show={showError} />
    );

  return <CompletedResult imageUrl={resultImageUrl} />;
};

export default React.memo(Completed);
