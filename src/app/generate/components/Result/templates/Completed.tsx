import { PhotoTypes } from "@types";
import React, { useState } from "react";
import CompletedLanding from "../components/CompletedLanding";
import CompletedResult from "../components/CompletedResult/CompletedResult";

const Completed = ({
  resultImageUrl,
  imageProcessType,
}: {
  imageProcessType: PhotoTypes.ProcessType;
  resultImageUrl: string;
}) => {
  const [showResult, setShowResult] = useState(false);

  if (!showResult)
    return (
      <CompletedLanding
        imageProcessType={imageProcessType}
        show={() => setShowResult(true)}
      />
    );

  return <CompletedResult imageUrl={resultImageUrl} />;
};

export default React.memo(Completed);
