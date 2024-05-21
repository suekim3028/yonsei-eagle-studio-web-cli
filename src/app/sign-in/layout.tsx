'use client';
import { AuthRouterWrapper, BgContainer, NavBar } from '@components';
import { useRouter } from 'next/navigation';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <AuthRouterWrapper only={'GUEST'} fallback={'/'}>
      <BgContainer>
        <NavBar onClick={() => router.replace('/')} />
        {children}
      </BgContainer>
    </AuthRouterWrapper>
  );
}
