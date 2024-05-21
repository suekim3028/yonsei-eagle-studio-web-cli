'use client';

import { Loader } from '@components';
import { useUserContext } from '@contexts';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

const AuthRouterWrapper = ({
  children,
  only,
  fallback,
}: {
  children: React.ReactNode;
  only: 'GUEST' | 'USER';
  fallback: string;
}) => {
  const { user } = useUserContext();
  const router = useRouter();

  const isValid = useMemo(() => {
    if (user === 'loading') return false;
    return only === 'GUEST' ? !user : !!user;
  }, [only, user === 'loading', !!user]);

  useEffect(() => {
    if (user === 'loading') return;
    if (!isValid) {
      console.log(
        '[AuthRouterWrapper] is not valid user status. route to ',
        fallback
      );
      router.replace(fallback);
    }
  }, [user === 'loading']);

  if (user === 'loading' || !isValid)
    return (
      <Loader
        mention={`로그인 여부를 확인하는 중입니다.\n잠시만 기다려 주세요.`}
      />
    );

  return children;
};

export default React.memo(AuthRouterWrapper);
