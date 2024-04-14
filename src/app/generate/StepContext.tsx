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

  const goNext = () => {
    switch (step) {
      case "SELECT_STYLE":
        if (!style) return;
      case "SELECT_PHOTOS":
        if (!photos.length) return;
      case "GENERATING":
        return;
    }

    setStepIdx((s) => s + 1);
  };

  const goPrev = () => {
    if (stepIdx === 0) return;
    setStepIdx((s) => s - 1);
  };

  return (
    <StepContext.Provider
      value={{
        step,
        style,
        photos,
        goNext,
        goPrev,
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
  goNext: () => void;
  goPrev: () => void;
};
