import React from 'react'
import MoveTopBtn from '../css/MoveTopBtn.css'

const TopButton = () => {

    // 버튼 클릭 시 맨 위로 이동
    const handleTopBtn = () =>{
        window.scrollTo({top:0, behavior:"smooth"});
    }


  return (
    <div>
        <button className='moveTopBtn' onClick={handleTopBtn}>위로</button>
    </div>
  )
}

export default TopButton