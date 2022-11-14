import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../axios";
import { col } from "react-bootstrap";
import "./css/MyPage.css";

const Review = () => {
  let user = sessionStorage.getItem("Review_Id");

  //리뷰 리스트 map함수를 위한 객체생성
  const [otherReview, setOtherReview] = useState([{}]);
  const [otherReviewCk, setOtherReviewCk] = useState(false);
  //판매자의 평균점수 스테이트
  const [sumRating, setSumRating] = useState();

  const otherReviewUrl = "/pickmeup/otherReview/" + user;
  const sumRatingUrl = "/pickmeup/otherReview/SumRating/" + user;
  useEffect(() => {
    axios.get(otherReviewUrl).then((res) => {
      //나에대한,판매자에 대한 리뷰 받아온다.
      console.log("other", res);
      setOtherReview(res.data);
      if (res.data.length >= 1) {
        setOtherReviewCk(!otherReviewCk);
      }
    });

    axios.get(sumRatingUrl, { withCredentials: false }).then((res) => {
      console.log("sum", res);
      setSumRating(res.data);
    });
  }, []);

  const OtherReviewComplete = ({ obj }) => {
    return (
      <tr>
        <td>{obj.rv_Rating}</td>
        <td>{obj.pro_Name}</td>
        <td>{obj.rv_Content}</td>
        <td>{obj.mem_Id}</td>
      </tr>
    );
  };

  return (
    <div id="reviewDiv">
      <h5 id="node13">
        {user}님의 평균 점수 : {parseFloat(sumRating)}
      </h5>
      <table id="mp">
        <colgroup>
          <col width="10%" />
          <col width="40%" />
          <col width="40%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr align="center" id="font1">
            <th>점수</th>
            <th>상품명</th>
            <th>내용</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {otherReviewCk ? (
            otherReview.map((obj, idx) => (
              <OtherReviewComplete key={obj.rv_Content} obj={obj} />
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
    </div>
  );
};

export default Review;
