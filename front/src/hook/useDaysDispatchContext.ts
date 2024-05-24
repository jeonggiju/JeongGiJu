import { useContext } from "react";
import { DaysDispatchContext } from "../provider/DaysProvider";

export const useDaysDispatchContext = () => {
  const context = useContext(DaysDispatchContext);
  if (context === undefined) {
    throw new Error("`useContext(DaysDispatchContext)`가 undefined 입니다.");
  }
  return context!;
};
