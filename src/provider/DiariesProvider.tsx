import { ReactNode, createContext, useReducer } from "react";

interface DiaryElement {
  page: number;
  diary: string;
}

interface Action {
  type: string;
  data: DiaryElement;
}

interface DiaryDispatch {
  onCreateDiary: ({ page, diary }: IOnCreateDiary) => void;
  onUpdateDiary: ({ page, diary }: IOnUpdateDiary) => void;
}

interface IOnCreateDiary {
  page: number;
  diary: string;
}

interface IOnUpdateDiary {
  page: number;
  diary: string;
}

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
  { page: 10, diary: "" },
];

function reducer(state: DiaryElement[], action: Action): DiaryElement[] {
  let nextState: DiaryElement[];

  switch (action.type) {
    case "CREATE":
      nextState = [action.data, ...state];
      // nextState = state.map((item) => {
      //   if (Number(item.page) === Number(action.data.page)) {
      //     return action.data;
      //   } else {
      //     return item;
      //   }
      // });
      break;
    case "UPDATE":
      nextState = state.map((item) =>
        Number(item.page) === Number(action.data.page) ? action.data : item
      );
      break;
    default:
      nextState = state;
  }
  return nextState;
}

const DiaryStateContext = createContext<null | DiaryElement[]>(null);
const DiaryDispatchContext = createContext<null | DiaryDispatch>(null);

const DiariesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 다이어리를 기록하기 위함
  const [diaryData, diaryDispatch] = useReducer<
    React.Reducer<DiaryElement[], Action>
  >(reducer, baseDiary);

  const onCreateDiary = ({ page, diary }: IOnCreateDiary) => {
    diaryDispatch({
      type: "CREATE",
      data: {
        page,
        diary,
      },
    });
  };

  const onUpdateDiary = ({ page, diary }: IOnUpdateDiary) => {
    diaryDispatch({
      type: "UPDATE",
      data: {
        page,
        diary,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={diaryData}>
      <DiaryDispatchContext.Provider value={{ onCreateDiary, onUpdateDiary }}>
        {children}
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export { DiariesProvider, DiaryDispatchContext, DiaryStateContext };
