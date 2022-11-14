import React from "react";
import { useState, useRef } from "react";
import "../css/PhotoBox.css";

function PhotoUploader({ imgName, setImgName }) {
  // const [image, setImage] = useState({
  //   image_file: "",
  //   preview_URL: "img/default_image.png",
  // });

  // const [srcRoot, setSrcRoot]= useState("");
  // let inputRef;

  // 사진 업로드 버튼 이벤트 핸들러
  const photoInput = useRef();

  const handleClick = () => {
    photoInput.current.click();
  };

  // 사진 등록하기 및 미리보기 기능 구현
  const [photoToAddList, setPhotoToAddList] = useState([]);
  const photoName = [];
  const root = [];

  // 미리보기 기능 구현
  const photoToAddPreview = () => {
    return photoToAddList.map((photo) => {
      console.log("파일이름 : ", photo.id);

      photoName.push(photo.id);
      console.log("배열에 들어 간 파일 이름 :", photoName);

      // 이미지 src = "Img/things.jpg"
      console.log("Img/", photoName);

      console.log("첫번째: ", photoName[0]);

      return (
        <div>
          <div className="photoBox" key={photo.url}>
            <button
              className="photoBoxDelete"
              onClick={() => onRemoveToAdd(photo.url)}
            >
              X
            </button>
            <img
              className="photoPreview"
              src={photo.url}
              // width="500px"
              height="300px"
            />
          </div>
        </div>
      );
    });
  };

  // 등록한 이미지 삭제
  const onRemoveToAdd = (deleteUrl) => {
    setPhotoToAddList(photoToAddList.filter((photo) => photo.url != deleteUrl));
  };

  // 이미지 여러장 첨부하기
  const handlePhoto = (e) => {
    const temp = [];
    const photoToAdd = e.target.files;

    for (let i = 0; i < photoToAdd.length; i++) {
      temp.push({
        id: photoToAdd[i].name,
        file: photoToAdd[i],
        url: URL.createObjectURL(photoToAdd[i]),
      });
    }
    setPhotoToAddList(temp.concat(photoToAddList));

    setImgName(imgName.concat(e.target.files[0].name));
  };

  return (
    <div className="contentWrapper">
      <div className="contentBodyPhotoUploaderWrapper">
        <div className="photoUploaderContent">
          <div onClick={handleClick} />
        </div>

        <div className="photoBoxAddPhoto">
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            multiple
            ref={photoInput}
            onChange={(e) => handlePhoto(e)}
            className="file-upload-button"
          />
          {photoToAddPreview()}
        </div>
      </div>

      <div>
        <img src={root}></img>
      </div>
    </div>
  );
}

export default PhotoUploader;
