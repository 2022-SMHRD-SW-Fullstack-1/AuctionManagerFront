import React, { useEffect, useRef, useState } from "react";
import { SiNaver, SiProcessingfoundation } from "react-icons/si";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./css/Login.css";

const NaverLogin = () => {
  const { naver } = window;

  // useRef 를 선언 해준다.
  const naverRef = useRef();
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);

  const [member, setMember] = useState([
    {
      mem_Id: "",
      mem_Name: "",
    },
  ]);

  const NAVER_CLIENT_ID = "heUOX9WI8K_Afdb2sUT8"; // 발급 받은 Client ID 입력
  const NAVER_CALLBACK_URL = "http://localhost:3000/login"; // 작성했던 Callback URL 입력

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      // 팝업창으로 로그인을 진행할 것인지?
      //true: 팝업창 띄우기 false: 리다이렉트 형태
      isPopup: false,
      // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
      loginButton: { color: "white", type: 3, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();
    naverLogin.logout(); //로그인하고 나서 로그아웃 처리를 해줘야 다음에 로그인 하려고 할 때 세션스토리지에 저장이 되어 있지 않음

    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        console.log("가져오는 정보: ", naverLogin.user);

        const memId = naverLogin.user.getId();
        const memName = naverLogin.user.getName();

        sessionStorage.setItem("mem_Id", memId);
        sessionStorage.setItem("mem_Name", memName);

        setMember([
          {
            mem_Id: memId,
            mem_Name: memName,
          },
        ]);
        setAuth(true);
        navigate("/");
      }
    });
  };

  // 네이버 소셜 로그인 (네아로) 는 URL 에 엑세스 토큰이 붙어서 전달
  // 아래와 같이 토큰을 추출 할 수 있음

  const location = useLocation();

  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };

  const getToken = () => {
    // const token = window.location.href.split('=')[1].split('&')[0];
    const token = location.hash.split("=")[1].split("&")[0];
    console.log("토큰 값", token);

    sessionStorage.setItem("access_token", token);
    // setGetToken(token)
  };

  // 화면 첫 렌더링이후 바로 실행
  useEffect(() => {
    initializeNaverLogin();
    userAccessToken();

    console.log("로그인 한 회원정보: ", member);
  }, []);

  return (
    <div className="loginBox">
      <div className="loginAPI">
        <span id="naverIdLogin">
          <SiNaver />
          네이버로 로그인
        </span>
      </div>
    </div>
  );
};

export default NaverLogin;
