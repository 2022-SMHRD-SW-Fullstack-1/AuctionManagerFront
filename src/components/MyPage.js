import "./css/MyPage.css";
import Header from "./Header";
import change from "./Change";
import { Router, Route, Link, Routes, useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import React, { component, useEffect, useState } from "react";
import Purchase from "./Purchase";
import axios from "../axios";
import { useRef } from "react";
import Review from "./Review";

function MyPage() {
  //로그인한 아이디의 값을 저장.
  let user = sessionStorage.getItem("mem_Id");

  //회원의 보유 픽머니, 닉네임 표시.
  const [money, setMoney] = useState();
  const [nick, setNick] = useState("");

  //참여중 상품 map함수를 위한 객체생성
  const [biding, setBiding] = useState([{}]);
  //참여중인 상품 체크여부
  const [bidingCk, setBidingCk] = useState(false);

  //판매중 상품 map함수를 위한 객체생성
  const [sell, setSell] = useState([{}]);
  //판매중인 상품 체크여부
  const [sellCk, setSellCk] = useState(false);

  //낙찰된 상품 map함수를 위한 객체생성
  const [bid, setBid] = useState([{}]);
  //낙찰된 상품 체크여부
  const [bidCk, setBidCk] = useState(false);

  //리뷰 리스트 map함수를 위한 객체생성
  const [myReview, setMyReview] = useState([{}]);

  //리뷰 리스트 받아오는 여부
  const [myReviewCk, setMyReviewCk] = useState(false);

  //리뷰 스위치(나 or 다른사람)
  const [otherCk, setOtherCk] = useState(true);
  const myCkSwitch = () => {
    setOtherCk(false);
  };
  const otherCkSwitch = () => {
    setOtherCk(true);
  };

  //모달 체크(리뷰작성)
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [reviewData, setReviewData] = useState({});

  const textRef = useRef();

  const openModal = (e) => {
    //리뷰 작성 클릭시 발생하는 이벤트
    console.log("data", reviewData);

    const js = JSON.parse(e.target.value);
    sessionStorage.setItem("pro_Num", js);

    setModalTitle(
      e.target.parentNode.previousSibling.previousSibling.previousSibling
        .innerText
    );
    setModal(!modal);
  };

  const handleSubmit = (e) => {
    //모달 제출 동작.
    e.preventDefault();
    var checkedScore = document.querySelector("input[name='score']:checked");
    console.log(checkedScore.value, checkedScore.value.type);

    setReviewData({
      rv_Content: textRef.current.value,
      rv_Rating: Number(checkedScore.value),
      pro_Num: sessionStorage.getItem("pro_Num"),
    });

    setModal(!modal);
  };

  // const handleRadio = (e) => {
  //   this.setState({
  //     selectValue: e.target.value
  //   });
  // }

  //페이지 이동 및 콜백함수

  const Navigate = useNavigate();
  const gotochange = () => {
    //useNavigate : 페이지 이동을 도와주는 React hooks
    console.log("rv", myReview);
    Navigate("/change/" + user);
  };

  const gotoPurchase = (e) => {
    console.log("target", e.target.value);
    const js = JSON.parse(e.target.value);
    sessionStorage.setItem("pro_Num", js);

    //useNavigate : 페이지 이동을 도와주는 React hooks
    Navigate("/purchase/" + user);
  };

  const payCkUrl = "/pickmeup/payCk";
  const payCheck = (e) => {
    axios
      .get(payCkUrl, {
        params: {
          num: e.target.value,
        },
        withCredentials: false,
      })
      .then((res) => {
        //새로고침 하는 윈도우 함수.
        window.location.replace("/mypage/" + user);
      });
  };

  const CalculateUrl = "/pickmeup/calculate/" + user;
  const Calculate = (e) => {
    axios
      .get(CalculateUrl, {
        params: {
          num: e.target.value,
        },
        withCredentials: false,
      })
      .then((res) => {
        //새로고침 하는 윈도우 함수.
        window.location.replace("/mypage/" + user);
      });
  };

  function callback(num, str) {
    setMoney(num);
    setNick(str);
  }

  //useEffect 부분

  const moneyUrl = "/pickmeup/charge/" + user;
  const charge = () => {
    setMoney(money + 100000);
    console.log(money);
  };
  useEffect(() => {
    axios
      .get(moneyUrl, {
        params: {
          money: money,
        },

        withCredentials: false,
      })
      .then((res) => {
        Navigate("/mypage/" + user);
      });
  }, [money]);

  const reviewUrl = "/pickmeup/review/" + user;
  useEffect(() => {
    axios
      .post(reviewUrl, JSON.stringify(reviewData), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      })
      .then((res) => {
        console.log(res.data);
        Navigate("/mypage/" + user);
      });
  }, [reviewData]);

  const infoUrl = "/pickmeup/mypage/" + user;
  const bidingUrl = "/pickmeup/mypage/biding/" + user;
  const sellUrl = "/pickmeup/mypage/sell/" + user;
  const bidUrl = "/pickmeup/mypage/bid/" + user;
  const myReviewUrl = "/pickmeup/myReview/" + user;

  useEffect(() => {
    sessionStorage.removeItem("pro_Num");

    axios.get(infoUrl).then((res) => {
      //닉네임,픽머니 받아온다.
      console.log("info", res);
      callback(res.data.mem_Pickmoney, res.data.mem_Nick);
    });

    axios.get(bidingUrl).then((res) => {
      //참여중 입찰 리스트 받아온다.
      console.log("bidingList", res);
      setBiding(res.data);
      if (res.data.length >= 1) {
        setBidingCk(true);
      }
    });

    axios.get(sellUrl).then((res) => {
      //판매리스트 받아온다.
      console.log("sellList", res);
      setSell(res.data);
      if (res.data.length >= 1) {
        setSellCk(!sellCk);
      }
    });

    axios.get(bidUrl).then((res) => {
      //낙찰리스트 받아온다
      setBid(res.data);
      console.log("bid", res);
      if (res.data.length >= 1) {
        setBidCk(!bidCk);
      }
    });

    axios.get(myReviewUrl).then((res) => {
      //내가쓴 리뷰 받아온다.
      console.log("my", res);
      setMyReview(res.data);
      if (res.data.length >= 1) {
        setMyReviewCk(!myReviewCk);
      }
    });
  }, []);

  //컴포넌트

  const BidingComplete = ({ obj }) => {
    const GoToDetail = () => {
      Navigate("/detail?pro_num=" + obj.pro_Num);
    };
    return (
      <tr>
        <td>{obj.pro_Num}</td>
        <td onClick={GoToDetail}>{obj.pro_Name}</td>
        <td>{obj.auc_Price}</td>
        <td>{obj.my_auc_Price}</td>
        <td>{obj.pro_Deadline}</td>
        <td>{obj.mem_Id}</td>
      </tr>
    );
  };

  const SellComplete = ({ obj }) => {
    return (
      <tr>
        <td>
          {obj.pro_Name}/{obj.pro_Num}
        </td>
        <td>{obj.pro_Participants}</td>
        <td>{obj.auc_Price}</td>
        <td>{obj.pro_Deadline}</td>
        <td>
          {obj.pay_Check == null
            ? "경매중"
            : obj.pay_Check == "n"
            ? "결제대기"
            : "결제완료"}
          /{obj.wb_Delivery_Addr}
        </td>
        {obj.delivery_Check == "n" || obj.delivery_Check == null ? (
          <td>정산대기</td>
        ) : (
          <td>
            <button value={obj.pro_Num} onClick={Calculate}>
              정산받기
            </button>
          </td>
        )}
      </tr>
    );
  };

  const BidComplete = ({ obj }) => {
    return (
      <tr>
        <td>
          {obj.pro_Deadline}/{obj.pro_Num}
        </td>
        <td>{obj.pro_Name}</td>
        <td>{obj.wb_Price}</td>
        <td>{obj.pay_Deadline}</td>
        {obj.delivery_Check == "n" ? (
          obj.pay_Check == "n" ? (
            <td>
              <button value={obj.pro_Num} onClick={gotoPurchase}>
                구매
              </button>
            </td>
          ) : (
            <td>
              <button value={obj.pro_Num} onClick={payCheck}>
                구매확정
              </button>
            </td>
          )
        ) : (
          <td>
            <button value={obj.pro_Num} onClick={openModal}>
              리뷰작성
            </button>
            {modal ? <Modal /> : ""}
          </td>
        )}
      </tr>
    );
  };

  const MyReviewComplete = ({ obj }) => {
    return (
      <tr>
        <td>{obj.rv_Rating}</td>
        <td>{obj.pro_Name}</td>
        <td>{obj.rv_Content}</td>
        <td>{obj.mem_Id}</td>
      </tr>
    );
  };

  const Modal = () => {
    //리뷰작성 modal

    return (
      <div className="modal1">
        <div className="bg"></div>
        <div className="modalbox1">
          <form onSubmit={handleSubmit}>
            <table class="mp">
              <tr>
                <th
                  colSpan="2"
                  width="400px"
                  bgColor="lightgray"
                  height="25"
                  align="center"
                >
                  {modalTitle}
                </th>
              </tr>
              <tr>
                <td>
                  <textarea cols="56" rows="5" ref={textRef}></textarea>
                </td>
              </tr>

              <tr>
                <td colSpan="2">
                  <span>
                    {" "}
                    1점{" "}
                    <input
                      id="valueRadio"
                      type="radio"
                      name="score"
                      value="1"
                    />
                  </span>
                  <span>
                    {" "}
                    2점{" "}
                    <input
                      id="valueRadio"
                      type="radio"
                      name="score"
                      value="2"
                    />
                  </span>
                  <span>
                    {" "}
                    3점{" "}
                    <input
                      id="valueRadio"
                      type="radio"
                      name="score"
                      value="3"
                    />
                  </span>
                  <span>
                    {" "}
                    4점{" "}
                    <input
                      id="valueRadio"
                      type="radio"
                      name="score"
                      value="4"
                    />
                  </span>
                  <span>
                    {" "}
                    5점{" "}
                    <input
                      id="valueRadio"
                      type="radio"
                      name="score"
                      value="5"
                    />{" "}
                  </span>
                </td>
              </tr>
            </table>

            <ul>
              <li>한번 작성하시면 수정하실수 없습니다!</li>
            </ul>
            <div align="center">
              <input class="sub" type="submit"></input>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div id="mypagebox">
        <div id="mypageleft">
          <br></br>
          <div id="printid">
            <div id="font1">
              <span>{nick}</span>
              <br></br>
              <span>님 환영합니다.</span>
            </div>
            <button onClick={gotochange} id="changeBtn">
              회원정보수정
            </button>
          </div>
          <br></br>
          <div id="printmoney">
            <span id="font1">보유 픽머니</span>
            <br></br>
            <span id="font1">{money}원</span>
            <br></br>
            <button onClick={charge} id="moneyBtn">
              충전
            </button>
            <button id="moneyBtn">출금</button>
          </div>
        </div>

        <div id="mypageright">
          <br></br>
          <h5 id="node13">● 참여중인 경매</h5>
          <table id="mp">
            <thead>
              <tr align="center" id="font1">
                <th>상품번호</th>
                <th>경매상품명</th>
                <th>나의입찰가</th>
                <th>현재입찰가</th>
                <th>경매마감일</th>
                <th>판매자</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bidingCk ? (
                biding.map((obj, idx) => (
                  <BidingComplete key={obj.pro_Num} obj={obj} />
                ))
              ) : (
                <td align="center" colspan="8">
                  <br></br>
                  <span id="font1">조회된 리스트가 없습니다.</span>
                  <br></br>
                  <br></br>
                </td>
              )}
            </tbody>
          </table>

          <br></br>

          <h5 id="node13">● 판매중인 경매</h5>
          <table id="mp">
            <thead>
              <tr align="center" id="tablecss2">
                <th>경매상품명/번호</th>
                <th>입찰 참여자수</th>
                <th>현재입찰가</th>
                <th>경매마감일</th>
                <th>결제여부/구매자주소</th>
                <th>정산받기</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sellCk ? (
                sell.map((obj, idx) => (
                  <SellComplete key={obj.pro_Num} obj={obj} />
                ))
              ) : (
                <tr>
                  <td align="center" colspan="8">
                    <br></br>
                    <span id="font1">조회된 리스트가 없습니다.</span>
                    <br></br>
                    <br></br>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <br></br>

          <h5 id="node13">● 낙찰받은 경매</h5>
          <div id="description"></div>
          <table id="mp">
            <thead>
              <tr align="center" id="font1">
                <th>낙찰일자/상품번호</th>
                <th>경매상품명</th>
                <th>낙찰가(결제금액)</th>
                <th>결제기한</th>
                <th>구매</th>
              </tr>
            </thead>
            <tbody>
              {bidCk ? (
                bid.map((obj, idx) => (
                  <BidComplete key={obj.pro_Num} obj={obj} />
                ))
              ) : (
                <tr>
                  <td align="center" colspan="8">
                    <br></br>
                    <span id="font1">조회된 리스트가 없습니다.</span>
                    <br></br>
                    <br></br>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <br></br>

          <h5 id="node13">● 리뷰관리</h5>
          <div id="reviewBtn">
            <button class={otherCk ? "btnck" : "btn"} onClick={otherCkSwitch}>
              나에 관한 리뷰
            </button>
            <button class={otherCk ? "btn" : "btnck"} onClick={myCkSwitch}>
              내가 쓴 리뷰
            </button>
          </div>
          {otherCk ? (
            <Review />
          ) : (
            <table id="mp">
              <thead>
                <tr align="center" id="font1">
                  <th>점수</th>
                  <th>상품명</th>
                  <th>내용</th>
                  <th>작성자</th>
                </tr>
              </thead>
              <tbody>
                {myReviewCk ? (
                  myReview.map((obj, idx) => (
                    <MyReviewComplete key={obj.rv_Content} obj={obj} />
                  ))
                ) : (
                  <tr>
                    <td align="center" colspan="8">
                      <br></br>
                      <span id="font1">조회된 리스트가 없습니다.</span>
                      <br></br>
                      <br></br>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
