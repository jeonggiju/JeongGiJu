import { useNavigate, useParams } from "react-router-dom";
import BaseNote from "../components/BaseNote";
import { useState } from "react";
import CheckLines from "../components/CheckLines";

export const Smoking = () => {
  const { page } = useParams<{ page: string }>();
  const nav = useNavigate();
  const [curPageState, setCurPageState] = useState<number>(Number(page));

  const onClickLeft = () => {
    const newPage = curPageState - 1;
    setCurPageState(newPage);
    nav(`/SMOKING/${newPage}`);
  };

  const onClickRight = () => {
    const newPage = curPageState + 1;
    setCurPageState(newPage);
    nav(`/SMOKING/${newPage}`);
  };

  return (
    <div>
      <BaseNote
        page={page!}
        site="SMOKING"
        onClickLeft={onClickLeft}
        onClickRight={onClickRight}
      >
        <CheckLines type="SMOKING"></CheckLines>
      </BaseNote>
    </div>
  );
};

export default Smoking;
