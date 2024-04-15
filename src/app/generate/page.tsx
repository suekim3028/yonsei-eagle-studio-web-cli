"use client";

import { useStepContext } from "./StepContext";
import SelectStyle from "./components/steps/SelectStyle/SelectStyle";
import UploadDescription from "./components/steps/UploadDescription/UploadDescription";
import SelectPhotos from "./components/steps/SelectPhotos/SelectPhotos";

// const checkUser(){

// }
export default function Generate() {
  const { step } = useStepContext();

  switch (step) {
    case "SELECT_STYLE":
      return <SelectStyle />;
    case "UPLOAD_DESCRIPTION":
      return <UploadDescription />;
    case "SELECT_PHOTOS":
      return <SelectPhotos />;
    default:
      break;
  }

  return <>generate!</>;
}
