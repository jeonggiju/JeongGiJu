import "./button.css";

interface IProps {
  text?: string;
  onClick?: () => void;
}

export const Button = (props: IProps) => {
  return (
    <button className="button" onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;
