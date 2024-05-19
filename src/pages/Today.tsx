import { useNavigate, useParams } from "react-router-dom";
import BaseNote from "../components/BaseNote";
import { TodayDiv } from "../components/TodayDiv";
import { useEffect, useState } from "react";
import TodayOther from "../components/TodayOther";

export const Today = () => {
  const { page } = useParams<{ page: string }>();
  const nav = useNavigate();
  const [curPageState, setCurPageState] = useState<number>(Number(page));

  useEffect(() => {
    setCurPageState(Number(page));
  }, [page]);

  const onClickLeft = () => {
    const newPage = curPageState - 1;
    nav(`/TODAY/${newPage}`);
  };

  const onClickRight = () => {
    const newPage = curPageState + 1;
    nav(`/TODAY/${newPage}`);
  };

  const DiaryPageChange = () => {
    return curPageState === 1 ? <TodayDiv /> : <TodayOther />;
  };

  return (
    <div>
      <BaseNote
        page={page!}
        site="TODAY"
        onClickLeft={onClickLeft}
        onClickRight={onClickRight}
      >
        {DiaryPageChange()}
      </BaseNote>
    </div>
  );
};

export default Today;
