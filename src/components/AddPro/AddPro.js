import React, { useEffect, useRef } from "react";
import logo from "../img/logo.png";
import axios from "axios";

import { Params, useParams } from "react-router-dom";
import { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { fireEvent } from "@testing-library/react";

import PhotoUploader from "./PhotoUploader.js";
import PupUpModal from "./PupUp";

const AddPro = () => {
  const [firstImg, setFirstImg] = useState();

  const [imgName, setImgName] = useState([]);
  useEffect(() => {
    console.log("부모컴포넌트에서 이름찍기->", imgName);
    console.log("부모컴포넌트에서 이름찍기1->", imgName[0]);
    setFirstImg(imgName[0]);
    console.log("잘 들어갔니?:", firstImg);
  }, [imgName]);

  // console.log('넘어온 값: ',props)
  // console.log('addpro.js')
  const proNameRef = useRef();
  const proDescRef = useRef();
  const proStatusRef = useRef();
  const proBrandRef = useRef();
  const proCategoryRef = useRef();
  const proMinPriceRef = useRef();
  const proPhotoRef = useRef();
  const proDeadlineRef = useRef();
  const proPhoto = useRef();

  // console.log(proPhoto.current.value)

  // 로그인한 정보
  const user = sessionStorage.getItem("mem_Id");
  console.log("로그인 정보 : ", user);

  // 맨 위로
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const priceChange = (e) => {};

  // 마감기한

  //현재 시간
  const date = new Date();

  //7일 후
  date.setDate(date.getDate() + 7);

  const deadYear = date.getFullYear();
  const deadMonth = date.getMonth() + 1;
  const deadDay = date.getDate();

  const remainTime = `${deadYear}년 ${deadMonth}월 ${deadDay}일`;

  // 상품 상태 팝업
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // 제출 버튼 눌렀을 때 전송
  const navigate = useNavigate();

  const [subCk, setSubCk] = useState([]);

  // const url = 'http://localhost:3000' + pro_Num

  const submitCk = (e) => {
    e.preventDefault();

    // handleProduct => 백앤드 주소

    axios
      .post("/addpro", {
        pro_Num: "",
        mem_Id: user,
        pro_Name: proNameRef.current.value,
        pro_Min_Price: proMinPriceRef.current.value,
        pro_Deadline: proDeadlineRef.current.value,
        pro_Desc: proDescRef.current.value,
        pro_Brand: proBrandRef.current.value,
        pro_Category: proCategoryRef.current.value,
        pro_Status: proStatusRef.current.value,
        pro_Photo: JSON.stringify(imgName),
        auc_Price: proMinPriceRef.current.value,
        auc_Deposit: proMinPriceRef.current.value * 0.1,
      })
      .then((res) => {
        console.log(res.data);
        alert("상품이 등록되었습니다.");
        navigate("/");
      })
      .catch(() => {
        console.log("실패함");
      });
  };

  return (
    <div className="addProTable">
      <h1>상품 등록</h1>

      <form className="addProduct1" onSubmit={submitCk}>
        <table width="1000px" className="addProTable">
          <tr className="proTable">
            <td width="200px">상품명</td>
            <td>
              <input
                type="text"
                className="pro_input"
                ref={proNameRef}
                placeholder="상품명을 입력하세요"
                size="70"
              ></input>
            </td>
          </tr>

          <tr className="proTable1">
            <td width="200px">상품상세정보</td>
            <textarea
              cols="56"
              rows="5"
              name="pro_Desc"
              ref={proDescRef}
            ></textarea>
          </tr>

          <tr className="proTable1">
            <td width="200px">상품 상태 설정</td>
            <td className="proTable">
              <select name="pro_Status" ref={proStatusRef}>
                <option value="S"> S등급 </option>
                <option value="A"> A등급 </option>
                <option value="B"> B등급 </option>
                <option value="C"> C등급 </option>
                <option value="F"> F등급 </option>
              </select>
              <span>
                <React.Fragment>
                  <button onClick={openModal} className="proStatusBtn1">
                    ?
                  </button>

                  <PupUpModal
                    open={modalOpen}
                    close={closeModal}
                    header="상태 기준"
                  >
                    <table align="center" border="solid 1px">
                      <tr>
                        <td>
                          <b>상품 상태</b>
                        </td>
                        <td>
                          <b>선택 기준</b>
                        </td>
                      </tr>

                      <tr>
                        <td>S등급</td>
                        <td>
                          미사용, 미개봉 또는 구입으로부터 시간이 걸리지 않는 한
                          번도 사용하지 않은 상품
                        </td>
                      </tr>
                      <tr>
                        <td>A등급</td>
                        <td>중고이지만 착용 횟수가 적고 훼손이 없음</td>
                      </tr>
                      <tr>
                        <td>B등급</td>
                        <td>자세히 보아야 보이는 수준의 훼손이 있음</td>
                      </tr>
                      <tr>
                        <td>C등급</td>
                        <td>눈에 보이는 수준에 훼손이 있음 </td>
                      </tr>
                      <tr>
                        <td>F등급</td>
                        <td>사용에 지장이 오는 수준의 훼손이 있음</td>
                      </tr>
                    </table>
                  </PupUpModal>
                </React.Fragment>
              </span>
            </td>
          </tr>
          <tr>
            <td width="200px">카테고리</td>
            <td>
              <select name="pro_Category1" ref={proCategoryRef}>
                <option value="아우터">아우터</option>
                <option value="상의">상의</option>
                <option value="하의">하의</option>
                <option value="셋업">셋업</option>
                <option value="악세사리">악세사리</option>
              </select>
            </td>
          </tr>
          <tr>
            <td width="200px">브랜드</td>
            <td>
              <select name="pro_Brand1" ref={proBrandRef}>
                <option value="나이키">나이키</option>
                <option value="아디다스">아디다스</option>
                <option value="뉴발란스">뉴발란스</option>
              </select>
            </td>
          </tr>

          <tr>
            <td width="200px">경매시작가</td>
            <td>
              <input
                id="number1"
                name="pro_Min_Price1"
                ref={proMinPriceRef}
                size="70"
                type="text"
                placeholder="경매시작가를 입력하세요"
                onChange={priceChange}
              ></input>
            </td>
          </tr>

          <tr>
            <td>사진첨부</td>
            <td className="addImg" name="pro_Photo1">
              <PhotoUploader imgName={imgName} setImgName={setImgName} />
            </td>
          </tr>

          <tr>
            <td width="200px">마감기한</td>
            <td name="pro_Deadline1" ref={proDeadlineRef}>
              {remainTime}
            </td>
          </tr>

          <br></br>

          <tr>
            <td></td>
            <input
              type="submit"
              className="submitBtn1"
              onClick={submitCk}
              value="등록"
            ></input>
          </tr>

          <div>
            <br />
            <br />
          </div>
        </table>
      </form>
    </div>
  );
};
export default AddPro;
