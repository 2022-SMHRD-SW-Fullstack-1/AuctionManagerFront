import "../css/Detail.css";
import MapComment from "./MapComment";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const CommentTest = () => {
  function inputComment() {
    axios
      .post("/detail/comment", {
        mem_Id: user,
        qna_Content: comListRef.current.value,
        pro_Num: Object.values(proDetail)[0],
      })
      .then(function (res) {
        console.log("누구세요?", res);
      })
      .catch(function (error) {
        alert("댓글 오류발생");
        console.log(error);
      });
  }

  const comListRef = useRef([]);
  console.log("입력한댓글", comListRef.current.value);

  var str = decodeURI(window.location.search);
  console.log(str);
  const params = new URLSearchParams(str);
  const proDetail = { pro_Num: params.get("pro_num") };
  // console.log("너야?2", proDetail);
  const [viewDetail, setViewDetail] = useState([
    {
      pro_Num: 0,
      mem_Id: "",
    },
  ]);

  let user = sessionStorage.getItem("mem_Id");

  const [value, setValue] = useState("");
  //1. input 내 변화 값 감지
  const inputHandle = (e) => {
    setValue(e.target.value);
  };

  //2.'+' 버튼을 클릭시 , input 값을 어딘가에 세팅
  const btnHandle = () => {
    // console.log('현재 댓글',value)
    //3.세팅된  그 값을 상위 컴포넌트로 전송
    // handleComment(value)
    //4. input 창을 비워줄 것
    setValue("");
    inputComment();
    // navigate('/detail?pro_num=304')
  };
  const enter = (e) => {
    // console.log(e.code)
    // e.code === 'Enter' && btnHandle()
    // inputComment();
  };

  return (
    <div className="commentDetail">
      <div className="write">
        <div className="input">
          <input
            type="text"
            placeholder="write a comment"
            onChange={inputHandle}
            // value={value}
            onKeyPress={enter}
            ref={comListRef}
          />
        </div>
        <div>
          <button onClick={btnHandle}>입력</button>
        </div>
      </div>
      <MapComment />
    </div>
  );
};

export default CommentTest;
