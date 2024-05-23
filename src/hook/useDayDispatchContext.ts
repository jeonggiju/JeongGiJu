import { useContext } from "react";
import { DayDispatchContext } from "../provider/DayProvider";

export const useDayDispatchContext = () => {
  const context = useContext(DayDispatchContext);
  if (context === undefined) {
    throw new Error("`useContext(DayDispatchContext)`가 undefined 입니다.");
  }
  return context!;
};
