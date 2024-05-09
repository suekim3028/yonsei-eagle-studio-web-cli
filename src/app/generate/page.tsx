"use client";

import { jsUtils } from "@web-core";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useStepContext } from "./StepContext";
import ConfirmPhotos from "./components/steps/ConfirmPhotos/ConfirmPhotos";
import Generating from "./components/steps/Generating/Generating";
import SelectPhotos from "./components/steps/SelectPhotos/SelectPhotos";
import SelectStyle from "./components/steps/SelectStyle/SelectStyle";
import UploadDescription from "./components/steps/UploadDescription/UploadDescription";
import UploadingPhotos from "./components/steps/UploadingPhotos/UploadingPhotos";

export default function Generate() {
  const { step } = useStepContext();
  const router = useRouter();
  const beforeUnloadHandler = async (event: PopStateEvent) => {
    // Recommended
    event.preventDefault();

    const goOut = true;
    await jsUtils.wait(2);
    if (goOut) {
      window.history.back();
    } else {
      window.history.pushState(null, "", "");
      window.focus();
      return;
    }

    // Included for legacy support, e.g. Chrome/Edge < 119
    event.returnValue = true;
  };

  const added = useRef(false);
  useEffect(() => {
    if (!added.current) {
      added.current = true;
      window.history.pushState(null, "", "");
      window.addEventListener("popstate", beforeUnloadHandler);
      return () => {
        window.removeEventListener("popstate", beforeUnloadHandler);
      };
    }
  }, []);

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
