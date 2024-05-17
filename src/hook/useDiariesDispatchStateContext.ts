import { useContext } from "react";
import { DiaryDispatchContext } from "../provider/DiariesProvider";

export const useDiariesDispatchStateContext = () => {
  const context = useContext(DiaryDispatchContext);
  if (context === undefined) {
    throw new Error(
      "'useContext(useDiariesDispatchStateContext)'가 undefined 입니다."
    );
  }

  return context!;
};
