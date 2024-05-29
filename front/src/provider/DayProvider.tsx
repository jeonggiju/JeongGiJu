import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface Day {
  createdAt: Date;
  id: string;
  diary: string;
}

interface DayDispatch {
  setDayState: Dispatch<SetStateAction<Day>>;
  setDiaryArrayState: Dispatch<
    SetStateAction<{ diary: string; nextButton: boolean }[]>
  >;
}

const clickDay: Day = {
  id: "",
  createdAt: new Date(),
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
    <DayStateContext.Provider value={{ diaryArrayState, dayState }}>
      <DayDispatchContext.Provider value={{ setDiaryArrayState, setDayState }}>
        {children}
      </DayDispatchContext.Provider>
    </DayStateContext.Provider>
  );
};

export { DayProvider, DayStateContext, DayDispatchContext };
