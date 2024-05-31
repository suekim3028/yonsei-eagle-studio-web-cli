"use client";

import { Loader } from "@components";
import { useUserContext } from "@contexts";
import { jsUtils } from "@web-core";
import React, { useEffect, useRef } from "react";
import { useStepContext } from "./StepContext";
import Result from "./components/Result/Result";
import Break from "./components/Result/templates/Break";

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
  //
  return <Break />;
};
export default React.memo(Generate);
