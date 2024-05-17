import { useContext } from "react";
import { DaysStateContext } from "../provider/DaysProvider";

export const useDaysStateContext = () => {
  const context = useContext(DaysStateContext);
  if (context === undefined) {
    throw new Error("'useContext(DaysStateContext)'가 undefined 입니다.");
  }

  return context!;
};
