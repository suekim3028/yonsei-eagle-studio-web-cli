"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { STEPS, Step } from "./types";

const StepContext = createContext<StepContextValue | null>(null);

const StepContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [stepIdx, setStepIdx] = useState(0);

  const step = useMemo(() => STEPS[stepIdx], [stepIdx]);

  const [style, setStyle] = useState<"A" | "B" | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);

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
        style,
        photos,
        goNext,
        goPrev,
        setStyle,
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
  style: "A" | "B" | null;
  photos: string[];
  goNext: (currentStep: Step) => void;
  goPrev: (currentStep: Step) => void;
  setStyle: React.Dispatch<React.SetStateAction<"A" | "B" | null>>;

  setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
};
