import React, { useState, useE } from "react";
import logo from "./img/logo-ct.png";
import { Link, useNavigate } from "react-router-dom";
import "./css/Header.css";
import { FaSearch } from "react-icons/fa";
import Login from "./Login";

const Header = () => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };
  // 검색창 만들기: https://velog.io/@jahommer/React-%EA%B2%80%EC%83%89%EC%B0%BD-%EB%A7%8C%EB%93%A4%EA%B8%B0
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  //검색어와 같은 값들만 걸러내기 위해 filter 함수 사용
  // const filterTitle=product.filter((p)=>{
  //     return p.title.replace(" ","").toLocaleLowerCase().includes(search.toLocaleLowerCase());
  // });

  //돋보기 클릭 했을 때 인풋 창 보이기 -> 나중에 구현

  return (
    <div className="header">
      <img src={logo} className="logo" onClick={goToMain}></img>

      <div className="first-box">
        <div className="seconde-box">
          <div className="searchBox">
            <input
              type="text"
              value={search}
              onChange={onChange}
              className="headerInput"
              placeholder="브랜드명, 옷 종류 등"
            ></input>
          </div>
          <div className="iconBox">
            <FaSearch className="headerIcon"></FaSearch>
          </div>
        </div>
      </div>

      <div className="third-box">
        <Link to="/login">로그인</Link>
        <Link to="/join">회원가입</Link>
      </div>
    </div>
  );
};

export default Header;
