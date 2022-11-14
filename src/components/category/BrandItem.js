import React from 'react'
import '../css/MenuBanner.css'
import { useNavigate } from 'react-router-dom';
import { SiNike, SiAdidas , SiNewbalance } from "react-icons/si";

const BrandItem = ({brand}) => {

  const navigate=useNavigate()
  const goToSelectB=(e)=>{
    console.log("지금 이벤트: ", e.target.innerText)
   const pro_brand=e.target.innerText;
   navigate(encodeURI('/selectItem?pro_brand='+pro_brand));
  }

  return (
    <div className='brandItem'>
      <div className='pro_List'>
        <span onClick={goToSelectB}>{brand.name}</span>
        <span onClick={goToSelectB}>{brand.icon}</span>
        {/* <IconName >{brand.icon}</IconName> */}
        </div>
    </div>
  )
}

export default BrandItem
