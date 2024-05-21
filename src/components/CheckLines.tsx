import { useDaysStateContext } from "../hook/useDaysStateContext";
import { getDateMonthDay, getTime } from "../utils/date";
import "./css/CheckLines.css";
import { CheckElement } from "./CheckElement";
import { useEffect, useState } from "react";
import { Day } from "../provider/DaysProvider";

interface IProps {
  type: string;
  page: number;
}

const ELEMENTS_PER_PAGE = 130;

export const CheckLines = ({ type, page }: IProps) => {
  const data = useDaysStateContext();
  const [dataOfPage, setDataOfPage] = useState<Day[]>([]);

  useEffect(() => {
    setDataOfPage([]);
    const startIdx = (page - 1) * ELEMENTS_PER_PAGE;
    const endIdx = startIdx + ELEMENTS_PER_PAGE;
    setDataOfPage(data.slice(startIdx, endIdx));
  }, [page, data]);

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
      <div className="rightContent">
        {dataOfPage.map((el) => {
          switch (type) {
            case "SMOKING":
              return (
                <CheckElement
                  key={el.id}
                  check={el.smoking}
                  date={getDateMonthDay(el.createdAt)}
                />
              );
            case "EXERCISE":
              return (
                <CheckElement
                  key={el.id}
                  check={el.exercise}
                  date={getDateMonthDay(el.createdAt)}
                />
              );
            case "STUDY":
              return (
                <CheckElement
                  key={el.id}
                  time={getTime(el.studyTime)}
                  date={getDateMonthDay(el.createdAt)}
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
