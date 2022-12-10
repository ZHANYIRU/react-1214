import styled from '../../../styles/rental-scss/AI.module.scss'
import MemberContext from '../../../contexts/MemberContext'
import React, { useContext } from 'react'

const User_local = ({ text }) => {
  const { data } = useContext(MemberContext)
  console.log(data)
  return (
    <div className={styled.user_local}>
      <div className={styled.avatar}>
        <div className={styled.pic}>
          {/* "Sally.jpeg" */}
          <img
            src={
              data.avatar
                ? `http://localhost:3001/uploads/${data.avatar}`
                : 'Sally.jpeg'
            }
            alt=""
          />
        </div>
        <div className={styled.name}>{data.nickname || '訪客'}</div>
      </div>
      <div className={styled.txt}>{text ? text : ''}</div>
    </div>
  )
}

export default User_local
