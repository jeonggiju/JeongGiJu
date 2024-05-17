import "./css/Element.css";

interface IProps {
  date: string;
  check?: boolean;
  time?: string;
}

export const Element = (props: IProps) => {
  const getContent = () => {
    if (props.time)
      return (
        <div className="element_content element_content_time">{props.time}</div>
      );

    if (props.check)
      return <div className="element_content element_content_true">○</div>;
    else return <div className="element_content element_content_false">✕</div>;
  };

  return (
    <div className="element">
      <div className="date">{props.date}</div>
      {getContent()}
    </div>
  );
};

export default Element;
