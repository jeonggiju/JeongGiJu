import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { setHourMinute } from "../utils/date";

interface Day {
  id: number;
  createdAt: Date;
  email: string;
  smoking: boolean;
  exercise: boolean;
  studyTime: { hour: number; minute: number };
  diary: string;
}

interface DayDispatch {
  setDayState: Dispatch<SetStateAction<Day>>;
  setDiaryArrayState: Dispatch<
    SetStateAction<{ diary: string; nextButton: boolean }[]>
  >;
}

const clickDay: Day = {
  id: 0,
  email: "",
  smoking: false,
  exercise: false,
  studyTime: setHourMinute(0, 0),
  diary: "",
  createdAt: new Date(),
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
