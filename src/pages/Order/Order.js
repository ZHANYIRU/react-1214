import React from 'react'
import styled from '../../styles/cart-scss/Order.module.scss'
import OrderTime from './components/OrderTime'
import OrderNum from './components/OrderNum'
function Order() {
  return (
    <div className={styled.body}>
      <div className={styled.order}>
        <div className={styled.member}>會員</div>
        <div className={styled.orderRight}>
          <div className={styled.search}>
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="可以透過訂單編號、商品名稱搜尋" />
          </div>
          <div className={styled.orderBottom}>
            <OrderTime />
            <OrderNum />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
