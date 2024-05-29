import "./css/TextLines.css";
import "./css/TextElement.css";
import { useRef } from "react";
import Button from "./Button";
import { useDaysDispatchContext } from "../hook/useDaysDispatchContext";

interface IProps {
  date: string;
  diary: string;
  id: string;
}

const TextLines = ({ id, date, diary }: IProps) => {
  const rightContentRef = useRef<HTMLDivElement>(null);
  const { onDelete } = useDaysDispatchContext();
  console.log(id);

  const onClickDelete = async (checkListId: string) => {
    if (window.confirm("복구가 불가합니다. 정말 삭제할까요?")) {
      onDelete(checkListId);
    }
  };

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
        <div className="textLines_bold">
          <Button
            onClick={() => {
              onClickDelete(id);
            }}
            text="삭제하기"
          ></Button>
        </div>
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
