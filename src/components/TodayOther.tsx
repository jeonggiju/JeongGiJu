import { useEffect, useRef, useState } from "react";
import "./css/TodayOther.css";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDiariesDispatchStateContext } from "../hook/useDiariesDispatchStateContext";
import { useDiariesStateContext } from "../hook/useDiariesStateContext";
import { useDaysDispatchContext } from "../hook/useDaysDispatchContext";

interface ITodayOther {
  curPageState: number;
  setCurPageState: React.Dispatch<React.SetStateAction<number>>;
}

export const TodayOther = ({ curPageState, setCurPageState }: ITodayOther) => {
  const { page } = useParams<{ page: string }>();
  const nav = useNavigate();

  const [submitState, setSubmitState] = useState(false); // 제출할 때 비동기적으로 처리됨을 해결

  const { onCreateDiary, setCurDiaryState, onInitCheck, onInitDiary } =
    useDiariesDispatchStateContext();
  const { diaryData, checkData, curDiaryState } = useDiariesStateContext();
  const { onCreate } = useDaysDispatchContext();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 다음페이지로 넘어가야할 때
    if (e.target.scrollHeight > 684) {
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

  // 처음 랜더링 될떄 textArea에 focus
  // useEffect(() => {
  //   if (textAreaRef.current) {
  //     textAreaRef.current.focus();
  //   }
  // }, []);
  //
  // 처음 랜더링 될 때 화면에 작성 내용 갱신
  useEffect(() => {
    setCurDiaryState(diaryData[Number(page) - 1].diary);
  }, [
    page, // <- 처음 랜더링 될 때
    diaryData,
    setCurDiaryState,
  ]);

  // 페이지 값이 바뀔 때마다
  useEffect(() => {
    setCurPageState(Number(page));
  }, [page, setCurPageState]);

  // 제출 버튼
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
        nav("/", { replace: true });
      }
    }
  }, [
    submitState, // <--제출될 때
    onCreate,
    checkData,
    diaryData,
    onInitCheck,
    onInitDiary,
    nav,
  ]);

  // 현재 페이지의 글자가 변경될 떄마다 높이 조정
  useEffect(() => {
    adjustTextAreaHeight();
  }, [
    curDiaryState, // <- 입력이 될 때 마다
  ]);

  return (
    <div className="diaryDivOther">
      <div className="other_lines_cross"></div>
      <div className="other_left">
        <div className="other_bold other_bold_up"></div>
        <div className="other_bold"></div>
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
        <div></div>
        <div></div>
        <div></div>
        <div className="other_bold">
          <Button text="작성 완료" onClick={onClickSubmit}></Button>
        </div>
      </div>

      <div className="other_right">
        <div className="other_bold other_bold_up"></div>
        <div className="other_bold">
          <textarea
            ref={textAreaRef}
            className="nextTextArea"
            onChange={onChangeTextArea}
            value={curDiaryState}
            spellCheck="false"
            placeholder="다음 이야기가 궁금해요!"
          />
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

export default TodayOther;
