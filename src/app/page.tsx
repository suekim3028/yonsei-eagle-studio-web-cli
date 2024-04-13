// "use client";
import { L } from "@web-core";
import Image from "next/image";
import * as S from "./styles";
import { Button, Text } from "@components";

export default function Home() {
  return (
    <S.Main>
      <L.Flex w={"100%"} py={"12px"} px={"20px"}>
        <Button title="1:1문의하기" type="WHITE" size="XS" icon={"kakaotalk"} />
      </L.Flex>
    </S.Main>
  );
}
