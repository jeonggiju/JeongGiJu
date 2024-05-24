import "./css/SideButton.css";

interface ISideButton {
  side: string;
  text: string;
  onClick: () => void;
}

export const SideButton = ({ side, text, onClick }: ISideButton) => {
  return (
    <div
      className={`baseNote_arrange_btn baseNote_arrange_btn_${side}`}
      onClick={onClick}
    >
      <div className="btn_box">{text}</div>
    </div>
  );
};
