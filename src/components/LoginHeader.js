import React, { useEffect, useState } from "react";
import logo from "./img/logo-ct.png";
import { Link, useNavigate } from "react-router-dom";
import "./css/LoginHeader.css";
import { FaSearch } from "react-icons/fa";
import moment from "moment";
import axios from "../axios";

const LoginHeader = () => {
  //로그인한 아이디의 값을 저장.
  let user = sessionStorage.getItem("mem_Id");
  let url = "/mypage/" + user;

  //로그인한 아이디를 마이페이지 클릭시 본인 리뷰 출력용 세션으로 세팅.
  const setSession = () => {
    sessionStorage.setItem("Review_Id", user);
  };

  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const logout = () => {
    // localStorage.clear('mem_Id');
    sessionStorage.clear("mem_Id");
  };

  //시간 관련 코드
  let timer;
  const [time, setTime] = useState(moment());
  const [timeList, setTimeList] = useState([{}]);
  const [bidTime, setBidTime] = useState();

  const listUrl = "/pickmeup/auctionList";
  const bidUrl = "/pickmeup/setbid";

  useEffect(() => {
    //시간을 현재시간으로 10초주기 설정
    axios.get(listUrl).then((res) => {
      setTimeList(res);
    });

    timer = setInterval(() => {
      //timer 라는 변수에 인터벌 종료를 위해 저장
      setTime(moment()); // 현재 시간 세팅
    }, 10000); //1000ms = 1s 간 반복 / 10초마다 settime
    return () => {
      clearInterval(timer); // 함수 언마운트시 clearInterval
    };
  }, []);

  useEffect(() => {
    console.log("d", timeList.data);
    if (!timeList.data) {
    } else {
      setBidTime(
        timeList.data.map(function (num) {
          //return 값을 새로운 배열에 생성하여 저장, 리턴하자마자 set이 아님
          if (num < time) {
            return num;
          }
        })
      );
    }
  }, [time]);

  useEffect(() => {
    console.log("bid Time : ", bidTime);
    axios
      .post(bidUrl, bidTime, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      })
      .then((res) => {
        console.log(res);
      });
  }, [bidTime]);

  return (
    <div className="LoginHeader">
      <img src={logo} className="logo" onClick={goToMain}></img>

      <div className="LoginFirst-box">
        <div className="LoginSeconde-box">
          <div className="searchBox">
            <input
              type="text"
              value={search}
              onChange={onChange}
              className="LoginHeaderInput"
              placeholder="브랜드명, 옷 종류 등"
            ></input>
          </div>
          <div className="iconBox">
            <FaSearch className="LoginHeaderIcon"></FaSearch>
          </div>
        </div>
      </div>

      <div>{time.format("HH : mm")}</div>
      <div className="LoginThird-box">
        <Link to="/addpro">상품등록</Link>
        <Link to={url} onClick={setSession}>
          마이페이지
        </Link>
        <Link to="/logout" onClick={logout}>
          로그아웃
        </Link>
      </div>
    </div>
  );
};

export default LoginHeader;
