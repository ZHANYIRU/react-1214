import { useState } from 'react'
import styled from '../../../styles/cart-scss/BuyCart.module.scss'
function BuyCart({ step, setStep }) {
  const [check, setCheck] = useState(false)
  if (step === 1) {
    return (
      <>
        <div className={styled.buyCart}>
          <div className={styled.wrap}>
            <div>
              <input type="checkbox" id='check' checked={check}
                onChange={(e) => {
                  setCheck(e.target.checked)
                }} />
              <label htmlFor="check">全選</label>
            </div>
            <p>總訂購數量：9</p>
            <div className={styled.price}>
              <span>總金額：</span><p>$19000</p>
            </div>
            <button
              onClick={() => {
                setStep(step + 1)
              }}
            >
              買單去
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default BuyCart
