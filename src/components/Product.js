import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import img1 from "./img/dress.png";
import ProductList from "./ProductList";

const Product = ({ convertPrice }) => {
  const [product, setProduct] = useState([
    {
      pro_Num: 0,
      mem_Id: "",
      pro_Name: "",
      pro_Photo: "",
      auc_Price: 0,
    },
  ]);

  useEffect(() => {
    // console.log(soonOutPro)
    axios
      .get("/main")
      .then(function (res) {
        setProduct(res.data);
      })
      .catch(function (error) {
        console.log(error);
        alert("오류발생");
      });
  }, []);

  //인덱스 3번까지 화면에 출력(상품 4개만 출력=>필터)
  let productList = product.map((item, idx) => (
    <ProductList key={item.pro_Num} item={item} convertPrice={convertPrice} />
  ));
  //라이프사이클 사용해서 경매 종료된 상품은 없애고 새로운 제품을 그 상품 대신 넣기 > 뒤에서부터 차곡차곡 쌓이게

  return <div className="proListBox">{productList}</div>;
};

export default Product;
