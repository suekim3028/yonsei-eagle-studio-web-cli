'use client';
import { BgContainer, Flex, Text } from '@components';
import { WebPushManager } from '@lib';
import { PhotoTypes } from '@types';
import Image from 'next/image';
import React, { useRef } from 'react';
import { PushAvailable } from '../components/PushAvailable';
import PushUnavailable from '../components/PushUnavailable';
import Timer from '../components/Timer';

const Processing = ({
  imageProcessType,
  leftSeconds,
}: {
  imageProcessType: PhotoTypes.ProcessType;
  leftSeconds: number;
}) => {
  const hasPushManager = useRef(
    new WebPushManager().status === 'INITIALIZED'
  ).current;

  return (
    <BgContainer>
      <Flex direction={'column'} w="100%" alignItems={'center'} px={20}>
        <Flex w="100%" py={20} justifyContent={'center'}>
          <Text
            type={'20_Medium_Multi'}
            color="YONSEI_NAVY"
          >{`${12}번째 독수리님의\n사진을 인화 중이에요`}</Text>
        </Flex>
        <Flex w="100%" justifyContent={'center'}>
          <Flex position="relative">
            <Image
              alt={'waiting state result'}
              src={`/images/blur_result/${
                imageProcessType === 'FEMALE' ? 'F' : 'M'
              }.png`}
              priority
              style={{
                width: 198,
                height: 286,
              }}
              width={198}
              height={286}
            />
            <Timer leftSeconds={leftSeconds} />
          </Flex>
        </Flex>
        {hasPushManager ? <PushAvailable /> : <PushUnavailable />}
      </Flex>
    </BgContainer>
  );
};

export default React.memo(Processing);
