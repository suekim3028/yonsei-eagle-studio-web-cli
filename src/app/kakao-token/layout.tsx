import { AuthRouterWrapper } from '@components';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthRouterWrapper only="GUEST" fallback={'/'}>
      {children}
    </AuthRouterWrapper>
  );
}
