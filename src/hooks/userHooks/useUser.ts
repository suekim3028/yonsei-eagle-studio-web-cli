import { UserAtoms } from "@atoms";
import { useRecoilValue } from "recoil";

export const useUserValue = () => {
  const user = useRecoilValue(UserAtoms.userState);
  return { user };
};
