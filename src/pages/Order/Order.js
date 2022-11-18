import React from 'react'
import styled from '../../styles/order-scss/Order.module.scss'
import OrderTime from './components/OrderTime'
import OrderNum from './components/OrderNum'
function Order() {
  return (
    <div className={styled.orderRight}>
      <div className={styled.search}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="可以透過訂單編號、商品名稱搜尋" />
      </div>
      <div className={styled.orderBottom}>
        <OrderTime />
        <OrderNum />
      </div>
    </div>
  )
}

export default Order
