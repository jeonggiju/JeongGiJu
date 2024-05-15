import { useState } from "react";
import "./DiaryDiv.css";

export const DiaryDiv = () => {
  const [textData, setTextData] = useState<string>("");

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextData(e.target.value);
    console.log(e.target.value.length);
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
        <div>일기</div>
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
