import { useNavigate, useParams } from "react-router-dom";
import BaseNote from "../components/BaseNote";
import { TodayDiv } from "../components/TodayDiv";
import { useEffect, useState } from "react";
import TodayOther from "../components/TodayOther";
import { getDateKorea } from "../utils/date";
import { useDiariesDispatchStateContext } from "../hook/useDiariesDispatchStateContext";
import { useDiariesStateContext } from "../hook/useDiariesStateContext";

export const Today = () => {
  const nav = useNavigate();
  const { page } = useParams<{ page: string }>();
  const [curPageState, setCurPageState] = useState<number>(Number(page));
  const today = getDateKorea();
  const { onCreateDiary } = useDiariesDispatchStateContext();
  const { curDiaryState } = useDiariesStateContext();

  useEffect(() => {
    setCurPageState(Number(page));
  }, [page]);

  const onClickLeft = () => {
    onCreateDiary({ page: Number(page), diary: curDiaryState });

    const newPage = curPageState - 1;
    setCurPageState(newPage);
    nav(`/TODAY/${newPage}`);
  };

  const onClickRight = () => {
    onCreateDiary({ page: Number(page), diary: curDiaryState });
    const newPage = curPageState + 1;
    setCurPageState(newPage);
    nav(`/TODAY/${newPage}`);
  };

  const DiaryPageChange = () => {
    return curPageState === 1 ? (
      <TodayDiv curPageState={curPageState} setCurPageState={setCurPageState} />
    ) : (
      <TodayOther
        curPageState={curPageState}
        setCurPageState={setCurPageState}
      />
    );
  };

  return (
    <div>
      <BaseNote
        page={page!}
        site="TODAY"
        onClickLeft={onClickLeft}
        onClickRight={onClickRight}
        today={today}
      >
        {DiaryPageChange()}
      </BaseNote>
    </div>
  );
};

export default Today;
