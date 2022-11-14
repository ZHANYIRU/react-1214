import React from 'react'
import styled from '../../../styles/cart-scss/Pay.module.scss'

function Pay({ step, setStep }) {
  return (
    <div className={styled.pay}>
      Pay
      <button
        onClick={() => {
          setStep(step + 1)
        }}
      >
        結帳去
      </button>
    </div>
  )
}

export default Pay
