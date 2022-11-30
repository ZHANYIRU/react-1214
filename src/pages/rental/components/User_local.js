import styled from '../../../styles/rental-scss/AI.module.scss'
import React from 'react'

const User_local = ({ text }) => {
  return (
    <div className={styled.user_local}>
      <div className={styled.avatar}>
        <div className={styled.pic}>
          <img src="Sally.jpeg" alt="" />
        </div>
        <div className={styled.name}>憤怒的葡萄</div>
      </div>
      <div className={styled.txt}>{text ? text : '測試'}</div>
    </div>
  )
}

export default User_local
