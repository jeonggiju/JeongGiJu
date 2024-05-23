import { useDaysStateContext } from "../hook/useDaysStateContext";
import { getDateMonthDay, getTime } from "../utils/date";
import "./css/CheckLines.css";
import { CheckElement } from "./CheckElement";
import { useEffect, useState } from "react";
import { Day } from "../provider/DaysProvider";
import { useNavigate } from "react-router-dom";
import { useDayDispatchContext } from "../hook/useDayDispatchContext";

interface IProps {
  type: string;
  page: number;
}

const ELEMENTS_PER_PAGE = 130;

export const CheckLines = ({ type, page }: IProps) => {
  const data = useDaysStateContext();
  const { setDayState } = useDayDispatchContext();
  const [dataOfPage, setDataOfPage] = useState<Day[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    setDataOfPage([]);
    const startIdx = (page - 1) * ELEMENTS_PER_PAGE;
    const endIdx = startIdx + ELEMENTS_PER_PAGE;
    setDataOfPage(data.slice(startIdx, endIdx));
  }, [page, data]);

  const onClickDiary = (el: Day) => {
    setDayState(el);
    nav("/DIARY/1");
  };

  return (
    <div className="checkLines">
      <div className="checkLines_cross"></div>
      <div className="checkLines_left">
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
              return (
                <CheckElement
                  type="smoking"
                  key={el.id}
                  check={el.smoking}
                  date={getDateMonthDay(el.createdAt)}
                />
              );
            case "EXERCISE":
              return (
                <CheckElement
                  type="exercise"
                  key={el.id}
                  check={el.exercise}
                  date={getDateMonthDay(el.createdAt)}
                />
              );
            case "STUDY":
              return (
                <CheckElement
                  type="study"
                  key={el.id}
                  time={getTime(el.studyTime)}
                  date={getDateMonthDay(el.createdAt)}
                />
              );
            case "DIARYCHECK":
              return (
                <CheckElement
                  type="diaryCheck"
                  onClick={() => onClickDiary(el)}
                  key={el.id}
                  date={getDateMonthDay(el.createdAt)}
                  check={el.diary === "" ? false : true}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default CheckLines;
