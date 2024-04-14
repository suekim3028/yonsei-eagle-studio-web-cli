"use client";

import { useStepContext } from "./StepContext";
import SelectStyle from "./components/steps/SelectStyle/SelectStyle";

// const checkUser(){

// }
export default function Generate() {
  const { step } = useStepContext();

  switch (step) {
    case "SELECT_STYLE":
      return <SelectStyle />;
      break;

    default:
      break;
  }

  return <>generate!</>;
}
