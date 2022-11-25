import React from 'react'
import styled from '../../../styles/rental-scss/commnent.module.scss'

const Commnent = () => {
  return (
    <>
      <div className={styled.commentCard}>
        <div className={styled.memberInfo}>
          <div className={styled.avatar}>
            <img
              src="https://qoopio.com/wp-content/uploads/2020/06/%E9%99%B3%E6%80%A1%E5%90%9Bmini_%E8%AD%89%E4%BB%B6%E7%85%A7.jpg"
              alt=""
            />
          </div>
          <p>May</p>
        </div>
        <p className={styled.commnentWord}>這次活動真的好好玩喔 我下次還想去</p>
        <div className={styled.star}>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </div>
        <p className={styled.readMore}>閱讀更多</p>
      </div>
    </>
  )
}

export default Commnent
