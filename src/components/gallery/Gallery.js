import React, { useState } from "react";
import GalleryList from "./GalleryList";
// import GalleryView from './GalleryView'
import data from "./image"; //고양이 데이터 import

const Gallery = ({ imgName }) => {
  const [datas, setDatas] = useState(data); //고양이 데이터
  const [currItem, setCurrItem] = useState(datas[0]); //선택한 사진 상태설정

  console.log("GalImage", imgName);

  imgName !== undefined && console.log("이름 자르기", imgName.split(/[!,"]/));
  // console.log("자르기", imgName.toString.split(/["]/));
  // console.log(imgName.split('"')[1]);

  // const [thumArr, setThumArr] = useState([]);

  // imgName !== undefined && setThumArr(imgName.split(/[!,"]/));

  if (imgName !== undefined) {
    var thum = [];

    thum[0] = imgName.split('"')[1];
    thum[1] = imgName.split('"')[3];
    thum[2] = imgName.split('"')[5];
    thum[3] = imgName.split('"')[7];
    thum[4] = imgName.split('"')[9];
  }

  console.log("썸네일", thum);

  //   let photoName = String(imgName).idexOf('"');
  //   var str = imgName.substring('"', jng);
  //   console.log("자른 이름", str);

  //   const arrName = [];
  //   arrName.put(str[1], str[4], str[7]);

  const onView = (id) => {
    //고유번호인 id를 받아서 해당 고양이 사진을 찾아라
    setCurrItem(datas.find((item) => item.id === id)); //배열함수중 해당값만 찾아주는 find함수를 쓴다
  };

  return (
    <div className="wrap">
      <GalleryList
        thum={thum}
        imgName={imgName}
        datas={datas}
        onView={onView}
        currItem={currItem}
      />
      {/* <GalleryView currItem = {currItem}/> */}
    </div>
  );
};

export default Gallery;
