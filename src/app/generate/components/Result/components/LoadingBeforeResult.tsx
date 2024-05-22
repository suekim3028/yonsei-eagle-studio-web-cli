'use client';

import { BgContainer, Flex, Text } from '@components';
import { Player } from '@lottiefiles/react-lottie-player';
import Camera from '@public/lottie/camera.json';
import React from 'react';

const LoadingBeforeResult = () => {
  return (
    <BgContainer>
      <Flex
        direction={'column'}
        flex={1}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Text type={'16_Light_Multi'} color={'YONSEI_NAVY'} mb={20}>
          두근두근, 어떤 모습일까요? 🦅
        </Text>
        <Player
          autoplay
          loop
          src={Camera}
          style={{ width: '280px', height: '264px' }}
        />
      </Flex>
    </BgContainer>
  );
};

export default React.memo(LoadingBeforeResult);
