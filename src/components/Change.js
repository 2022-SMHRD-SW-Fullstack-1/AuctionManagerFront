import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Link, Navigate, useNavigate } from "react-router-dom";
import MyPage from "./MyPage";
import axios from "../axios";
import "./css/MyPage.css";

const Change = () => {
  //로그인한 아이디의 값을 저장.
  let user = sessionStorage.getItem("mem_Id");

  const Navigate = useNavigate();

  const [cktext, setCktext] = useState("");
  const [changeData, setChangeData] = useState({
    mem_Pw: "",
    mem_Nick: "",
    mem_Addr: "",
  });

  const pwRef = useRef();
  const ckRef = useRef();
  const nickRef = useRef();
  const addrRef = useRef();

  const url = "/pickmeup/change/" + user;

  const onChange = (e) => {
    setCktext(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //만약 같다면
    if (pwRef.current.value == ckRef.current.value) {
      setChangeData({
        mem_Pw: pwRef.current.value,
        mem_Nick: nickRef.current.value,
        mem_Addr: addrRef.current.value,
      });
    } else {
      setCktext("");
      alert("비밀번호가 다릅니다.");
    }
  };

  useEffect(() => {
    axios
      .post(url, changeData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      })
      .then((res) => {
        Navigate("/mypage/" + user);
      });
  }, [changeData]); //화면이 렌더링 될때만([빈칸])쓰는게 아닌 어떠한 값의 변화를 감지한다 useEffect

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table class="mp">
          <tr>
            <th
              colSpan="2"
              width="400px"
              bgColor="whiteSmoke"
              height="50"
              align="center"
            >
              회원정보수정
            </th>
          </tr>
          <tr height="35px" bgColor="whiteSmoke">
            <td align="right">비밀번호:</td>
            <td>
              <input type="password" name="password" ref={pwRef}></input>
            </td>
          </tr>
          <tr height="35px" bgcolor="whitesmoke">
            <td align="right">비밀번호 확인:</td>
            <td>
              <input
                type="password"
                onChange={onChange}
                value={cktext}
                ref={ckRef}
              ></input>
            </td>
          </tr>
          <tr height="35px" bgcolor="whitesmoke">
            <td align="right">닉네임:</td>
            <td>
              <input type="text" name="nick" ref={nickRef}></input>
            </td>
          </tr>
          <tr height="35px" bgcolor="whitesmoke">
            <td align="right">주소:</td>
            <td>
              <input type="text" name="addr" ref={addrRef}></input>
            </td>
          </tr>
        </table>

        <input class="sub" type="submit"></input>
      </form>
    </div>
  );
};

export default Change;
