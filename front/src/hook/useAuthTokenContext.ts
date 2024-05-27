import { useContext } from "react";
import { AuthTokenContext } from "../provider/AuthProvider";

export const useAuthTokenContext = () => {
  const context = useContext(AuthTokenContext);
  if (context === undefined) {
    throw new Error("`useContext(AuthTokenContext)`가 undefined 입니다.");
  }
  return context!;
};
