import React from "react";
import BrandItem from "./category/BrandItem";
import CategoryItem from "./category/CategoryItem";
import "./css/MenuBanner.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";

import "swiper";
import "../../node_modules/swiper/swiper-bundle.css";

import banner1 from "./img/배너1.png";
import banner2 from "./img/배너2.png";

import { SiNike, SiAdidas, SiNewbalance } from "react-icons/si";
import { FaTshirt } from "react-icons/fa";
import {
  GiArmoredPants,
  GiLabCoat,
  GiMonclerJacket,
  GiConverseShoe,
} from "react-icons/gi";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const MenuBanner = () => {
  const brand = [
    { name: "나이키", icon: <SiNike size="30" /> },
    { name: "아디다스", icon: <SiAdidas size="30" /> },
    { name: "뉴발란스", icon: <SiNewbalance size="30" /> },
  ];
  // icon: SiNike SiAdidas  SiNewbalance

  const category = [
    { name: "상의", icon: <FaTshirt size="30" /> },
    { name: "하의", icon: <GiArmoredPants size="30" /> },
    { name: "셋업", icon: <GiLabCoat size="30" /> },
    { name: "아우터", icon: <GiMonclerJacket size="30" /> },
    { name: "악세사리", icon: <GiConverseShoe size="30" /> },
  ];

  return (
    <div className="menuBox">
      <div className="selectBox">
        <div className="brandMenu">
          {brand.map((brand, idx) => {
            return <BrandItem brand={brand} />;
          })}
        </div>

        <div className="categoryMenu">
          {category.map((category, idx) => {
            return <CategoryItem category={category} />;
          })}
        </div>
      </div>

      <div className="banner">
        <Swiper
          className="banner"
          spaceBetween={1500}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
        >
          <SwiperSlide>
            <img src={banner1}></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={banner2}></img>
          </SwiperSlide>
          {/* <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide> */}
        </Swiper>
      </div>
      <div></div>
    </div>
  );
};

export default MenuBanner;
