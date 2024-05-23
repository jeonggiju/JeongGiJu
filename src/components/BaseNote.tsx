import "./css/BaseNote.css";
import Island from "./Island";
import { SideButton } from "./SideButton";

interface IProps {
  children: React.ReactNode;
  site: string;
  page: string;
  today?: string; // today에서
  nextButtonState?: boolean; //diary에서
  onClickRight: () => void;
  onClickLeft: () => void;
}

export const BaseNote = ({
  site,
  page,
  children,
  today,
  nextButtonState = true,
  onClickLeft,
  onClickRight,
}: IProps) => {
  return (
    <div className="baseNote">
      <Island curSite={site} />
      <div className="baseNote_arrange">
        {(page !== "1" || site === "DIARY") && (
          <SideButton side="left" text="<" onClick={onClickLeft} />
        )}
        <div className="note">
          <div className="note_header">
            <span className="note_header_left">
              {site === "DIARYCHECK" ? "DIARY" : site}
            </span>
            <div className="note_header_right">
              <div>NO. {page}</div>
              <div className="note_header_line"></div>
              {today ? <div>{today}</div> : <div>year month day</div>}
            </div>
          </div>
          <div>{children}</div>
          <div className="note_footer">Gi Ju Jeong</div>
        </div>
        {!(site === "TODAY" && page === "9") && nextButtonState && (
          <SideButton side="right" text=">" onClick={onClickRight} />
        )}
      </div>
    </div>
  );
};

export default BaseNote;
