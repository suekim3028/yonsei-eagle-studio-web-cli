import { BgContainer, Flex, Text } from '@components';
import Image from 'next/image';
import styles from './styles.module.css';

const ScreenTemplate = ({
  children,
  mention,
}: {
  children: React.ReactNode[];
  mention: string;
}) => {
  return (
    <BgContainer>
      {children[0]}
      <Flex w="100%" direction={'row'} px={20} mb={20}>
        <Image
          alt={'talking eagle'}
          src={'/images/talking_eagle.svg'}
          width={66.32}
          height={62.98}
          style={{ width: 66.32, height: 62.98 }}
        />
        <Flex ml={8} w="100%" alignItems={'center'}>
          <Flex position={'relative'} zIndex={2} right={-1}>
            <div className={styles.triangle} />
            <div className={styles.inner_triangle} />
          </Flex>

          <Flex
            bgRgbColor={'#FFFFFFB2'}
            border={'1px solid white'}
            borderRadius={8}
            flex={1}
            mr={22.5}
            py={13.5}
            px={22}
            alignItems={'center'}
            alignSelf={'center'}
          >
            <Text type={'14_Light_Multi'} color={'YONSEI_NAVY'}>
              {mention}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        direction={'column'}
        flex={1}
        overflow={'hidden'}
        justifyContent={'space-between'}
      >
        <Flex
          direction={'column'}
          w="100%"
          overflowY={'scroll'}
          style={{ scrollbarWidth: 'none' }}
          alignItems={'center'}
        >
          {children[1]}
        </Flex>
        {children[2]}
      </Flex>
    </BgContainer>
  );
};

export default ScreenTemplate;
