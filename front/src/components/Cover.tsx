import { useState } from "react";
import "./css/cover.css";
import { LoginFalse, LoginTrue } from "./Login";

export const Cover = () => {
  const [isLogin, setLogin] = useState<boolean>(false);

  const LoginRendering = (isLogin: boolean) => {
    if (isLogin) {
      return <LoginTrue setLogin={setLogin} />;
    } else {
      return <LoginFalse setLogin={setLogin} />;
    }
  };

  return (
    <div className="cover">
      <div className="text">
        <div className="upText">Ubiquitous You</div>
        <div className="middleText">
          Ivory color sheets are easy on the eyes Quality never goes out of
          design.
        </div>
        <div className="downText">Designed by © bestmate</div>
      </div>

      <div className="login_div">
        <div className="name">정기주</div>
        {LoginRendering(isLogin)}
      </div>
    </div>
  );
};

export default Cover;
