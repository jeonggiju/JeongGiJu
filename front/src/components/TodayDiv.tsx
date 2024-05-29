import { useEffect, useRef, useState } from "react";
import "./css/TodayDiv.css";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDaysDispatchContext } from "../hook/useDaysDispatchContext";
import { useDiariesDispatchStateContext } from "../hook/useDiariesDispatchStateContext";
import { useDiariesStateContext } from "../hook/useDiariesStateContext";
import { changeToDate } from "../utils/date";

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

    onUpdateWakeTime,
    onUpdateStudyTime,
    onUpdateSleepTime,

    onUpdateCardioCheck,
    onUpdateAnaerobicCheck,
    onUpdateSmokingCheck,

    onUpdateWeight,

    onInitCheck,
    onInitDiary,
  } = useDiariesDispatchStateContext();
  const { diaryData, checkData, curDiaryState } = useDiariesStateContext();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // 높이 조절
  const adjustTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  // 자동으로 페이지 넘김
  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 다음페이지로 넘어가야할 때
    console.log(e.target.scrollHeight);
    if (e.target.scrollHeight > 559) {
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
    console.log(curDiaryState);
    setSubmitState(true);
  };

  useEffect(() => {
    if (submitState) {
      if (window.confirm("오늘 일기를 다 쓰셨나요?")) {
        const parsedWeight = parseFloat(checkData.weight);
        if (isNaN(parsedWeight)) {
          alert("잘못된 값입니다. 다시 확인해주세요");
          setSubmitState(false);
          return;
        }

        const newDay = {
          wakeTime: changeToDate(
            checkData.wakeTime.hour,
            checkData.wakeTime.minute
          ),
          sleepTime: changeToDate(
            checkData.sleepTime.hour,
            checkData.sleepTime.minute
          ),

          studyTime: changeToDate(
            checkData.studyTime.hour,
            checkData.studyTime.minute
          ),

          anaerobic: checkData.anaerobic,
          cardio: checkData.cardio,
          smoking: checkData.smoking,

          weight: parsedWeight,
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
        <div></div>
        <div></div>
        <div>일기{page}</div>
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

        {/* 기상 취침 공부 */}
        <div className="right_checkHeader">
          <div>기상</div>
          <div>취침</div>
          <div>공부</div>
        </div>

        {/* 기상 취침 공부를 위한 시간 input */}
        <div className="right_checkHeader_time">
          <div className="time wakeTime">
            <input
              type="number"
              value={checkData.wakeTime.hour}
              min={0}
              max={24}
              onChange={(e) => {
                onUpdateWakeTime({
                  hour: Number(e.target.value),
                  minute: checkData.wakeTime.minute,
                });
              }}
            />
            시간
            <input
              type="number"
              min={0}
              max={60}
              value={checkData.wakeTime.minute}
              onChange={(e) => {
                onUpdateWakeTime({
                  hour: checkData.wakeTime.hour,
                  minute: Number(e.target.value),
                });
              }}
            />
            분
          </div>

          <div className="time sleepTime">
            <input
              type="number"
              min={0}
              max={24}
              value={checkData.sleepTime.hour}
              onChange={(e) => {
                onUpdateSleepTime({
                  hour: Number(e.target.value),
                  minute: checkData.sleepTime.minute,
                });
              }}
            />
            시간
            <input
              type="number"
              min={0}
              max={60}
              value={checkData.sleepTime.minute}
              onChange={(e) => {
                onUpdateSleepTime({
                  hour: checkData.sleepTime.hour,
                  minute: Number(e.target.value),
                });
              }}
            />
            분
          </div>

          <div className="time studyTime">
            <input
              type="number"
              value={checkData.studyTime.hour}
              min={0}
              max={24}
              onChange={(e) => {
                onUpdateStudyTime({
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
                onUpdateStudyTime({
                  hour: checkData.studyTime.hour,
                  minute: Number(e.target.value),
                });
              }}
            />
            분
          </div>
          <div></div>
          <div></div>
        </div>

        {/* 아침 점심 저녁 */}
        <div className="right_checkHeader">
          <span>무산소</span>
          <span>유산소</span>
          <span>몸무게</span>
          <span>흡연</span>
        </div>

        <div className="right_checkbox">
          <div>
            <input
              className="checkbox"
              name="anaerobic"
              type="checkbox"
              checked={checkData.anaerobic}
              onChange={() => {
                onUpdateAnaerobicCheck(!checkData.anaerobic);
              }}
            />
          </div>
          <div>
            <input
              className="checkbox"
              name="cardio"
              type="checkbox"
              checked={checkData.cardio}
              onChange={() => {
                onUpdateCardioCheck(!checkData.cardio);
              }}
            />
          </div>

          <div className="right_checkbox_weight">
            <input
              type="text"
              value={checkData.weight}
              onChange={(e) => {
                onUpdateWeight(e.target.value);
              }}
            />
            kg
          </div>

          <div>
            <input
              className="checkbox"
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
        <div className="note_bold"></div>
      </div>
    </div>
  );
};

export default TodayDiv;
