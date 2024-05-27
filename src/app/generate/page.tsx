"use client";

import { Loader } from "@components";
import { useUserContext } from "@contexts";
import { jsUtils } from "@web-core";
import React, { useEffect, useRef } from "react";
import { useStepContext } from "./StepContext";
import Result from "./components/Result/Result";
import ConfirmPhotos from "./components/steps/ConfirmPhotos/ConfirmPhotos";
import SelectPhotos from "./components/steps/SelectPhotos/SelectPhotos";
import SelectStyle from "./components/steps/SelectStyle/SelectStyle";
import UploadDescription from "./components/steps/UploadDescription/UploadDescription";
import UploadingPhotos from "./components/steps/UploadingPhotos/UploadingPhotos";

const Generate = (): JSX.Element => {
  const { step } = useStepContext();
  const { request } = useUserContext();

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

  if (request === "loading")
    return (
      <Loader
        mention={`프로필 생성 정보를 확인 중입니다.\n잠시만 기다려주세요.`}
      />
    );

  if (request) return <Result request={request} />;

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
  }
};
export default React.memo(Generate);
