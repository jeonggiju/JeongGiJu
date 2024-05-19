import { ReactNode, createContext, useReducer } from "react";
import { setHourMinute } from "../utils/date";

interface DiaryElement {
  page: number;
  diary: string;
}

interface CheckElement {
  smoking: boolean;
  exercise: boolean;
  studyTime: Date;
}

interface ActionDiary {
  type: "CREATE";
  data: DiaryElement;
}

interface ActionCheck {
  type: "TOGGLE_SMOKING" | "TOGGLE_EXERCISE" | "UPDATE_STUDY_TIME";
  data: CheckElement;
}

interface DiaryDispatch {
  onCreateDiary: ({ page, diary }: IOnCreateDiary) => void;
  onToggleSmokingCheck: () => void;
  onToggleExerciseCheck: () => void;
  onUpdateStudyTimeCheck: (studyTime: Date) => void;
}

interface DiaryState {
  diaryData: DiaryElement[];
  checkData: CheckElement;
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
    case "TOGGLE_SMOKING":
      nextState = { ...state, smoking: !state.smoking };
      break;
    case "TOGGLE_EXERCISE":
      nextState = { ...state, exercise: !state.exercise };
      break;
    case "UPDATE_STUDY_TIME":
      nextState = { ...state, studyTime: action.data.studyTime };
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
        item.page === action.data.page ? action.data : item
      );
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

  const onToggleSmokingCheck = () => {
    checkDispatch({
      type: "TOGGLE_SMOKING",
      data: {
        ...checkData,
      },
    });
  };

  const onToggleExerciseCheck = () => {
    checkDispatch({
      type: "TOGGLE_EXERCISE",
      data: {
        ...checkData,
      },
    });
  };

  const onUpdateStudyTimeCheck = (studyTime: Date) => {
    checkDispatch({
      type: "UPDATE_STUDY_TIME",
      data: {
        ...checkData,
        studyTime,
      },
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

  return (
    <DiaryStateContext.Provider value={{ diaryData, checkData }}>
      <DiaryDispatchContext.Provider
        value={{
          onCreateDiary,
          onToggleExerciseCheck,
          onToggleSmokingCheck,
          onUpdateStudyTimeCheck,
        }}
      >
        {children}
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export { DiariesProvider, DiaryDispatchContext, DiaryStateContext };
