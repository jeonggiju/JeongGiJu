import { useMutation, useQuery } from "@apollo/client";
import { ReactNode, createContext, useEffect, useReducer } from "react";
import { CREATE_CHECKLIST_MUTATION } from "../graphql/mutations";
import { GET_CHECKLISTS_BY_USER } from "../graphql/queries";

// 처음 db에 정보를 가져옴
export interface ICheckList {
  id: string;
  createdAt: Date;
  smoking: boolean;
  exercise: boolean;
  studyTime: Date;
  diary: string;
  user: {
    id: string;
  };
}

interface Action {
  data: ICheckList | ICheckList[];
  type: string;
}

interface IDaysDispatchContext {
  onCreate: (checkList: Omit<ICheckList, "id" | "createdAt" | "user">) => void;

  onInit: (checkList: ICheckList) => void;
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

  const [createCheckList] = useMutation(CREATE_CHECKLIST_MUTATION);
  const { data } = useQuery(GET_CHECKLISTS_BY_USER, {
    variables: { userId: "e9885745-1749-4bfe-bcd7-d14e19c78439" },
  });

  useEffect(() => {
    if (data && data.findAllCheckList) {
      const formattedData = data.findAllCheckList.map((item: ICheckList) => ({
        ...item,
        createdAt: new Date(item.createdAt),
        studyTime: new Date(item.studyTime),
        user: {
          id: item.user.id,
        },
      }));
      dispatchCheckList({
        type: "INIT",
        data: formattedData,
      });
    }
  }, [data]);

  const onCreate = async (
    checkList: Pick<ICheckList, "diary" | "exercise" | "smoking" | "studyTime">
  ) => {
    try {
      const response = await createCheckList({
        variables: {
          createCheckListInput: {
            exercise: checkList.exercise,
            studyTime: new Date(checkList.studyTime).toISOString(),
            diary: checkList.diary,
            smoking: checkList.smoking,
          },
          userId: "e9885745-1749-4bfe-bcd7-d14e19c78439",
        },
      });

      if (response.data) {
        dispatchCheckList({
          type: "CREATE",
          data: {
            id: response.data.createCheckList.id,
            createdAt: new Date(response.data.createCheckList.createdAt),
            studyTime: new Date(response.data.createCheckList.studyTime),
            smoking: response.data.createCheckList.smoking,
            exercise: response.data.createCheckList.exercise,
            diary: response.data.createCheckList.diary,
            user: { id: response.data.createCheckList.user.id },
          },
        });
      }
    } catch (e) {
      alert("서버 연결 오류");
      console.log(e);
    }
  };

  const onInit = async (checkList: ICheckList) => {
    dispatchCheckList({
      type: "INIT",
      data: {
        id: checkList.id,
        createdAt: new Date(checkList.createdAt),
        studyTime: new Date(checkList.studyTime),
        smoking: checkList.smoking,
        exercise: checkList.exercise,
        diary: checkList.diary,
        user: {
          id: checkList.user.id,
        },
      },
    });
  };

  return (
    <DaysStateContext.Provider value={{ checkList }}>
      <DaysDispatchContext.Provider value={{ onCreate, onInit }}>
        {children}
      </DaysDispatchContext.Provider>
    </DaysStateContext.Provider>
  );
};

export { DaysProvider, DaysStateContext, DaysDispatchContext };
