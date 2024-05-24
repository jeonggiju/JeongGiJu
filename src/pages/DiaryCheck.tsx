import { useNavigate, useParams } from "react-router-dom";
import BaseNote from "../components/BaseNote";
import { useEffect, useState } from "react";
import CheckLines from "../components/CheckLines";
import { useDayDispatchContext } from "../hook/useDayDispatchContext";

export const DiaryCheck = () => {
  const { page } = useParams<{ page: string }>();
  const nav = useNavigate();
  const [curPageState, setCurPageState] = useState<number>(Number(page));
  const { setDiaryArrayState } = useDayDispatchContext();

  useEffect(() => {
    setDiaryArrayState([
      { diary: "", nextButton: true },
      { diary: "", nextButton: true },
      { diary: "", nextButton: true },
      { diary: "", nextButton: true },
      { diary: "", nextButton: true },
      { diary: "", nextButton: true },
      { diary: "", nextButton: true },
      { diary: "", nextButton: true },
      { diary: "", nextButton: true },
    ]);
  }, [setDiaryArrayState]);

  const onClickLeft = () => {
    const newPage = curPageState - 1;
    setCurPageState(newPage);
    nav(`/DIARYCHECK/${newPage}`);
  };

  const onClickRight = () => {
    const newPage = curPageState + 1;
    setCurPageState(newPage);
    nav(`/DIARYCHECK/${newPage}`);
  };

  return (
    <div>
      <BaseNote
        page={page!}
        site="DIARYCHECK"
        onClickLeft={onClickLeft}
        onClickRight={onClickRight}
      >
        <CheckLines type="DIARYCHECK" page={curPageState} />
      </BaseNote>
    </div>
  );
};

export default DiaryCheck;
