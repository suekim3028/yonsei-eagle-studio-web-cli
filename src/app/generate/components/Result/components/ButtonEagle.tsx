import Image from "next/image";

const ButtonEagle = () => (
  <>
    <Image
      src={"/images/happy_eagle_arm.svg"}
      alt={"eagle_icon_arm"}
      width={112}
      height={118}
      style={{
        width: 112,
        height: 118,
        position: "absolute",
        right: -10,
        top: -68,
        zIndex: 3,
      }}
    />
    <Image
      src={"/images/happy_eagle_body.svg"}
      alt={"eagle_icon_body"}
      width={112}
      height={118}
      style={{
        width: 112,
        height: 118,
        position: "absolute",
        right: -10,
        top: -68,
        zIndex: 0,
      }}
    />
  </>
);

export default ButtonEagle;
