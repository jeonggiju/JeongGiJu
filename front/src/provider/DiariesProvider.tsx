import {
  ReactNode,
  SetStateAction,
  createContext,
  useReducer,
  useState,
} from "react";
import { setHourMinute } from "../utils/date";

interface DiaryElement {
  page: number;
  diary: string;
}

interface CheckElement {
  wakeTime: { hour: number; minute: number };
  sleepTime: { hour: number; minute: number };
  studyTime: { hour: number; minute: number };

  anaerobic: boolean;
  cardio: boolean;
  smoking: boolean;

  weight: string;
}

interface ActionDiary {
  type: "CREATE" | "INIT";
  data?: DiaryElement;
}

interface ActionCheck {
  type:
    | "UPDATE_WAKETIME"
    | "UPDATE_SLEEPTIME"
    | "UPDATE_STUDYTIME"
    | "UPDATE_SMOKING"
    | "UPDATE_ANAEROBIC"
    | "UPDATE_CARDIO"
    | "UPDATE_WEIGHT"
    | "INIT";
  data: CheckElement;
}

interface DiaryDispatch {
  onCreateDiary: ({ page, diary }: IOnCreateDiary) => void;
  onInitDiary: () => void;

  onUpdateWakeTime: (wakeTime: { hour: number; minute: number }) => void;
  onUpdateSleepTime: (sleepTime: { hour: number; minute: number }) => void;
  onUpdateStudyTime: (studyTime: { hour: number; minute: number }) => void;

  onUpdateAnaerobicCheck: (anaerobic: boolean) => void;
  onUpdateCardioCheck: (cardio: boolean) => void;
  onUpdateSmokingCheck: (smoking: boolean) => void;
  onUpdateWeight: (weight: string) => void;
  setCurDiaryState: React.Dispatch<SetStateAction<string>>;
  onInitCheck: () => void;
}

interface DiaryState {
  diaryData: DiaryElement[];
  checkData: CheckElement;
  curDiaryState: string;
}

interface IOnCreateDiary {
  page: number;
  diary: string;
}

const baseCheck: CheckElement = {
  wakeTime: setHourMinute(0, 0),
  sleepTime: setHourMinute(0, 0),
  studyTime: setHourMinute(0, 0),

  anaerobic: false,
  cardio: false,
  smoking: false,

  weight: "",
};

const baseDiary: DiaryElement[] = [
  { page: 1, diary: "" },
  { page: 2, diary: "" },
  { page: 3, diary: "" },
  { page: 4, diary: "" },
  { page: 5, diary: "" },
  { page: 6, diary: "" },
  { page: 7, diary: "" },
  { page: 8, diary: "" },
  { page: 9, diary: "" },
];

function CheckReducer(state: CheckElement, action: ActionCheck): CheckElement {
  let nextState: CheckElement;

  switch (action.type) {
    case "UPDATE_WAKETIME":
      nextState = { ...state, wakeTime: action.data.wakeTime };
      break;

    case "UPDATE_SLEEPTIME":
      nextState = { ...state, sleepTime: action.data.sleepTime };
      break;

    case "UPDATE_STUDYTIME":
      nextState = { ...state, studyTime: action.data.studyTime };
      break;

    case "UPDATE_SMOKING":
      nextState = { ...state, smoking: action.data.smoking };
      break;
    case "UPDATE_ANAEROBIC":
      nextState = { ...state, anaerobic: action.data.anaerobic };
      break;
    case "UPDATE_CARDIO":
      nextState = { ...state, cardio: action.data.cardio };
      break;

    case "UPDATE_WEIGHT":
      nextState = { ...state, weight: action.data.weight };
      break;
    case "INIT":
      nextState = baseCheck;
      break;
    default:
      nextState = state;
  }

  return nextState;
}

function DiaryReducer(
  state: DiaryElement[],
  action: ActionDiary
): DiaryElement[] {
  let nextState: DiaryElement[];

  switch (action.type) {
    case "CREATE":
      nextState = state.map((item) =>
        item.page === action.data!.page ? action.data! : item
      );
      break;
    case "INIT":
      nextState = baseDiary;
      break;
    default:
      nextState = state;
  }
  return nextState;
}

const DiaryStateContext = createContext<null | DiaryState>(null);
const DiaryDispatchContext = createContext<null | DiaryDispatch>(null);

const DiariesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 다이어리를 기록하기 위함
  const [diaryData, diaryDispatch] = useReducer<
    React.Reducer<DiaryElement[], ActionDiary>
  >(DiaryReducer, baseDiary);

  const [checkData, checkDispatch] = useReducer<
    React.Reducer<CheckElement, ActionCheck>
  >(CheckReducer, baseCheck);

  // 현재 페이지의 데이터
  const [curDiaryState, setCurDiaryState] = useState<string>("");

  const onUpdateWakeTime = (wakeTime: { hour: number; minute: number }) => {
    checkDispatch({
      type: "UPDATE_WAKETIME",
      data: {
        ...checkData,
        wakeTime,
      },
    });
  };

  const onUpdateSleepTime = (sleepTime: { hour: number; minute: number }) => {
    checkDispatch({
      type: "UPDATE_SLEEPTIME",
      data: {
        ...checkData,
        sleepTime,
      },
    });
  };

  const onUpdateStudyTime = (studyTime: { hour: number; minute: number }) => {
    checkDispatch({
      type: "UPDATE_STUDYTIME",
      data: {
        ...checkData,
        studyTime,
      },
    });
  };

  const onUpdateSmokingCheck = (smoking: boolean) => {
    checkDispatch({
      type: "UPDATE_SMOKING",
      data: {
        ...checkData,
        smoking,
      },
    });
  };

  const onUpdateAnaerobicCheck = (anaerobic: boolean) => {
    checkDispatch({
      type: "UPDATE_ANAEROBIC",
      data: {
        ...checkData,
        anaerobic,
      },
    });
  };

  const onUpdateCardioCheck = (cardio: boolean) => {
    checkDispatch({
      type: "UPDATE_CARDIO",
      data: {
        ...checkData,
        cardio,
      },
    });
  };

  const onUpdateWeight = (weight: string) => {
    checkDispatch({
      type: "UPDATE_WEIGHT",
      data: {
        ...checkData,
        weight,
      },
    });
  };

  const onInitCheck = () => {
    checkDispatch({
      type: "INIT",
      data: { ...checkData },
    });
  };

  const onCreateDiary = ({ page, diary }: IOnCreateDiary) => {
    diaryDispatch({
      type: "CREATE",
      data: {
        page,
        diary,
      },
    });
  };

  const onInitDiary = () => {
    diaryDispatch({
      type: "INIT",
    });
  };

  return (
    <DiaryStateContext.Provider
      value={{
        diaryData,
        checkData,
        curDiaryState,
      }}
    >
      <DiaryDispatchContext.Provider
        value={{
          onCreateDiary,
          onInitDiary,

          onUpdateWakeTime,
          onUpdateSleepTime,
          onUpdateStudyTime,

          onUpdateAnaerobicCheck,
          onUpdateCardioCheck,
          onUpdateSmokingCheck,

          onUpdateWeight,
          onInitCheck,
          setCurDiaryState,
        }}
      >
        {children}
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export { DiariesProvider, DiaryDispatchContext, DiaryStateContext };
