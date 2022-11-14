import React from 'react'
import '../css/MenuBanner.css'
import { useNavigate } from 'react-router-dom';

const CategoryItem = ({category}) => {


  const navigate=useNavigate()
  const goToSelectC=(e)=>{
    console.log("지금 이벤트: ",e.target.innerText)
    const pro_category=e.target.innerText;
    navigate(encodeURI('/selectItem?pro_category='+pro_category));
   }

  return (
    <div className='categoryItem'>
        <span onClick={goToSelectC}>{category.name}</span>
        <span onClick={goToSelectC}>{category.icon}</span>

    </div>
  )
}

export default CategoryItem
