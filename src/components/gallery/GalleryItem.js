import React from "react";

const GalleryItem = ({ thum, item, onView }) => {
  // DB에 저장된 파일 이름이 들어있는 배열 : thum
  const { image, title, id } = item;

  thum !== undefined && console.log("DBthum", thum);

  // if (thum !== undefined) {
  //   thum.shift();
  // }

  // console.log("썸네일 배열", thumArr);

  return (
    <li onClick={() => onView(id)}>
      <img src={image} alt={title} />
    </li>
  );
};

export default GalleryItem;
