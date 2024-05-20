import { useDaysStateContext } from "../hook/useDaysStateContext";
import { getDateMonthDay, getTime } from "../utils/date";
import "./css/CheckLines.css";
import Element from "./Element";

interface IProps {
  type: string;
}

export const CheckLines = ({ type }: IProps) => {
  console.log(type);

  const data = useDaysStateContext();
  console.log(data);

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

      <div className="rightContent">
        {data.map((el) => {
          switch (type) {
            case "SMOKING":
              return (
                <Element
                  key={el.id}
                  check={el.smoking}
                  date={getDateMonthDay(el.createdAt)}
                />
              );
            case "EXERCISE":
              return (
                <Element
                  key={el.id}
                  check={el.exercise}
                  date={getDateMonthDay(el.createdAt)}
                />
              );
            case "STUDY":
              return (
                <Element
                  key={el.id}
                  time={getTime(el.studyTime)}
                  date={getDateMonthDay(el.createdAt)}
                />
              );
          }
        })}
        {/* <Element check={false} date="05/24" />
        <Element time="05:12" date="5/24" />
        <Element check={true} date="5/24" /> */}
      </div>
    </div>
  );
};

export default CheckLines;
