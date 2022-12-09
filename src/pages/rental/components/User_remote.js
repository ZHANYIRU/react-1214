import styled from '../../../styles/rental-scss/AI.module.scss'
import React from 'react'

const User_remote = ({ text }) => {
  return (
    <div className={styled.user_remote}>
      <div className={styled.avatar}>
        <div className={styled.pic}>
          <img src="customer_service.png" alt="" />
        </div>
        <div className={styled.name}>智能客服</div>
      </div>
      <div className={styled.txt}>
        {text}
        {text === '正在查詢中....' && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default User_remote
