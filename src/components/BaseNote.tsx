import { useNavigate, useParams } from "react-router-dom";
import "./BaseNote.css";
import Island from "./Island";
import { useEffect, useRef } from "react";
import DiaryDiv from "./DiaryDiv";
import { DefaultLines } from "./DefaultLines";
import DiaryDivOther from "./DiaryDivOther";
import { CheckLines } from "./CheckLines";

interface IProps {
  page?: string | undefined;
  site: string;
}

export const BaseNote = (props: IProps) => {
  const param = useParams();
  const nav = useNavigate();
  const ref = useRef(Number(param.page));

  const changeContext = (site: string) => {
    switch (site) {
      case "TODAY":
        if (ref.current === 1) {
          return <DiaryDiv></DiaryDiv>;
        } else {
          return <DiaryDivOther></DiaryDivOther>;
        }
      case "SMOKING":
        return <CheckLines></CheckLines>;

      default:
        return <DefaultLines></DefaultLines>;
    }
  };

  const onClickLeft = () => {
    nav(`/${props.site}/${--ref.current}`);
  };

  const onClickRight = () => {
    nav(`/${props.site}/${++ref.current}`);
  };

  // 랜더링될때마다.
  useEffect(() => {
    const element = document.getElementById("leftBtn");
    if (ref.current === 1) {
      element!.style.display = "none";
    } else {
      element!.style.display = "flex";
    }
  });

  return (
    <div className="baseNote">
      <Island curSite={props.site} />
      <div className="baseNote_arrange">
        <div
          className="baseNote_arrange_btn baseNote_arrange_btn_left"
          onClick={onClickLeft}
          id="leftBtn"
        >
          <div className="btn_box">＜</div>
        </div>
        <div className="note">
          <div className="note_header">
            <span className="note_header_left">{props.site}</span>
            <div className="note_header_right">
              <div>NO. {props.page}</div>
              <div className="note_header_line"></div>
              <div>year month day</div>
            </div>
          </div>
          <div className="note_component">{changeContext(props.site)}</div>
          <div className="note_footer">Gi Ju Jeong</div>
        </div>
        <div
          className="baseNote_arrange_btn baseNote_arrange_btn_right"
          onClick={onClickRight}
        >
          <div className="btn_box">＞</div>
        </div>
      </div>
    </div>
  );
};

export default BaseNote;
