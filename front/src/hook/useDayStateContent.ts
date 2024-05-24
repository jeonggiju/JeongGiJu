import { useContext } from "react";
import { DayStateContext } from "../provider/DayProvider";

export const useDayStateContext = () => {
  const context = useContext(DayStateContext);
  if (context === undefined) {
    throw new Error("`useContext(DayStateContext)`가 undefined 입니다.");
  }
  return context!;
};
