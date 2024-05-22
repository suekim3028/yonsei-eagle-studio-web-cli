'use client';
import { BgContainer, Flex, Text } from '@components';
import { Player } from '@lottiefiles/react-lottie-player';
import Loading from '@public/lottie/loading.json';
import Image from 'next/image';
import S from './styles.module.css';

const Loader = ({ mention }: { mention: string }) => {
  return (
    <BgContainer>
      <Flex
        direction={'column'}
        flex={1}
        alignItems={'center'}
        px={20}
        justifyContent={'center'}
      >
        <Image
          src={'/images/talking_eagle.svg'}
          width={64}
          height={64}
          alt="talking eagle"
          style={{ width: 64, height: 64 }}
        />
        <Flex w="100%" alignItems={'center'} direction={'column'}>
          <Flex position={'relative'} zIndex={2} bottom={-4}>
            <div className={S.triangle} />
            <div className={S.inner_triangle} />
          </Flex>

          <Flex
            bgRgbColor={'#FFFFFFB2'}
            border={'1px solid white'}
            borderRadius={8}
            py={20}
            w={'100%'}
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Text
              type={'14_Light_Multi'}
              color={'YONSEI_NAVY'}
              textAlign={'center'}
              mb={20}
            >
              {mention}
            </Text>
            <Player
              autoplay
              loop
              src={Loading}
              style={{ width: '48px', height: '48px' }}
            />
          </Flex>
        </Flex>
      </Flex>
    </BgContainer>
  );
};

export default Loader;
