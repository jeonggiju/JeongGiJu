import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Button from "./Button";
import "./css/login.css";
import { getTodayDate } from "../utils/date";
import { useRef, useState } from "react";
import { CREATE_USER_MUTATION, LOGIN_MUTATION } from "../graphql/mutations";
import { ICheckList } from "../provider/DaysProvider";
import { GET_CHECKLISTS_BY_USER } from "../graphql/queries";
import { useDaysDispatchContext } from "../hook/useDaysDispatchContext";
interface IProps {
  setLogin: (isLogin: boolean) => void;
}

export const LoginFalse = (props: IProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailElementRef = useRef<HTMLInputElement>(null);
  const pwdElementRef = useRef<HTMLInputElement>(null);

  const { onInit } = useDaysDispatchContext();
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const { data } = useQuery(GET_CHECKLISTS_BY_USER, {
    variables: { userId: "6e8198e9-65c8-49c8-9a0a-d17f4e1b5173" },
  });

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const onClickJoin = async () => {
    if (email === "" || password === "") {
      alert("이메일과 비밀번호를 확인해주세요.");
    }

    try {
      const response = await createUser({
        variables: {
          createUserInput: {
            email,
            password,
          },
        },
      });
      if (response) {
        alert("가입이 완료되었습니다.");
      }
    } catch (e) {
      alert("이미 존재하는 이메일이에요.");
    }
  };

  const onClickLogin = async () => {
    try {
      const response = await login({
        variables: { email, password },

        context: {
          fetchOptions: {
            credentials: "include", // 쿠키를 포함하여 요청
          },
        },
      });
      if (response.data && response.data.login) {
        // 로컬 스토리지에 저장
        window.localStorage.setItem("accessToken", response.data.login);
        props.setLogin(true);

        if (data && data.findAllCheckList) {
          const formattedData = data.findAllCheckList
            .map((item: ICheckList) => ({
              ...item,
              createdAt: new Date(item.createdAt),
              studyTime: new Date(item.studyTime),
              wakeTime: new Date(item.wakeTime),
              sleepTime: new Date(item.sleepTime),
              user: {
                id: item.user.id,
              },
            }))
            .sort(
              (a: ICheckList, b: ICheckList) =>
                a.createdAt.getTime() - b.createdAt.getTime()
            );

          onInit(formattedData);
        }
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
        <Button text="회원가입" onClick={onClickJoin} />
        <Button text="로그인" onClick={onClickLogin} />
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
    document.cookie = "MM=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.localStorage.clear();
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
