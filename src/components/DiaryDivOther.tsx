import { useState } from "react";
import "./DiaryDivOther.css";
import Button from "./Button";
import { useParams } from "react-router-dom";

export const DiaryDivOther = () => {
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
    <div className="diaryDivOther">
      <div className="other_lines_cross"></div>
      <div className="other_left">
        <div className="other_bold other_bold_up"></div>
        <div className="other_bold"></div>
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
        <div></div>
        <div></div>
        <div></div>
        <div className="other_bold">
          <Button text="작성 완료"></Button>
        </div>
      </div>

      <div className="other_right">
        <div className="other_bold other_bold_up"></div>
        <div className="other_bold">
          <textarea
            className="nextTextArea"
            onChange={onChangeTextArea}
            value={textData}
            spellCheck="false"
            placeholder="다음 이야기가 궁금해요!"
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
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div className="other_bold"></div>
      </div>
    </div>
  );
};

export default DiaryDivOther;
