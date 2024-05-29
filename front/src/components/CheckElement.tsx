import { ICheckList } from "../provider/DaysProvider";
import { getDateMonthDay, getTime } from "../utils/date";
import "./css/CheckElement.css";

interface IProps {
  type: string;
  data: ICheckList;
  onClick?: () => void;
}

// 필요없음
// type ElementType =
//   | "smoking"
//   | "exercise"
//   | "study"
//   | "diaryCheck"
//   | "sleep"
//   | "weight";

export const CheckElement = (props: IProps) => {
  // 일기버튼을 위함
  const showDiary = () => {
    if (props.data.diary !== "" && props.type === "diary") {
      props.onClick!();
    }
  };

  const getContent = () => {
    let el;
    switch (props.type) {
      case "smoking":
        if (props.data.smoking)
          el = (
            <div className="checkElement_content checkElement_content_true">
              ○
            </div>
          );
        else
          el = (
            <div className="checkElement_content checkElement_content_false">
              ✕
            </div>
          );
        break;
      case "diary":
        if (props.data.diary !== "") {
          el = (
            <div className="checkElement_content checkElement_content_true">
              ○
            </div>
          );
        } else {
          el = (
            <div className="checkElement_content checkElement_content_false">
              ✕
            </div>
          );
        }
        break;

      case "study":
        el = (
          <div className="checkElement_content checkElement_content_time">
            {getTime(props.data.studyTime)}
          </div>
        );
        break;

      case "exercise":
        el = (
          <>
            <div className={`checkElement_content`}>{props.data.weight}</div>

            <div
              className={`checkElement_content checkElement_content_${
                props.data.anaerobic ? "true" : "false"
              }`}
            >
              {props.data.anaerobic ? "○" : "x"}
            </div>
            <div
              className={`checkElement_content checkElement_content_${
                props.data.cardio ? "true" : "false"
              }`}
            >
              {props.data.cardio ? "○" : "x"}
            </div>
          </>
        );
        break;

      case "sleep":
        el = (
          <>
            <div className={`checkElement_content `}>
              {getTime(props.data.wakeTime)}
            </div>
            <div className="checkElement_content">
              {getTime(props.data.sleepTime)}
            </div>
          </>
        );
        break;
    }

    return el;
  };

  return (
    <div
      className={`checkElement checkElement_${props.type}  checkElement_${
        props.type
      }_${props.data.diary === "" ? "false" : "true"}`}
      onClick={showDiary}
    >
      <div className="checkElement_date">
        {getDateMonthDay(props.data.createdAt)}
      </div>

      {getContent()}
    </div>
  );
};

export default Element;
