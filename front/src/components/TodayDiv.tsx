import { useEffect, useRef, useState } from "react";
import "./css/TodayDiv.css";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDaysDispatchContext } from "../hook/useDaysDispatchContext";
import { useDiariesDispatchStateContext } from "../hook/useDiariesDispatchStateContext";
import { useDiariesStateContext } from "../hook/useDiariesStateContext";

interface ITodayDiv {
  curPageState: number;
  setCurPageState: React.Dispatch<React.SetStateAction<number>>;
}

export const TodayDiv = ({ curPageState, setCurPageState }: ITodayDiv) => {
  const nav = useNavigate();
  const { page } = useParams<{ page: string }>();

  const [submitState, setSubmitState] = useState(false); // 제출할 때 비동기적으로 처리됨을 해결

  const { onCreate } = useDaysDispatchContext();
  const {
    setCurDiaryState,
    onCreateDiary,
    onUpdateExerciseCheck,
    onUpdateSmokingCheck,
    onUpdateStudyTimeCheck,
    onInitCheck,
    onInitDiary,
  } = useDiariesDispatchStateContext();
  const { diaryData, checkData, curDiaryState } = useDiariesStateContext();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 다음페이지로 넘어가야할 때
    if (e.target.scrollHeight > 609) {
      onCreateDiary({ page: Number(page), diary: curDiaryState });

      const newPage = curPageState + 1;
      setCurPageState(newPage);
      nav(`/TODAY/${newPage}`);
    } else {
      setCurDiaryState(e.target.value);
    }
  };

  const onClickSubmit = () => {
    onCreateDiary({ page: Number(page), diary: curDiaryState });
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

        onInitCheck();
        onInitDiary();
        setSubmitState(false);
        nav("/DIARYCHECK/1", { replace: true });
      }
    }
  }, [
    submitState, // <--제출될 때
    onCreate,
    checkData,
    diaryData,
    nav,
    onInitCheck,
    onInitDiary,
  ]);

  useEffect(() => {
    setCurDiaryState(diaryData[Number(page) - 1].diary);
  }, [
    page, // <- 처음 랜더링 될 때
    diaryData,
    setCurDiaryState,
  ]);

  useEffect(() => {
    adjustTextAreaHeight();
  }, [
    curDiaryState, // <- 입력이 될 때 마다
  ]);

  // 페이지가 값이 바뀔 떄마다
  useEffect(() => {
    setCurPageState(Number(page));
  }, [page, setCurPageState]);

  return (
    <div className="diaryDiv">
      <div className="note_lines_cross"></div>
      <div className="note_left">
        <div className="note_bold note_bold_up"></div>
        <div className="note_bold"></div>
        <div>체크리스트</div>
        <div></div>
        <div></div>
        <div>일기 {page}</div>
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
              value={checkData.studyTime.hour}
              min={0}
              max={24}
              onChange={(e) => {
                onUpdateStudyTimeCheck({
                  hour: Number(e.target.value),
                  minute: checkData.studyTime.minute,
                });
              }}
            />
            시간
            <input
              type="number"
              min={0}
              max={60}
              value={checkData.studyTime.minute}
              onChange={(e) => {
                onUpdateStudyTimeCheck({
                  hour: checkData.studyTime.hour,
                  minute: Number(e.target.value),
                });
              }}
            />
            분
          </div>
          <div>
            <input
              name="exercise"
              type="checkbox"
              checked={checkData.exercise}
              onChange={() => {
                onUpdateExerciseCheck(!checkData.exercise);
              }}
            />
          </div>
          <div>
            <input
              name="smoking"
              type="checkbox"
              checked={checkData.smoking}
              onChange={() => {
                onUpdateSmokingCheck(!checkData.smoking);
              }}
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
