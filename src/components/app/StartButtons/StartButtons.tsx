'use client';

import { userApis } from '@apis';
import { Flex } from '@components';
import Button from '@components/Button/Button';
import { useUserContext } from '@contexts';
import { commonUtils } from '@utils';
import { useRouter } from 'next/navigation';

function StartButtons() {
  const router = useRouter();
  const { user } = useUserContext();

  return (
    <Flex p={'20px 60px'} w={'100%'} direction={'column'} alignItems={'center'}>
      <Button
        title={'시작하기'}
        type={'NAVY_GRADIENT'}
        stretch
        onClick={() => {
          router.push(user != 'loading' && !!user ? '/generate' : '/sign-in'); // 어차피 이동하면 한번 더확인함
        }}
      />

      <Button
        title={'개발용: 유저 삭제'}
        type={'NAVY_GRADIENT'}
        stretch
        onClick={async () => {
          if (user !== 'loading' && !!user) {
            await userApis.withdrawUser();
            alert('user withdrawn!');
          } else {
            alert('you are not logged in!');
          }
        }}
      />

      <Button
        title={'친구에게 알려주기'}
        type={'WHITE'}
        size={'M'}
        mt={8}
        onClick={commonUtils.sharePage}
      />
    </Flex>
  );
}

export default StartButtons;
