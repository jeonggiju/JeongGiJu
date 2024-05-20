import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./css/login.css";
import { getTodayDate } from "../utils/date";

interface IProps {
  setLogin: (isLogin: boolean) => void;
}

export const LoginFalse = (props: IProps) => {
  const onClick = () => {
    props.setLogin(true);
  };

  return (
    <div className="loginFalse">
      <input type="text" placeholder="이메일을 입력하세요." />
      <input type="text" placeholder="비밀번호를 입력하세요." />
      <div className="buttonBox">
        <Button text="회원가입" />
        <Button text="로그인" onClick={onClick} />
      </div>
    </div>
  );
};

export const LoginTrue = (props: IProps) => {
  const nav = useNavigate();

  const onClick = () => {
    props.setLogin(false);
  };

  return (
    <div className="loginTrue">
      <div className="today">{getTodayDate()}</div>
      <hr />
      <div className="buttonBox">
        <Button text="로그아웃" onClick={onClick} />
        <Button
          text="들어가기"
          onClick={() => {
            nav("/TODAY/1");
          }}
        />
      </div>
    </div>
  );
};
