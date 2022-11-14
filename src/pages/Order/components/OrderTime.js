import React from 'react'
import styled from '../../../styles/order-scss/OrderTime.module.scss'
function OrderTime() {
  return (
    <>
      <div className={styled.container}>
        <div className={styled.time}>
          <p>Oct</p>
          <p>18</p>
        </div>
        <div className={styled.border} />
        <div className={styled.time}>
          <p>Oct</p>
          <p>18</p>
        </div>
        <div className={styled.border} />
        <div className={styled.time}>
          <p>Oct</p>
          <p>18</p>
        </div>
        <div className={styled.border} />
        <div className={styled.time}>
          <p>Oct</p>
          <p>18</p>
        </div>
        <div className={styled.border} />
      </div>
    </>
  )
}

export default OrderTime
