import { ReactNode, createContext, useReducer, useRef } from "react";
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

interface DaysDispatch {
  onCreate: (day: Omit<Day, "id" | "createdAt">) => void;
  onUpdate: (day: Day) => void;
  onDelete: (id: number) => void;
}

interface Action {
  data: Day;
  type: string;
}

// state 기존 데이터, action 받아온 데이터
function reducer(state: Day[], action: Action): Day[] {
  let nextState;

  switch (action.type) {
    case "CREATE":
      nextState = [action.data, ...state];
      break;
    case "UPDATE":
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    case "DELETE":
      nextState = state.filter(
        (item) => String(item.id) !== String(action.data.id)
      );
      break;

    default:
      nextState = state;
  }
  return nextState;
}

const tempData: Day[] = [
  {
    id: 100,
    email: "aaa@abb",
    smoking: true,
    exercise: true,
    studyTime: setHourMinute(3, 45),
    diary: "1안녕안녕",
    createdAt: new Date(),
  },
  {
    id: 101,
    email: "aaa@abb",
    smoking: true,
    exercise: true,
    studyTime: setHourMinute(3, 45),
    diary: "2안녕안녕",
    createdAt: new Date(),
  },
  {
    id: 102,
    email: "aaa@abb",
    smoking: true,
    exercise: true,
    studyTime: setHourMinute(3, 45),
    diary: "3안녕안녕",
    createdAt: new Date(),
  },
];

const DaysStateContext = createContext<null | Day[]>(null);
const DaysDispatchContext = createContext<DaysDispatch | null>(null);

const DaysProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, dispatch] = useReducer<React.Reducer<Day[], Action>>(
    reducer,
    tempData
  );

  const ref = useRef(0);

  const onCreate = (day: Omit<Day, "id" | "createdAt">) => {
    dispatch({
      type: "CREATE",
      data: {
        id: ref.current++, //임시
        email: day.email,
        studyTime: day.studyTime,
        smoking: day.smoking,
        exercise: day.exercise,
        diary: day.diary,
        createdAt: new Date(),
      },
    });
  };

  const onUpdate = (day: Day) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: day.id,
        email: day.email,
        studyTime: day.studyTime,
        smoking: day.smoking,
        exercise: day.exercise,
        diary: day.diary,
        createdAt: day.createdAt,
      },
    });
  };

  const onDelete = (id: number) => {
    dispatch({
      type: "DELETE",
      data: { id } as Day,
    });
  };

  return (
    <DaysStateContext.Provider value={data}>
      <DaysDispatchContext.Provider value={{ onCreate, onDelete, onUpdate }}>
        {children}
      </DaysDispatchContext.Provider>
    </DaysStateContext.Provider>
  );
};

export { DaysProvider, DaysStateContext, DaysDispatchContext };
