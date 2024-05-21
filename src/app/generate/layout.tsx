'use client';

import { AuthRouterWrapper, Flex } from '@components';
import React from 'react';
import StepContextProvider from './StepContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthRouterWrapper only={'USER'} fallback={'/sign-in'}>
      <StepContextProvider>
        <Flex bgColor={'BABY_BLUE'} w="100%" minH={'100%'}>
          {children}
        </Flex>
      </StepContextProvider>
    </AuthRouterWrapper>
  );
}
