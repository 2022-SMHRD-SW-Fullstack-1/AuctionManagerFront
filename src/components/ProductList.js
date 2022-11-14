import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img1 from "./img/dress.png";

const ProductList = ({ item, convertPrice }) => {
  console.log("사진 이름:", item.pro_Photo);
  const thum = item.pro_Photo.split(/[!,"]/);
  console.log("썸네일:", thum);

  // const photoArr = [];
  // photoArr[0] = thum[1];
  // photoArr[1] = thum[4];
  // photoArr[2] = thum[7];
  // console.log("사진 이름 배열", photoArr);

  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/detail?pro_num=${item.pro_Num}`);
  };

  console.log("현재가격:", item);

  return (
    <div className="proList">
      {/* alt: 해당 이미지를 위한 대체 텍스트(시각장애인을 위한) */}
      {/* <img src={item.pro_Photo} className="img-thumbnail" width='200px' onClick={goToDetail} /> */}
      <img src={thum[1]} className="img-thumbnail" onClick={goToDetail} />
      <div className="pro">
        <span className="proSpan1" onClick={goToDetail}>
          {item.pro_Name}
        </span>
        <span className="proSpan2" onClick={goToDetail}>
          {convertPrice(item.auc_Price)}
        </span>
        <span className="proSpan3" onClick={goToDetail}>
          {item.mem_Id}
        </span>
      </div>
    </div>
  );
};

export default ProductList;
