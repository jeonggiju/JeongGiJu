import { useNavigate, useParams } from "react-router-dom";
import BaseNote from "../components/BaseNote";
import { useState } from "react";
import CheckLines from "../components/CheckLines";

export const Exercise = () => {
  const { page } = useParams<{ page: string }>();
  const nav = useNavigate();
  const [curPageState, setCurPageState] = useState<number>(Number(page));

  const onClickLeft = () => {
    const newPage = curPageState - 1;
    setCurPageState(newPage);
    nav(`/EXERCISE/${newPage}`);
  };

  const onClickRight = () => {
    const newPage = curPageState + 1;
    setCurPageState(newPage);
    nav(`/EXERCISE/${newPage}`);
  };

  return (
    <div>
      <BaseNote
        page={page!}
        site="EXERCISE"
        onClickLeft={onClickLeft}
        onClickRight={onClickRight}
      >
        <CheckLines type="EXERCISE" page={curPageState} />
      </BaseNote>
    </div>
  );
};

export default Exercise;
