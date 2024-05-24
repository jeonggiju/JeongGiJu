import { useContext } from "react";
import { DiaryStateContext } from "../provider/DiariesProvider";

export const useDiariesStateContext = () => {
  const context = useContext(DiaryStateContext);
  if (context === undefined) {
    throw new Error("'useContext(useDiariesStateContext)'가 undefined 입니다.");
  }

  return context!;
};
