import { useParams } from "react-router-dom";
import "./css/BaseNote.css";
import Island from "./Island";
import { SideButton } from "./SideButton";

interface IProps {
  children: React.ReactNode;
  site: string;
  page: string;
  onClickRight: () => void;
  onClickLeft: () => void;
}

export const BaseNote = ({
  site,
  page,
  children,
  onClickLeft,
  onClickRight,
}: IProps) => {
  const param = useParams();

  return (
    <div className="baseNote">
      <Island curSite={site} />
      <div className="baseNote_arrange">
        {param.page !== "1" && (
          <SideButton side="left" text="<" onClick={onClickLeft} />
        )}
        <div className="note">
          <div className="note_header">
            <span className="note_header_left">{site}</span>
            <div className="note_header_right">
              <div>NO. {page}</div>
              <div className="note_header_line"></div>
              <div>year month day</div>
            </div>
          </div>
          <div className="note_component">{children}</div>
          <div className="note_footer">Gi Ju Jeong</div>
        </div>
        {param.page !== "9" && (
          <SideButton side="right" text=">" onClick={onClickRight} />
        )}
      </div>
    </div>
  );
};

export default BaseNote;
