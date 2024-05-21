'use client';

import { WebPushManager } from '@lib';
import React, { useEffect, useRef } from 'react';

const Initializer = () => {
  const initiated = useRef(false);

  useEffect(() => {
    if (initiated.current) return;
    initiated.current = true;
    console.log('===INITIALIZER!');

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
      console.log(`kakao initialized`);
    } else {
      console.log(`kakao already initialized`);
    }

    const pushManager = new WebPushManager();
    if (!pushManager.initialized) {
      pushManager.initialize();
    }
  }, []);

  return <></>;
};

export default React.memo(Initializer);
