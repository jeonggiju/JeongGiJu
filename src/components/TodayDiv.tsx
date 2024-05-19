import { useEffect, useRef, useState } from "react";
import "./css/TodayDiv.css";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import { setHourMinute } from "../utils/date";
import { useDaysDispatchContext } from "../hook/useDaysDispatchContext";
import { useDiariesDispatchStateContext } from "../hook/useDiariesDispatchStateContext";
import { useDiariesStateContext } from "../hook/useDiariesStateContext";

export const TodayDiv = () => {
  const nav = useNavigate();
  const param = useParams();

  const [hourState, setHourState] = useState(0);
  const [minuteState, setMinuteState] = useState(0);
  const [submitState, setSubmitState] = useState(false); // 제출할 때 비동기적으로 처리됨을 해결

  const { onCreate } = useDaysDispatchContext();
  const {
    onCreateDiary,
    onToggleExerciseCheck,
    onUpdateStudyTimeCheck,
    onToggleSmokingCheck,
  } = useDiariesDispatchStateContext();
  const { diaryData, checkData } = useDiariesStateContext();

  const [curDiaryState, setCurDiaryState] = useState<string>("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const onChangeHourInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHourState(Number(e.target.value));
    onUpdateStudyTimeCheck(setHourMinute(hourState, minuteState));
  };
  const onChangeMinuteInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinuteState(Number(e.target.value));
    onUpdateStudyTimeCheck(setHourMinute(hourState, minuteState));
  };

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 다음페이지로 넘어가야할 때
    if (e.target.scrollHeight > 609) {
      onCreateDiary({ page: Number(param.page), diary: curDiaryState });
      console.log({ diaryData });
      nav(`/TODAY/${Number(param.page) + 1}`);
    } else {
      setCurDiaryState(e.target.value);
    }
  };

  const onClickSubmit = () => {
    onCreateDiary({ page: Number(param.page), diary: curDiaryState });
    setSubmitState(true);
  };

  useEffect(() => {
    if (submitState) {
      const result = window.confirm("오늘 일기를 다 쓰셨나요?");
      if (result) {
        const newDay = {
          email: "111@344",
          studyTime: checkData.studyTime,
          smoking: checkData.smoking,
          exercise: checkData.exercise,
          diary: diaryData
            .map((el) => {
              if (el.diary !== "") return el.diary;
            })
            .join(""), // page 단위의 string 배열을 합침
        };

        onCreate(newDay);
        // nav("/DIARY/1", { replace: true });
        setSubmitState(false);
      }
    }
  }, [
    submitState, // <--
    onCreate,
    checkData,
    diaryData,
  ]);

  useEffect(() => {
    setCurDiaryState(diaryData[Number(param.page) - 1].diary);
  }, [
    param.page, // <- 처음 랜더링 될 때
    diaryData,
  ]);

  useEffect(() => {
    adjustTextAreaHeight();
  }, [
    curDiaryState, // <- 입력이 될 때 마다
  ]);

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
              // checked={exerciseState}
              onChange={onToggleExerciseCheck}
            />
          </div>
          <div>
            <input
              name="smoking"
              type="checkbox"
              // checked={smokingState}
              onChange={onToggleSmokingCheck}
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

export default TodayDiv;
