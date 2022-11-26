import React from 'react'
import styled from '../../../styles/cart-scss/Pay.module.scss'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
function Pay({ step, setStep }) {
  const navigate = useNavigate()
  const testOrder = {
    amount: 1000,
    currency: 'TWD',
    packages: [
      {
        id: 'products_1',
        amount: 1000,
        products: [
          {
            name: '六角棒棒',
            quantity: 1,
            price: 1000,
          },
        ],
      },
    ],
  }
  return (
    <div className={styled.pay}>
      Pay
      <button
        onClick={async () => {
          testOrder.orderId = new Date().getTime()
          const { data } = await axios.post(
            `http://localhost:3001/order/createOrder`,
            testOrder
          )
          console.log(data)
          if (data.returnCode === '0000') {
            window.open(
              `${data?.info.paymentUrl.web}`,
              'hiking',
              'height=800,width=1000'
            )
          }

          // setStep(step + 1)
        }}
      >
        結帳去
      </button>
    </div>
  )
}

export default Pay
