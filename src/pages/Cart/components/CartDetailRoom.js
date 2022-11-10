import React from 'react'
import styled from '../../../styles/cart-scss/cartDetail.module.scss'
function CartDetailRoom() {
  return (
    <>
      <div className={styled.dtWrap}>
        <div className={styled.outWrap}>
          <div className={styled.wrap}>
            <input type="checkbox" />
            <div className={styled.wrapRight}></div>
          </div>
          <div className={styled.wrap}>
            <input type="checkbox" />
            <div className={styled.wrapRight}></div>
          </div>
          <div className={styled.wrap}>
            <input type="checkbox" />
            <div className={styled.wrapRight}></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartDetailRoom
