import { useNavigate, useParams } from "react-router-dom";
import BaseNote from "../components/BaseNote";
import { useEffect, useRef, useState } from "react";
import TextLines from "../components/TextLines";
import { useDayStateContext } from "../hook/useDayStateContent";
import { dateToString } from "../utils/date";
import { useDayDispatchContext } from "../hook/useDayDispatchContext";

const MAX_HEIGHT = 676;

export const Diary = () => {
  //  한줄에 26px  최대 676
  // clientHeight: 보이는 부분
  // scrollHeight: 실제 높이, 마지막에 줄에 도달하면 676이됨

  const { page } = useParams<{ page: string }>();
  const nav = useNavigate();
  const startIdxRef = useRef<number>(0);
  const { dayState, diaryArrayState } = useDayStateContext();
  const { setDiaryArrayState } = useDayDispatchContext();
  const [loading, setLoading] = useState<boolean>(true);

  const [curPageState, setCurPageState] = useState<number>(Number(page));

  const onClickLeft = () => {
    if (curPageState === 1) {
      nav(`/DIARYCHECK/1`);
    } else {
      const newPage = curPageState - 1;
      setCurPageState(newPage);
      nav(`/DIARY/${newPage}`);
    }
  };

  const onClickRight = () => {
    const newPage = curPageState + 1;
    setCurPageState(newPage);
    nav(`/DIARY/${newPage}`);
  };

  useEffect(() => {
    if (diaryArrayState[curPageState - 1].diary === "") {
      const tempElement = document.createElement("div");
      Object.assign(tempElement.style, {
        position: "absolute",
        boxSizing: "border-box",
        visibility: "hidden",
        lineHeight: "1.565rem",
        fontSize: "0.8rem",
        width: "27.84375rem",
        paddingRight: "0.5625rem",
        paddingLeft: "1.14375rem",
      });
      tempElement.textContent = "";
      document.body.appendChild(tempElement);

      let textHeight = 0;
      let idx = startIdxRef.current;

      while (idx < dayState.diary.length && textHeight <= MAX_HEIGHT) {
        tempElement.textContent = dayState.diary.slice(
          startIdxRef.current,
          ++idx
        );
        textHeight = tempElement.scrollHeight;
      }
      tempElement.textContent = dayState.diary.slice(startIdxRef.current, idx);
      startIdxRef.current = idx - 1;

      const tempDiaryArr = [...diaryArrayState];
      tempDiaryArr[curPageState - 1].diary = tempElement.textContent;
      if (textHeight <= MAX_HEIGHT) {
        tempDiaryArr[curPageState - 1].nextButton = false;
      }
      setDiaryArrayState(tempDiaryArr);

      document.body.removeChild(tempElement);

      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [dayState, curPageState, diaryArrayState, setDiaryArrayState]);

  useEffect(() => {}, [curPageState]);

  return (
    <div>
      <BaseNote
        page={page!}
        site="DIARY"
        onClickLeft={onClickLeft}
        onClickRight={onClickRight}
        nextButtonState={diaryArrayState[curPageState - 1].nextButton}
      >
        {loading ? (
          <div>loading...</div>
        ) : (
          <TextLines
            date={dateToString(dayState.createdAt)}
            diary={diaryArrayState[curPageState - 1].diary}
          />
        )}
      </BaseNote>
    </div>
  );
};

export default Diary;
