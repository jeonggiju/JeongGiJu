import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { changeToDate } from "../utils/date";

interface Day {
  smoking: boolean;
  exercise: boolean;
  studyTime: Date;
  diary: string;
}

interface DayDispatch {
  setDayState: Dispatch<SetStateAction<Day>>;
  setDiaryArrayState: Dispatch<
    SetStateAction<{ diary: string; nextButton: boolean }[]>
  >;
}

const clickDay: Day = {
  smoking: false,
  exercise: false,
  studyTime: changeToDate(0, 0),
  diary: "",
};

interface IDayStateContext {
  dayState: Day;
  diaryArrayState: { diary: string; nextButton: boolean }[];
}

const baseDiary = [
  { diary: "", nextButton: true },
  { diary: "", nextButton: true },
  { diary: "", nextButton: true },
  { diary: "", nextButton: true },
  { diary: "", nextButton: true },
  { diary: "", nextButton: true },
  { diary: "", nextButton: true },
  { diary: "", nextButton: true },
  { diary: "", nextButton: true },
];

const DayStateContext = createContext<IDayStateContext | null>(null);
const DayDispatchContext = createContext<DayDispatch | null>(null);

const DayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dayState, setDayState] = useState<Day>(clickDay);
  const [diaryArrayState, setDiaryArrayState] =
    useState<{ diary: string; nextButton: boolean }[]>(baseDiary);
  return (
    <DayStateContext.Provider value={{ dayState, diaryArrayState }}>
      <DayDispatchContext.Provider value={{ setDayState, setDiaryArrayState }}>
        {children}
      </DayDispatchContext.Provider>
    </DayStateContext.Provider>
  );
};

export { DayProvider, DayStateContext, DayDispatchContext };
