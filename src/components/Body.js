import React, { Component, useState } from "react";
import "./css/Body.css";
import "./css/Product.css";
import { FaList } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import MenuBanner from "./MenuBanner";
import Product from "./Product";

const Body = () => {
  //메인에 보이는 상품 가격에 , 찍기
  const convertPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="mainBody">
      <MenuBanner />

      {/* <div className='menuBar'>
                <MenuBar />
            </div>
            <div className='bannerBody'>
                <Banner />
            </div> */}

      <div className="gap"></div>

      <div className="proTitle"></div>
      <div className="productList">
        <Product convertPrice={convertPrice} />
      </div>

      <div className="gap"></div>
    </div>
  );
};

export default Body;
