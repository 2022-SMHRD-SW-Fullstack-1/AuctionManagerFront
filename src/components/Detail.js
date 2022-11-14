import "./css/Detail.css";
import CommentTest from "./proquestion/CommentTest";
import React, { useEffect, useRef, useState } from "react";
import { Router, Route, Routes, useLocation } from "react-router-dom";
import PupUpModal from "./PupUpModal";
import PopUpModal from "./PopUpModal";
import GalleryList from "./gallery/GalleryItem";
import GalleryView from "./gallery/GalleryView";
import axios from "axios";
import data from "./gallery/image";
import { useNavigate } from "react-router-dom";
import Gallery from "./gallery/Gallery";
import ProEx from "./ProEx";
import MapComment from "./proquestion/MapComment";

const Detail = () => {
  // 페이지 이동시 스크롤 맨 위로 이동
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  let user = sessionStorage.getItem("mem_Id");
  const [crrPri, setCurrPri] = useState();
  const [aucPrice, setAucPrice] = useState();
  const Navigate = useNavigate();
  const proNameRef = useRef();
  const sellerRef = useRef();
  const timeReMainingRef = useRef();
  const minPay = useRef();
  const nowMoney = useRef();
  const bidPayRef = useRef();
  const totalAmount = useRef();
  const [imgName, setImgName] = useState();
  const onClick = (e) => {
    e.preventDefault();
    aucStart();
  };
  const [bidAddr, setBidAddr] = useState();
  const [datas, setDatas] = useState(data); //사진 데이터
  const [currItem, setCurrItem] = useState(datas[0]); //선택한 사진 상태설정

  var str = decodeURI(window.location.search);
  // console.log(str);
  const params = new URLSearchParams(str);
  const proDetail = { pro_Num: params.get("pro_num") };
  // console.log("너야?2", proDetail);

  //상품 상세 설명
  const [viewDetail, setViewDetail] = useState([
    {
      pro_Num: 0,
      pro_Name: "",
      pro_Brand: "",
      pro_Category: "",
      pro_Min_Price: "",
      pro_Deadline: "",
      pro_Desc: "",
      pro_Status: "",
      pro_Photo: "",
      auc_Price: 0,
      auc_Deposit: 0,
    },
  ]);

  //상품 댓글
  const [commView, setCommView] = useState([
    {
      qna_Content: "",
      qna_Date: "",
      mem_Id: "",
    },
  ]);

  // let commList=commView.map((item)=>(
  //   <MapComment key={item.qna_Seq} item={item}/>
  // ))
  //판매자 아이디를 누르면 페이지 이동
  const btnSellMyPage = () => {
    Navigate(`myPage/${proDetail.mem_Id}`);
  };

  function aucStart() {
    axios
      .post("/detail/auc", {
        auc_price: bidPayRef.current.value,
        mem_Id: user,
        pro_Num: proDetail,
      })
      .then(function (res) {
        // console.log(res);
      })
      .catch(function (error) {
        console.log(error);
        alert("오류발생");
      });
  }

  useEffect(() => {
    axios
      .post("/detail", proDetail)
      .then((res) => {
        // console.log("넘어오는 값", res);
        // console.log("상품 들어있는 목록?", res.data);
        // console.log("상품 들어있는 현재 입찰가", res.data.auc_Price);
        // console.log("상품 QnA", res.data.commentView);
        setViewDetail(res.data);
        setAucPrice(res.data.auc_Price);
        // console.log("세팅된 값들", viewDetail);
        console.log("파일 이름 : ", res.data.pro_Photo);
        setImgName(res.data.pro_Photo);
        setCommView(res.data.commentView);
      })
      .catch((error) => {
        // console.log(error);
        alert("디테일 오류 발생");
      });
  }, []);

  //오류메세지 상태 저장
  const [aucMessage, setAucMessage] = useState("");

  //유효성 검사
  const [isAuc, setIsAuc] = useState(false);

  //버튼활성화
  const [notAllow, setNotAllow] = useState(true); //입찰하기

  //입찰가격 유효성 검사
  const onChangeAuc = (e) => {
    const currentAuc = e.target.value;
    // console.log(" 입력한 입찰금액", currentAuc);

    if (currentAuc <= aucPrice) {
      setAucMessage("현재 입찰가보다 높게 입찰해주세요");
      setIsAuc(true);
    } else {
      setAucMessage("");
      setIsAuc(false);
    }
  };

  //버튼 활성화 관련
  useEffect(() => {
    if (isAuc == false) {
      setNotAllow(false); //가입 버튼 활성화
      return;
    }
    setNotAllow(true);
  }, [isAuc]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setBidAddr(bidPayRef.current.value)
    // console.log('bidPay', bidPayRef.current.value)
    setModalOpenBid(!modalOpenBid);
    bidPay();

    // axios.post()
  };
  function bidPay() {
    // console.log("입찰금액", bidPayRef.current.value);
    // console.log("현재 입찰 금액", viewDetail.auc_Price);

    axios
      .post("/detail/auc", {
        mem_Id: user,
        auc_Price: bidPayRef.current.value,
        pro_Num: viewDetail.pro_Num,
        auc_Deposit: viewDetail.auc_Price * 0.1,
        auc_Seq: 0,
        auc_Time: 0,
      })
      .then(function (res) {
        // console.log("이건뭐야1", res);
        // console.log("이건뭐야2", res.data);

        if (res.data == "no") {
          alert("픽머니를 충전해주세요.");
          Navigate("/myPage");
        } else {
          alert("경매 참여 완료되었습니다.");
        }
      })
      .catch(function (error) {
        alert("입찰 오류발생");
        // console.log(error);
      });
  }

  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [info, setInfo] = useState(true); //상세 설명 Q&A 버튼
  const [modalOpen, setModalOpen] = useState(false); // 물품 상태
  const [modalOpenBid, setModalOpenBid] = useState(false); //

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const openModalBid = () => {
    setModalOpenBid(true);
  };
  const closeModalBid = () => {
    setModalOpenBid(false);
  };

  // 버튼 누르면 넘어가는거
  const btnEx = () => {
    setInfo(true);
  };
  const btnQnA = () => {
    setInfo(false);
  };

  const onView = (id) => {
    //고유번호인 id를 받아서 해당 고양이 사진을 찾아라
    setCurrItem(datas.find((item) => item.id === id)); //배열함수중 해당값만 찾아주는 find함수를 쓴다
  };

  // ----------------------
  const [com, setCom] = useState([{}]);
  const handleComment = (newCom) => {
    console.log("handleComment", newCom);

    let curTime = new Date().toLocaleTimeString();
    //concat : 배열 + 배열

    setCom(com.concat({ text: newCom, time: curTime }));
  };

  return (
    <div className="rootDiv">
      <div className="container">
        <div className="content">
          <div className="pic">
            <div className="big">
              <Gallery imgName={imgName} />
            </div>
            <div className="small">
              <div className="">small1</div>
              <div className="">small2</div>
              <div className="">small3</div>
            </div>
          </div>
          <div className="right">
            <div className="info">
              <div className="line">
                <div className="infoView">상품명 :</div>
                <div className="inputView">{viewDetail.pro_Name}</div>
              </div>
              <div className="line">
                <div className="infoView">카테고리 브랜드 :</div>
                <div className="inputView">
                  {viewDetail.pro_Category}/{viewDetail.pro_Brand}
                </div>
              </div>
              <div className="line">
                <div className="infoView">물품 상태 :</div>
                <div className="inputView">{viewDetail.pro_Status}</div>
              </div>
              <div className="line">
                <div className="infoView">시작가 :</div>
                <div className="inputView">{viewDetail.pro_Min_Price}</div>
              </div>
              <div className="line">
                <div className="infoView">현재 입찰가 :</div>
                <div className="inputView">{viewDetail.auc_Price}</div>
              </div>
              <div className="line">
                <div className="infoView">마감 기한 :</div>
                <div className="inputView">{viewDetail.pro_Deadline}</div>
              </div>
              <div className="line">
                <div className="infoView">경매 참여비 :</div>
                <div className="inputView">{viewDetail.auc_Deposit}</div>
              </div>
              <div className="line">
                <div className="infoView">판매자 :</div>
                {/* <div className="inputView"><a href='mypage/pickmeup'>{viewDetail.mem_Id}</a></div> */}
                <div className="inputView">
                  <button onClick={btnSellMyPage}>{viewDetail.mem_Id}</button>
                </div>
              </div>
            </div>
            <div className="modalSection">
              <div className="state">
                <button onClick={openModal}>?</button>
              </div>
              <div className="bid">
                <button value="proNum" onClick={openModalBid}>
                  입찰하기
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="select">
          <button onClick={btnEx}>상세설명</button>
          <button onClick={btnQnA}>QnA</button>
        </div>
        <div className="comment">
          {info == true ? viewDetail.pro_Desc : <CommentTest />}
        </div>
      </div>
      <React.Fragment>
        <PupUpModal open={modalOpen} close={closeModal} header="상태 기준">
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
                미사용, 미개봉 또는 구입으로부터 시간이 걸리지 않는 한 번도
                사용하지 않은 상품
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
      <PopUpModal open={modalOpenBid} close={closeModalBid} header="입찰하기">
        <form onSubmit={handleSubmit}>
          <table align="center" border="solid 1px">
            <tr width="500px">
              <td>상품명</td>
              <td> {viewDetail.pro_Name}</td>
            </tr>
            <tr>
              <td>판매자</td>
              <td>{user}</td>
            </tr>
            <tr>
              <td>남은기간</td>
              <td>{viewDetail.pro_Deadline}</td>
            </tr>
            <tr>
              <td>입찰 최소 단위</td>
              <td>1,000원</td>
            </tr>
            <tr>
              <td>현재가</td>
              <td> {viewDetail.auc_Price} </td>
            </tr>
            <tr>
              <td> 입찰 금액 </td>
              <td>
                <input
                  onChange={onChangeAuc}
                  type="text"
                  placeholder="입찰할 금액을 입력해주세요"
                  ref={bidPayRef}
                ></input>
                <p>{aucMessage}</p>
              </td>
            </tr>
            <tr>
              <td>배송방법</td>
              <td>택배, 착불/선불 (3,500)</td>
            </tr>
            {/* <tr>
                <td>총 구매금액</td>
                <td ></td>
              </tr> */}
            <tr>
              <td colspan="2">
                <input
                  type="submit"
                  value="입찰하기"
                  disabled={notAllow}
                ></input>
              </td>
            </tr>
          </table>
        </form>
      </PopUpModal>
    </div>
  );
};

export default Detail;
