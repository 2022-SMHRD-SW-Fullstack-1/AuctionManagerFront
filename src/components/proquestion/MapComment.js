import "../css/Detail.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MapComment = () => {
  const navigate = useNavigate();

  // console.log('아이템',item)
  //상품댓글 정보
  const [commView, setCommView] = useState([
    {
      qna_Content: "",
      qna_Date: "",
      mem_Id: "",
    },
  ]);

  const goToDetail = () => {
    // navigate(`/detail?pro_num=${item.pro_Num}`);
  };

  var str = decodeURI(window.location.search);
  console.log(str);
  const params = new URLSearchParams(str);
  const proDetail = { pro_Num: params.get("pro_num") };
  //   console.log("너야?2", proDetail);

  useEffect(() => {
    axios
      .post("/detail", proDetail)
      .then((res) => {
        console.log("맵코맨트res", res);
        console.log("맵코맨트resData", res.data);
        console.log("맵코맨트commentVisew", res.data.commentView);
        setCommView(res.data.commentView);
      })
      .catch((error) => {
        console.log(error);
        alert("디테일 오류 발생");
      });
  }, []);

  const commentData = commView;

  console.log("뭐들어있을까", commentData);

  return (
    <div className="commentMapContainer">
      {commentData.map(function (item) {
        return (
          <div className="item">
            <div className="nick"> {item.mem_Id} </div>
            <div className="content">{item.qna_Content}</div>
            <div className="date">{item.qna_Date}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MapComment;
