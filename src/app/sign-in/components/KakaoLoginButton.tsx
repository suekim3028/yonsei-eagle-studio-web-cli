"use client";
import { Button } from "@components";

const KakaoLoginButton = () => {
  const handleOnClick = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/kakao-token",
      isPopup: true,
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
