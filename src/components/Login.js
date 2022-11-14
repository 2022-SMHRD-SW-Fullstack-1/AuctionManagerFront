import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiNaver, SiPandas } from "react-icons/si";
import axios from "axios";
import "./css/Login.css";
import NaverLogin from "./NaverLogin.js";
import { json } from "../../node_modules/react-router-dom/dist/index";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [loinId, setLoinId] = useState("");

  //아이디, 비밀번호 형식이 올바른지 아닌지 확인
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  //버튼 활성화 여부 저장
  const [notAllow, setNotAllow] = useState(true);

  //변동되는 거 지켜보기
  const idRef = useRef();
  const pwRef = useRef();
  const navigate = useNavigate();

  const goToMain = (e) => {
    e.preventDefault();
    login();
  };

  function login() {
    axios
      .post("/login", {
        mem_Id: idRef.current.value,
        mem_Pw: pwRef.current.value,
      })
      .then(function (res) {
        console.log(res); //데이터 값으로 뭐가 넘어오는지 확인, 나중에 지우기
        console.log(res.data); //데이터 값으로 뭐가 넘어오는지 확인, 나중에 지우기
        console.log(res.config); //데이터 값으로 뭐가 넘어오는지 확인, 나중에 지우기
        console.log("아이디 받아오는지", res.config.data); //데이터 값으로 뭐가 넘어오는지 확인, 나중에 지우기
        const js = JSON.parse(res.config.data);

        console.log(js);
        console.log(js.mem_Id);
        console.log("로컬 스토리지", localStorage);
        if (res.data == "success") {
          sessionStorage.setItem("mem_Id", js.mem_Id);
          navigate("/");
        } else {
          alert("로그인 실패");
        }
      })
      .catch(function (error) {
        alert("오류발생");
      });
  }

  //아이디
  const handleId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    // const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const regex = /^[a-zA-z0-9]{5,12}$/;
    if (regex.test(currentId)) {
      // 정규 표현식이랑 일치하면 true로 setEmailValid 값 변경
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };

  //비밀번호
  const handlePw = (e) => {
    const currentPassword = e.target.value;
    setPw(currentPassword);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(currentPassword)) {
      // 정규 표현식이랑 일치하면 true로 setPwValid 값 변경
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  useEffect(() => {
    //emailValid, pwValid의 값이 변경이 될 때마다 실행될 코드
    if (idValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [idValid, pwValid]);

  return (
    <div className="page">
      <div>
        <div className="titleWrap">
          <h2>로그인</h2>
        </div>
        <div className="contentWrap">
          <div style={{ marginTop: "10px" }} className="inputTitle">
            아이디
          </div>
          <div className="inputWrap">
            <input
              type="text"
              className="input"
              placeholder="pickmeup"
              onChange={handleId}
              ref={idRef}
            />
          </div>
          <div className="errorMessageWrap">
            {!idValid && id.length > 0 && (
              <div>올바른 형식의 아이디를 입력해주세요</div>
            )}
          </div>

          <div style={{ marginTop: "26px" }} className="inputTitle">
            비밀번호
          </div>
          <div className="inputWrap">
            <input
              type="password"
              className="input"
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              onChange={handlePw}
              ref={pwRef}
            />
          </div>
          <div className="errorMessageWrap">
            {!pwValid && pw.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>
            )}
          </div>
        </div>
        <div>
          <button disabled={notAllow} className="bottomBtn" onClick={goToMain}>
            로그인
          </button>
        </div>
        <NaverLogin />
      </div>
    </div>
  );
};

export default Login;
