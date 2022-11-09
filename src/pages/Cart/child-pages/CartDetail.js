import { useState } from 'react'
import styled from '../../../styles/cart-scss/cartDetail.module.scss'
function CartDetail(props) {
  const [total, setTotal] = useState(0)
  return <div className={styled.dtWrap}>購物車詳細{total}
    <button onClick={() => {
      setTotal(total + 1)
    }}>+</button></div>
}

export default CartDetail
