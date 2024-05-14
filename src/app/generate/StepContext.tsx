"use client";

import { PhotoTypes } from "@types";
import React, { createContext, useContext, useMemo, useState } from "react";
import { STEPS, Step } from "./types";

const StepContext = createContext<StepContextValue | null>(null);

const StepContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [stepIdx, setStepIdx] = useState(0);

  const step = useMemo(() => STEPS[stepIdx], [stepIdx]);

  const [imageProcessType, setImageProcessType] =
    useState<PhotoTypes.ProcessType | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);

  const goNext = (currentStep: Step) => {
    const currentStepIdx = STEPS.findIndex((v) => v === currentStep);
    setStepIdx(Math.min(currentStepIdx + 1, STEPS.length - 1));
  };

  const goPrev = (currentStep: Step) => {
    const currentStepIdx = STEPS.findIndex((v) => v === currentStep);
    setStepIdx(Math.max(currentStepIdx - 1, 0));
  };

  return (
    <StepContext.Provider
      value={{
        step,
        imageProcessType,
        photos,
        goNext,
        goPrev,
        setImageProcessType,
        setPhotos,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export const useStepContext = () => {
  const stepContext = useContext(StepContext);
  if (!stepContext) throw new Error("step context must be used in provider");
  return stepContext;
};
export default StepContextProvider;

type StepContextValue = {
  step: Step;
  imageProcessType: PhotoTypes.ProcessType | null;
  photos: File[];
  goNext: (currentStep: Step) => void;
  goPrev: (currentStep: Step) => void;
  setImageProcessType: React.Dispatch<
    React.SetStateAction<PhotoTypes.ProcessType | null>
  >;

  setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
};
