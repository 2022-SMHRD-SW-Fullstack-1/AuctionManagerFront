import React, { useState, Component, useEffect, useRef } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "./css/MyPage.css";
import axios from "../axios";

const Purchase = () => {
  //로그인한 아이디의 값을 불러옴
  let user = sessionStorage.getItem("mem_Id");
  //선택한 제품의 번호의 값을 불러옴
  let proNum = sessionStorage.getItem("pro_Num");

  // 팝업 스테이트
  const [modal, setModal] = useState(false);
  const Navigate = useNavigate();

  const addrRef = useRef();

  const [addr, setAddr] = useState();
  const [img, setImg] = useState();
  const [info, setInfo] = useState();
  const [price, setPrice] = useState();
  const [seller, setSeller] = useState();
  const [deposit, setDeposit] = useState();

  var payment = price + 3000 - deposit;

  const openmodal = () => {
    setModal(!modal);
    console.log(modal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddr(addrRef.current.value);
    console.log(addrRef.current.value);

    setModal(!modal);
  };

  const payUrl = "/pickmeup/purchase/pay/" + user + "/" + proNum;
  const pay = () => {
    axios
      .get(payUrl, {
        params: {
          money: payment,
        },
        withCredentials: false,
      })
      .then((res) => {
        res.data == "fail" ? alert("픽머니가 부족합니다.") : alert("결제완료");
        sessionStorage.removeItem("pro_Num");
        Navigate("/mypage/" + user);
      });
  };

  function callback(img0, info0, price0, seller0, deposit0) {
    setImg(img0);
    setInfo(info0);
    setPrice(price0);
    setSeller(seller0);
    setDeposit(deposit0);
  }

  useEffect(() => {
    //구매페이지에 표시할 내용들
    //상품번호 버튼으로 받아오기 필요.
    axios.get("/pickmeup/purchase/" + user + "/" + proNum).then((res) => {
      //상품정보용
      console.log("res1", res);
      callback(
        res.data.pro_Photo,
        res.data.pro_Name,
        res.data.wb_Price,
        res.data.mem_Id,
        res.data.auc_Deposit
      );
    });
    axios.get("/pickmeup/purchase/addr/" + user).then((res) => {
      //주소용
      console.log("res2", res);
      setAddr(res.data.mem_Addr);
    });
  }, []);

  const addrUrl = "/pickmeup/purchase/" + user + "/setaddr";
  useEffect(() => {
    axios
      .get(addrUrl, {
        params: {
          addr: addr,
        },
        withCredentials: false,
      })
      .then((res) => {
        Navigate("/purchase/" + user);
      });
  }, [addr]);

  const Modal = () => {
    return (
      <div className="modal1">
        <div className="bg"></div>
        <div className="modalbox1">
          <form onSubmit={handleSubmit}>
            <table class="mp">
              <tr>
                <th
                  colspan="2"
                  width="400px"
                  bgcolor="lightgray"
                  height="25"
                  align="center"
                >
                  배송지수정
                </th>
              </tr>

              <tr height="35px" bgcolor="whitesmoke">
                <td align="right">기존 설정된 주소:</td>
                <td>{addr}</td>
              </tr>

              <colgroup>
                <col width="30%" />
                <col width="70%" />
              </colgroup>
              <tr height="35px" bgcolor="whitesmoke">
                <td align="right">변경할 주소:</td>
                <td>
                  <input type="text" ref={addrRef}></input>
                </td>
              </tr>
            </table>

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
      <div>
        <h3 align="center">주문서</h3>
      </div>
      <table class="tablecss2" align="center">
        <thead>
          <tr>
            <th scope="col" class="text__title">
              <span class="for-a11y">상품 대표 이미지</span>
            </th>
            <th scope="col" class="text__title">
              <span class="for-a11y">주문 상품 정보</span>
            </th>
            <th scope="col" class="text__title">
              수량/상품금액
            </th>
            <th scope="col" class="text__title">
              판매자
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="box__goods ">
            <td rowspan="1" class="list-item list__thumb">
              <a
                href="상품페이지"
                target="_blank"
                class="link__goods link__thumb"
              >
                <img
                  src="https://simage.auction.co.kr/itemimage/2a/56/a5/2a56a56927.jpg"
                  width="75"
                  height="75"
                  class="image__goods"
                ></img>
              </a>
            </td>
            <td class="list-item list__goods">
              <a href="상품페이지" target="_blank" class="link__goods">
                <span class="text__goods-title">{info}</span>
              </a>
            </td>
            <td class="list-item list__price">
              <span class="text__count">
                1개 <span class="text__price">{price}원</span>
              </span>
            </td>
            <td class="list-item list__add-info " rowspan="1">
              <span class="text__seller">{seller}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <br></br>
      <table class="tablecss2" align="center">
        <thead>
          <tr>
            <th>
              <span>배송정보</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>현재 설정된 배송지 : </td>
            <td>{addr}</td>
          </tr>
          <tr>
            <td>
              <button onClick={openmodal}>배송지 변경!</button>
              {modal ? <Modal /> : ""}
            </td>
          </tr>
        </tbody>
      </table>
      <br></br>
      <br></br>
      <table class="tablecss2" align="center">
        <thead>
          <tr>
            <th>
              <span>결제 금액</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>상품 금액 :</td>
            <td>{price}</td>
          </tr>
          <tr>
            <td>+택배비 :</td>
            <td>3000</td>
          </tr>
          <tr>
            <td>-경매참여금 :</td>
            <td>{deposit}</td>
          </tr>
          <hr></hr>
          <tr>
            <td>총 결제금액:</td>
            {payment}
          </tr>
          <tr>
            <td>
              <button onClick={pay}>결제하기</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Purchase;
