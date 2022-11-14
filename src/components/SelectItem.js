import axios from "axios";
import React, { useEffect, useState } from "react";
import SelectList from "./SelectList";

const SelectItem = ({ item }) => {
  var str = decodeURI(window.location.search);
  console.log("메뉴바 선택 시 클릭 된 url", str);
  const params = new URLSearchParams(str);
  const proSelectB = { pro_Brand: params.get("pro_brand") };
  const proSelectC = { pro_Category: params.get("pro_category") };

  //메인에 보이는 상품 가격에 , 찍기
  const convertPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [selectPro, setSelectPro] = useState([
    {
      pro_Num: 0,
      mem_Id: "",
      pro_Brand: "",
      pro_Category: "",
      pro_Name: "",
      pro_Photo: "",
      auc_Price: 0,
    },
  ]);

  const [noSelect, setNoSelect] = useState("");

  useEffect(() => {
    console.log("prosb:", proSelectB.pro_Brand);
    console.log("prosc:", proSelectC.pro_Category);

    axios
      .post("/selectItem", {
        pro_Brand: proSelectB.pro_Brand,
        pro_Category: proSelectC.pro_Category,
      })
      .then(function (res) {
        console.log("메뉴바 눌렀을 때 뭐가 넘어 오나", res);
        console.log("넘어오는 값", res.data);
        if (res.data.length == 0) {
          setNoSelect("검색결과가 없습니다.");
        } else {
          setNoSelect("");
          setSelectPro(res.data);
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("오류 발생");
      });
  }, []);

  let selectList = selectPro
    .filter((item, idx) => idx <= 3)
    .map((item, idx) => (
      <SelectList key={item.pro_Num} item={item} convertPrice={convertPrice} />
    ));

  const selectRes = () => {
    if (noSelect === "검색결과가 없습니다.") {
      return <div className="noSelect">{noSelect}</div>;
    } else {
      return selectList;
    }
  };

  useEffect(() => {
    selectRes();
  }, [noSelect]);

  return <div className="proListBox">{selectRes()}</div>;
};

export default SelectItem;
