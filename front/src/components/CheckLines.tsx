import { useDaysStateContext } from "../hook/useDaysStateContext";
import "./css/CheckLines.css";
import { CheckElement } from "./CheckElement";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDayDispatchContext } from "../hook/useDayDispatchContext";
import { ICheckList } from "../provider/DaysProvider";

interface IProps {
  type: string;
  page: number;
}

const leftFirst = (type: string) => {
  let el;

  switch (type) {
    case "EXERCISE":
      el = <div>운동</div>;
      break;
    case "SLEEP":
      el = <div>숙면</div>;
      break;
    case "STUDY":
      el = <div>공부</div>;
      break;
    case "SMOKING":
      el = <div>금연</div>;
      break;

    case "DIARYCHECK":
      el = <div>일기</div>;
      break;
    default:
      el = null;
  }

  return el;
};

const leftSecond = (type: string) => {
  let el;

  switch (type) {
    case "EXERCISE":
      el = <div>몸무게</div>;
      break;
    case "SLEEP":
      el = <div>기상 시간</div>;
      break;
    case "STUDY":
      el = <div>공부 시간</div>;
      break;
    case "SMOKING":
      el = <div>금연 여부</div>;
      break;
    default:
      el = null;
  }

  return el;
};

const leftThird = (type: string) => {
  let el;

  switch (type) {
    case "EXERCISE":
      el = <div>무산소</div>;
      break;
    case "SLEEP":
      el = <div>취침 시간</div>;
      break;
    default:
      el = null;
  }

  return el;
};

const leftFourth = (type: string) => {
  let el;

  switch (type) {
    case "EXERCISE":
      el = <div>유산소</div>;
      break;
    default:
      el = null;
  }

  return el;
};

export const CheckLines = ({ type, page }: IProps) => {
  const { checkList } = useDaysStateContext();
  const { setDayState } = useDayDispatchContext();
  const [dataOfPage, setDataOfPage] = useState<ICheckList[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    let ELEMENTS_PER_PAGE;
    switch (type) {
      case "EXERCISE":
        ELEMENTS_PER_PAGE = 60;
        break;
      case "SLEEP":
        ELEMENTS_PER_PAGE = 90;
        break;

      default:
        ELEMENTS_PER_PAGE = 130;
    }
    setDataOfPage([]);
    if (typeof checkList === "undefined") return;
    else {
      const startIdx = (page - 1) * ELEMENTS_PER_PAGE;
      const endIdx = startIdx + ELEMENTS_PER_PAGE;
      setDataOfPage(checkList.slice(startIdx, endIdx));
    }
  }, [page, checkList, type]);

  const onClickDiary = (el: ICheckList) => {
    setDayState({ id: el.id, createdAt: el.createdAt, diary: el.diary });
    nav("/DIARY/1");
  };

  return (
    <div className="checkLines">
      <div className="checkLines_cross"></div>
      <div className="checkLines_left">
        <div className="checkLines_bold checkLines_bold_up"></div>
        <div className="checkLines_bold"></div>
        <div className="leftFirst">{leftFirst(type)}</div>
        <div className="leftSecond">{leftSecond(type)}</div>
        <div className="leftThird">{leftThird(type)}</div>
        <div className="leftFourth">{leftFourth(type)}</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div className="checkLines_bold"></div>
      </div>

      <div className="checkLines_right">
        <div className="checkLines_bold checkLines_bold_up"></div>
        <div className="checkLines_bold"></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div className="checkLines_bold"></div>
      </div>

      {/* 130개 들어감 */}
      <div className="checkLines_rightContent">
        {dataOfPage.map((el) => {
          switch (type) {
            case "SMOKING":
              return <CheckElement type="smoking" key={el.id} data={el} />;
            case "EXERCISE":
              return <CheckElement type="exercise" key={el.id} data={el} />;
            case "STUDY":
              return <CheckElement type="study" key={el.id} data={el} />;
            case "DIARYCHECK":
              return (
                <CheckElement
                  type="diary"
                  onClick={() => onClickDiary(el)}
                  key={el.id}
                  data={el}
                />
              );
            case "SLEEP":
              return <CheckElement type="sleep" key={el.id} data={el} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default CheckLines;
