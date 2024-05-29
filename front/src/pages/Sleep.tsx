import { useNavigate, useParams } from "react-router-dom";
import BaseNote from "../components/BaseNote";
import { useState } from "react";
import CheckLines from "../components/CheckLines";

export const Sleep = () => {
  const { page } = useParams<{ page: string }>();
  const nav = useNavigate();
  const [curPageState, setCurPageState] = useState<number>(Number(page));

  const onClickLeft = () => {
    const newPage = curPageState - 1;
    setCurPageState(newPage);
    nav(`/SLEEP/${newPage}`);
  };

  const onClickRight = () => {
    const newPage = curPageState + 1;
    setCurPageState(newPage);
    nav(`/SLEEP/${newPage}`);
  };

  return (
    <div>
      <BaseNote
        page={page!}
        site="SLEEP"
        onClickLeft={onClickLeft}
        onClickRight={onClickRight}
      >
        <CheckLines type="SLEEP" page={curPageState} />
      </BaseNote>
    </div>
  );
};

export default Sleep;
