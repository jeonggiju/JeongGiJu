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
  smoking: boolean;
  exercise: boolean;
  studyTime: { hour: number; minute: number };
}

interface ActionDiary {
  type: "CREATE" | "INIT";
  data?: DiaryElement;
}

interface ActionCheck {
  type: "UPDATE_SMOKING" | "UPDATE_EXERCISE" | "UPDATE_STUDY_TIME" | "INIT";
  data: CheckElement;
}

interface DiaryDispatch {
  onCreateDiary: ({ page, diary }: IOnCreateDiary) => void;
  onInitDiary: () => void;
  onUpdateSmokingCheck: (smoking: boolean) => void;
  onUpdateExerciseCheck: (exercise: boolean) => void;
  onUpdateStudyTimeCheck: (studyTime: { hour: number; minute: number }) => void;
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
  smoking: false,
  exercise: false,
  studyTime: setHourMinute(0, 0),
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
    case "UPDATE_SMOKING":
      nextState = { ...state, smoking: action.data.smoking };
      break;
    case "UPDATE_EXERCISE":
      nextState = { ...state, exercise: action.data.exercise };
      break;
    case "UPDATE_STUDY_TIME":
      nextState = { ...state, studyTime: action.data.studyTime };
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
  const onUpdateSmokingCheck = (smoking: boolean) => {
    checkDispatch({
      type: "UPDATE_SMOKING",
      data: {
        ...checkData,
        smoking,
      },
    });
  };

  const onUpdateExerciseCheck = (exercise: boolean) => {
    checkDispatch({
      type: "UPDATE_EXERCISE",
      data: {
        ...checkData,
        exercise,
      },
    });
  };

  const onUpdateStudyTimeCheck = (studyTime: {
    hour: number;
    minute: number;
  }) => {
    checkDispatch({
      type: "UPDATE_STUDY_TIME",
      data: {
        ...checkData,
        studyTime,
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
          onUpdateExerciseCheck,
          onUpdateSmokingCheck,
          onUpdateStudyTimeCheck,
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
