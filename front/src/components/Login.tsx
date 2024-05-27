import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Button from "./Button";
import "./css/login.css";
import { getTodayDate } from "../utils/date";
import { useRef, useState } from "react";
import { useSetAuthTokenContext } from "../hook/useSetAuthTokenContext";
import { LOGIN_MUTATION } from "../graphql/mutations";

interface IProps {
  setLogin: (isLogin: boolean) => void;
}

export const LoginFalse = (props: IProps) => {
  const { setAuthToken } = useSetAuthTokenContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailElementRef = useRef<HTMLInputElement>(null);
  const pwdElementRef = useRef<HTMLInputElement>(null);

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const onClick = async () => {
    try {
      const response = await login({ variables: { email, password } });
      if (response.data && response.data.login) {
        setAuthToken(response.data.login);
        props.setLogin(true);
      } else {
        alert("로그인 실패");
      }
    } catch (e) {
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="loginFalse">
      <input
        type="text"
        placeholder="이메일을 입력하세요."
        ref={emailElementRef}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호를 입력하세요."
        ref={pwdElementRef}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="buttonBox">
        <Button text="회원가입" />
        <Button text="로그인" onClick={onClick} />
      </div>
      {loading && <p>로그인 중...</p>}
      {error && <p>{error.message}</p>}
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
