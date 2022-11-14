import React from "react";
import { useNavigate } from "react-router-dom";

const SelectList = ({ item, convertPrice }) => {
  const navigate = useNavigate();

  console.log("사진 이름:", item.pro_Photo);
  const thum = item.pro_Photo.split(/[!,"]/);
  console.log("썸네일:", thum);

  const goToDetail = () => {
    navigate(`/detail?pro_num=${item.pro_Num}`);
  };

  return (
    <div className="productBody1">
      <div className="proList">
        {/* <img src={item.pro_Photo} className="img-thumbnail" width='200px' onClick={goToDetail} /> */}
        <img
          src={thum[1]}
          className="img-thumbnail"
          width="200px"
          onClick={goToDetail}
        />
        <div className="pro">
          <span onClick={goToDetail} className="proSpan1">
            {item.pro_Name}
          </span>
          <span onClick={goToDetail} className="proSpan2">
            {convertPrice(item.auc_Price)}
          </span>
          <span onClick={goToDetail} className="proSpan3">
            {item.mem_Id}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SelectList;
