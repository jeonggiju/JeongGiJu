import { useNavigate, useParams } from "react-router-dom";
import BaseNote from "../components/BaseNote";
import { useState } from "react";
import CheckLines from "../components/CheckLines";

export const Diary = () => {
  const { page } = useParams<{ page: string }>();
  const nav = useNavigate();
  const [curPageState, setCurPageState] = useState<number>(Number(page));

  const onClickLeft = () => {
    const newPage = curPageState - 1;
    setCurPageState(newPage);
    nav(`/DIARY/${newPage}`);
  };

  const onClickRight = () => {
    const newPage = curPageState + 1;
    setCurPageState(newPage);
    nav(`/DIARY/${newPage}`);
  };

  return (
    <div>
      <BaseNote
        page={page!}
        site="DIARY"
        onClickLeft={onClickLeft}
        onClickRight={onClickRight}
      >
        <CheckLines type="DIARY"></CheckLines>
      </BaseNote>
    </div>
  );
};

export default Diary;
