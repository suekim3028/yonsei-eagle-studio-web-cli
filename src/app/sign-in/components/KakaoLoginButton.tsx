"use client";
import { Button } from "@components";

const KakaoLoginButton = () => {
  const handleOnClick = async () => {
    window.Kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_WEB_URL}kakao-token`,
      isPopup: false,
    });
  };

  return (
    <Button
      type={"NAVY"}
      icon="kakaotalk"
      title={"카카오로 계속하기"}
      bgRgbColor="rgba(254, 229, 0, 1)"
      textColor="BLACK"
      stretch
      onClick={handleOnClick}
    />
  );
};

export default KakaoLoginButton;
