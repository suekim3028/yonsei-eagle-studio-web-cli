"use client";

import { useStepContext } from "./StepContext";
import SelectStyle from "./components/steps/SelectStyle/SelectStyle";
import UploadDescription from "./components/steps/UploadDescription/UploadDescription";
import SelectPhotos from "./components/steps/SelectPhotos/SelectPhotos";
import ConfirmPhotos from "./components/steps/ConfirmPhotos/ConfirmPhotos";
import UploadingPhotos from "./components/steps/UploadingPhotos/UploadingPhotos";
import { WebPushManager } from "@lib";
import Generating from "./components/steps/Generating/Generating";

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
    case "CONFIRM_PHOTOS":
      return <ConfirmPhotos />;
    case "UPLOADING_PHOTOS":
      return <UploadingPhotos />;
    case "GENERATING":
      return <Generating />;

    default:
      break;
  }

  return <>generate!</>;
}
