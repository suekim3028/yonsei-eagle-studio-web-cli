import { NavBar } from "@components";
import * as S from "./styles";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <S.Container>
      <NavBar />
      {children}
    </S.Container>
  );
}
