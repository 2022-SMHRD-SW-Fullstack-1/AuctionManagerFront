import "./App.css";
import { Component, useState, useEffect } from "react";
import {
  Router,
  Route,
  Link,
  Routes,
  Switch,
  Navigate,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import LoginHeader from "./components/LoginHeader";
import Join from "./components/Join";
import Login from "./components/Login";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Detail from "./components/Detail";
import SelectItem from "./components/SelectItem";

import MyPage from "./components/MyPage";
import AddPro from "./components/AddPro/AddPro";
import TopButton from "./components/AddPro/TopButton";

import Change from "./components/Change";
import Purchase from "./components/Purchase";
import Mypage from "./components/MyPage";
import Review from "./components/Review";

import "./App.css";
import "../src/components/css/Addpro.css";
import "../src/components/css/PhotoBox.css";
import "../src/components/css/MoveTopBtn.css";

function App() {
  const navigate = useNavigate();

  //백이랑 연결됐나 안 됐나 확인 코드 - 나중에 지우면 됨
  const [hello, setHello] = useState("");
  useEffect(() => {
    axios
      .get("/hello")
      .then((response) => setHello(response.data))
      .catch((error) => console.log(error));
  }, []);

  //세션스토리지에 저장된 유저정보 가져오기
  // let user = localStorage.getItem('mem_Id');
  let user = sessionStorage.getItem("mem_Id");

  let url1 = "/mypage/" + user;
  let url2 = "/purchase/" + user;
  let url3 = "/change/" + user;
  let url4 = "/review";

  //유저정보가 없으면 일반 헤더 있으면 로그인 해더
  const loginUser = () => {
    if (user == null) {
      // return false;
      return <Header />;
    } else {
      // return true;
      return <LoginHeader />;
    }
  };

  //로그인 로그아웃 시 해더 바로바로 바뀔 수 있도록!
  useEffect(() => {
    loginUser();
    // navigate('/')
  }, [user]);

  return (
    <div className="App">
      {loginUser()}

      {/* <div>백엔드에서 가져온 데이터입니다 : {hello}</div> */}

      <TopButton />
      <Routes>
        <Route path="/" element={<Body />}></Route>
        <Route path="/logout" element={<Body />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registerProduct" element={<AddPro />}></Route>
        <Route path="/detail" element={<Detail />}></Route>
        <Route path="/selectItem" element={<SelectItem />}></Route>
        <Route path="/addpro" element={<AddPro />}></Route>
        <Route path={url1} element={<MyPage />}></Route>
        <Route path={url2} element={<Purchase />}></Route>
        <Route path={url3} element={<Change />}></Route>
        <Route path={url4} element={<Review />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
