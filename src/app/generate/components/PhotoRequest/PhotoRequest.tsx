import { photoRequestState } from "@atoms";
import { useRecoilValue } from "recoil";

const PhotoRequest = () => {
  // const a = userecoil

  const request = useRecoilValue(photoRequestState);

  return <></>;
};

export default PhotoRequest;
