import { useState } from "react";
import "./DiaryDiv.css";
import Button from "./Button";
import { useParams } from "react-router-dom";

export const DiaryDiv = () => {
  const [textData, setTextData] = useState<string>("");
  const param = useParams();

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextData(e.target.value);
    console.log(`글자 수: ${e.target.value.length}`);
    console.log(`높이: ${e.target.scrollHeight}`);
    if (e.target.scrollHeight > 677) {
      console.log("다음 페이지로 넘어가야함");
    }
  };
  return (
    <div className="diaryDiv">
      <div className="note_lines_cross"></div>
      <div className="note_left">
        <div className="note_bold note_bold_up"></div>
        <div className="note_bold"></div>
        <div>체크리스트</div>
        <div></div>
        <div></div>
        <div>일기 {param.page}</div>
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
        <div className="note_bold">
          <Button text="작성 완료"></Button>
        </div>
      </div>

      <div className="note_right">
        <div className="note_bold note_bold_up"></div>
        <div className="note_bold"></div>
        <div className="right_one">
          <div>공부 시간</div>
          <div>운동</div>
          <div>흡연</div>
        </div>
        <div className="right_two">
          <div className="time">
            <input type="text" />시
            <input type="text" />분
          </div>
          <div>
            <input type="checkbox" />
          </div>
          <div>
            <input type="checkbox" />
          </div>
        </div>
        <div></div>
        <div>
          <textarea
            className="firstTextArea"
            onChange={onChangeTextArea}
            value={textData}
            spellCheck="false"
            placeholder="오늘은 어떤 일이 있었나요?"
          ></textarea>
        </div>
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
        <div className="note_bold"></div>
      </div>
    </div>
  );
};

export default DiaryDiv;