import { useMutation } from "@apollo/client";
import { ReactNode, createContext, useReducer } from "react";
import {
  CREATE_CHECKLIST_MUTATION,
  REMOVE_CHECKLIST_MUTATION,
} from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

// 처음 db에 정보를 가져옴
export interface ICheckList {
  id: string;
  createdAt: Date;

  wakeTime: Date;
  sleepTime: Date;
  studyTime: Date;

  smoking: boolean;
  cardio: boolean;
  anaerobic: boolean;

  weight: number;

  diary: string;
  user: {
    id: string;
  };
}

interface Action {
  data: ICheckList | ICheckList[] | string;
  type: string;
}

interface IDaysDispatchContext {
  onCreate: (checkList: Omit<ICheckList, "id" | "createdAt" | "user">) => void;
  onDelete: (Id: string) => void;

  onInit: (checkList: ICheckList[]) => void;
}

interface IDaysStateContext {
  checkList: ICheckList[];
}

// state 기존 데이터, action 받아온 데이터
function reducer(state: ICheckList[], action: Action): ICheckList[] {
  let nextState;

  switch (action.type) {
    case "INIT":
      nextState = action.data as ICheckList[];
      break;

    case "CREATE":
      nextState = [...state, action.data as ICheckList];
      break;

    case "DELETE":
      nextState = state.filter((el) => String(el.id) !== String(action.data));
      break;
    default:
      nextState = state;
  }
  return nextState;
}

const DaysStateContext = createContext<null | IDaysStateContext>(null);
const DaysDispatchContext = createContext<null | IDaysDispatchContext>(null);

const DaysProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [checkList, dispatchCheckList] = useReducer<
    React.Reducer<ICheckList[], Action>
  >(reducer, []);
  const [removeCheckList] = useMutation(REMOVE_CHECKLIST_MUTATION);
  const [createCheckList] = useMutation(CREATE_CHECKLIST_MUTATION);
  const nav = useNavigate();

  const onCreate = async (
    checkList: Omit<ICheckList, "id" | "user" | "createdAt">
  ) => {
    try {
      const response = await createCheckList({
        variables: {
          createCheckListInput: {
            wakeTime: new Date(checkList.wakeTime).toISOString(),
            sleepTime: new Date(checkList.sleepTime).toISOString(),
            studyTime: new Date(checkList.studyTime).toISOString(),

            anaerobic: checkList.anaerobic,
            cardio: checkList.cardio,
            smoking: checkList.smoking,

            weight: checkList.weight,

            diary: checkList.diary,
          },
          userId: "6e8198e9-65c8-49c8-9a0a-d17f4e1b5173",
        },
      });

      if (response.data) {
        dispatchCheckList({
          type: "CREATE",
          data: {
            id: response.data.createCheckList.id,
            createdAt: new Date(response.data.createCheckList.createdAt),

            wakeTime: new Date(response.data.createCheckList.wakeTime),
            sleepTime: new Date(response.data.createCheckList.sleepTime),
            studyTime: new Date(response.data.createCheckList.studyTime),

            anaerobic: response.data.createCheckList.anaerobic,
            cardio: response.data.cardio,
            smoking: response.data.createCheckList.smoking,
            diary: response.data.createCheckList.diary,

            weight: response.data.createCheckList.weight,
            user: { id: response.data.createCheckList.user.id },
          },
        });
      }
    } catch (e) {
      alert("서버 연결 오류");
      console.log(e);
    }
  };

  const onInit = async (checkList: ICheckList[]) => {
    dispatchCheckList({
      type: "INIT",
      data: checkList,
    });
  };

  const onDelete = async (id: string) => {
    let response;
    try {
      response = await removeCheckList({
        variables: { checkListId: id },
      });
      if (response) alert("성공적으로 삭제 되었습니다.");

      dispatchCheckList({
        type: "DELETE",
        data: id,
      });

      nav("/DIARYCHECK/1", { replace: true });
    } catch (e) {
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <DaysStateContext.Provider value={{ checkList }}>
      <DaysDispatchContext.Provider value={{ onCreate, onInit, onDelete }}>
        {children}
      </DaysDispatchContext.Provider>
    </DaysStateContext.Provider>
  );
};

export { DaysProvider, DaysStateContext, DaysDispatchContext };
