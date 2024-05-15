import { useNavigate, useParams } from "react-router-dom";
import "./BaseNote.css";
import Island from "./Island";
import { useRef } from "react";
import DiaryDiv from "./DiaryDiv";

interface IProps {
  page?: string | undefined;
  site: string;
}

export const BaseNote = (props: IProps) => {
  const param = useParams();
  const nav = useNavigate();
  const ref = useRef(Number(param.page));

  const onClickLeft = () => {
    nav(-1);
  };

  const onClickRight = () => {
    nav(`/${props.site}/${ref.current++}`);
  };

  return (
    <div className="baseNote">
      <Island curSite={props.site} />
      <div className="baseNote_arrange">
        <div className="baseNote_arrange_btn" onClick={onClickLeft}></div>
        <div className="note">
          <div className="note_header">
            <span className="note_header_left">{props.site}</span>
            <div className="note_header_right">
              <div>NO. {props.page}</div>
              <div className="note_header_line"></div>
              <div>year month day</div>
            </div>
          </div>

          <div className="note_lines">
            <div className="note_lines_bold note_lines_bold_up"></div>
            <div className="note_lines_bold"></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className="note_lines_bold"></div>
            <div className="note_lines_cross"></div>
          </div>

          <div className="note_component">
            <DiaryDiv></DiaryDiv>
          </div>
          <div className="note_footer">Gi Ju Jeong</div>
        </div>
        <div className="baseNote_arrange_btn" onClick={onClickRight}></div>
      </div>
    </div>
  );
};

export default BaseNote;
