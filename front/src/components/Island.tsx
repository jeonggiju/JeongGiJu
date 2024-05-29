import { useState } from "react";
import "./css/Island.css";
import { useNavigate } from "react-router-dom";

interface IProp {
  curSite: string;
}

export const Island = (props: IProp) => {
  const nav = useNavigate();

  const sites = [
    { site: "TODAY", path: "/TODAY/1" },
    { site: "SMOKING", path: "/SMOKING/1" },
    { site: "EXERCISE", path: "/EXERCISE/1" },
    { site: "DIARYCHECK", path: "/DIARYCHECK/1" },
    { site: "SLEEP", path: "/SLEEP/1" },
    { site: "STUDY", path: "/STUDY/1" },
    { site: "LOGIN", path: "/" },
  ];

  const initialIndex =
    props.curSite === "DIARY"
      ? sites.findIndex((item) => item.site === "DIARYCHECK")
      : sites.findIndex((item) => item.site === props.curSite);

  const [curIdx, setCurIdx] = useState(initialIndex);

  const onClickIslandLeft = () => {
    setCurIdx((prevIdx) => (prevIdx - 1 + sites.length) % sites.length);
  };

  const onClickIslandRight = () => {
    setCurIdx((prevIdx) => (prevIdx + 1) % sites.length);
  };

  const onClickText = () => {
    nav(`${sites[curIdx].path}`);
  };

  return (
    <div className="island">
      <div className={`island_left`} onClick={onClickIslandLeft}></div>
      <span
        className={`text text_${sites[curIdx].site}`}
        onDoubleClick={onClickText}
      >
        {sites[curIdx].site === "DIARYCHECK" ? "DIARY" : sites[curIdx].site}
      </span>
      <div className="island_right" onClick={onClickIslandRight}></div>
    </div>
  );
};

export default Island;
