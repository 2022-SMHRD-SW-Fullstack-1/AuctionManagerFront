import React from "react";
import GalleryItem from "./GalleryItem";

const GalleryList = ({ imgName, thum, datas, currItem, onView }) => {
  const { image, title } = currItem;
  //   console.log("GalleryList:", imgName);
  //   const photoName = imgName.split('"');
  //   console.log("자른 이름 :", photoName);

  imgName !== undefined &&
    thum !== undefined &&
    console.log("넘어온 thum", thum);

  // const firstPhoto = thum[0];
  // let firstPhoto = thum[0];

  // const photoNameArr = thum.shift();
  // console.log("처음 값 뺀 배열", photoNameArr);
  return (
    <article className="left">
      {thum ? (
        <img src={thum[0]} alt={title} height="500px" width="auto" />
      ) : (
        <img src={image} alt={title} />
      )}

      <ul>
        {datas.map((item) => (
          <GalleryItem thum={thum} key={item.id} item={item} onView={onView} />
        ))}
      </ul>
    </article>
  );
};

export default GalleryList;
