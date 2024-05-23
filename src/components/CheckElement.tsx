import "./css/CheckElement.css";

interface IProps {
  date: string;
  type: string;
  check?: boolean;
  time?: string;
  onClick?: () => void;
}

export const CheckElement = (props: IProps) => {
  const getContent = () => {
    if (props.time)
      return (
        <div className="checkElement_content checkElement_content_time">
          {props.time}
        </div>
      );

    if (props.check)
      return (
        <div className="checkElement_content checkElement_content_true">○</div>
      );
    else
      return (
        <div className="checkElement_content checkElement_content_false">✕</div>
      );
  };

  return (
    <div
      className={`checkElement checkElement_${props.type}`}
      onClick={props.onClick}
    >
      <div className="checkElement_date">{props.date}</div>
      {getContent()}
    </div>
  );
};

export default Element;
