import { useContext } from "react";
import { SetAuthTokenContext } from "../provider/AuthProvider";

export const useSetAuthTokenContext = () => {
  const context = useContext(SetAuthTokenContext);
  if (context === undefined) {
    throw new Error("`useContext(SetAuthTokenContext)`가 undefined 입니다.");
  }
  return context!;
};
