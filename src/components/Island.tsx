import { useState } from "react";
import "./Island.css";
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
    { site: "DIARY", path: "/DIARY/1" },
    { site: "STUDY", path: "/STUDY/1" },
    { site: "LOGIN", path: "/" },
  ];
  const [curIdx, setCurIdx] = useState(
    sites.findIndex((item) => item.site === props.curSite)
  );

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
      <div className="island_left" onClick={onClickIslandLeft}></div>
      <span className="text" onDoubleClick={onClickText}>
        {sites[curIdx].site}
      </span>
      <div className="island_right" onClick={onClickIslandRight}></div>
    </div>
  );
};

export default Island;
