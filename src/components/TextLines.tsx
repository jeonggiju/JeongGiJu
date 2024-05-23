import "./css/TextLines.css";
import "./css/TextElement.css";
import { useRef } from "react";

interface IProps {
  date: string;
  diary: string;
}

const TextLines = ({ date, diary }: IProps) => {
  const rightContentRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   console.log(rightContentRef.current?.clientHeight);
  //   console.log(rightContentRef.current?.scrollHeight);
  // }, []);

  return (
    <div className="textLines">
      <div className="textLines_cross"></div>
      <div className="textLines_left">
        <div className="textLines_bold textLines_bold_up"></div>
        <div className="textLines_bold"></div>
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
        <div className="textLines_bold"></div>
      </div>

      <div className="textLines_right">
        <div className="textLines_bold textLines_bold_up"></div>
        <div className="textLines_bold">{date}</div>
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
        <div className="textLines_bold"></div>
      </div>

      <div className="rightContent" ref={rightContentRef}>
        {diary}
      </div>
    </div>
  );
};

export default TextLines;
