import { useEffect, useRef, useState } from "react";
import "./css/DiaryDiv.css";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import { setHourMinute } from "../utils/date";
import { useDaysDispatchContext } from "../hook/useDaysDispatchContext";
import { useDiariesDispatchStateContext } from "../hook/useDiariesDispatchStateContext";
import { useDiariesStateContext } from "../hook/useDiariesStateContext";

export const DiaryDiv = () => {
  const nav = useNavigate();
  const param = useParams();
  const { onCreate } = useDaysDispatchContext();
  const [hourState, setHourState] = useState<number>(0);
  const [minuteState, setMinuteState] = useState<number>(0);
  const [smokingState, setSmokingState] = useState<boolean>(false);
  const [exerciseState, setExerciseState] = useState<boolean>(false);
  const diaryData = useDiariesStateContext();
  const { onCreateDiary } = useDiariesDispatchStateContext();

  const [curDiaryState, setCurDiaryState] = useState<string>("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }

    setCurDiaryState(e.target.value);
    // onCreateDiary({ page: Number(param.page), diary: e.target.value });

    console.log(`글자 수: ${e.target.value.length}`);
    console.log(`높이: ${e.target.scrollHeight}`);

    // 다음페이지로 넘어가야할 때
    if (e.target.scrollHeight > 609) {
      onCreateDiary({ page: Number(param.page), diary: curDiaryState });
      nav(`/TODAY/${Number(param.page) + 1}`);
    }
  };

  const onChangeHourInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHourState(Number(e.target.value));
  };

  const onChangeMinuteInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinuteState(Number(e.target.value));
  };

  const onChangeExerciseCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseState(e.target.checked);
  };

  const onChangeSmokingCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSmokingState(e.target.checked);
  };

  const onClickSubmit = () => {
    const result = window.confirm("오늘 일기를 다 쓰셨나요?");
    if (result) {
      const newDay = {
        email: "111@344",
        studyTime: setHourMinute(hourState, minuteState),
        smoking: smokingState,
        exercise: exerciseState,
        diary: diaryData
          .map((el) => {
            if (el.diary !== "") return el.diary;
          })
          .join(" "), // page 단위의 string 배열을 합침
      };

      onCreate(newDay);
      nav("/DIARY/1", { replace: true });
    }
  };

  useEffect(() => {
    setCurDiaryState(diaryData[Number(param.page)].diary);
  }, [param.page, diaryData]);

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
          <Button onClick={onClickSubmit} text="작성 완료"></Button>
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
            <input
              type="number"
              value={hourState}
              min={0}
              max={24}
              onChange={onChangeHourInput}
            />
            시간
            <input
              type="number"
              min={0}
              max={60}
              value={minuteState}
              onChange={onChangeMinuteInput}
            />
            분
          </div>
          <div>
            <input
              name="exercise"
              type="checkbox"
              checked={exerciseState}
              onChange={onChangeExerciseCheckbox}
            />
          </div>
          <div>
            <input
              name="smoking"
              type="checkbox"
              checked={smokingState}
              onChange={onChangeSmokingCheckbox}
            />
          </div>
        </div>
        <div></div>
        <div>
          <textarea
            ref={textAreaRef}
            id="firstTextArea"
            className="firstTextArea"
            onChange={onChangeTextArea}
            value={curDiaryState}
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
