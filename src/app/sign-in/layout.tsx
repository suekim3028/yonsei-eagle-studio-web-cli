"use client";
import { NavBar } from "@components";
import { useRouter } from "next/navigation";
import * as S from "./styles";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <S.Container>
      <NavBar onClick={() => router.replace("/")} />
      {children}
    </S.Container>
  );
}
