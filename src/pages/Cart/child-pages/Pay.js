import { useRef, useState, useEffect } from 'react'
import styled from '../../../styles/cart-scss/Pay.module.scss'
import axios from 'axios'
function subscribe(eventName, listener) {
  document.addEventListener(eventName, listener)
}

function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, listener)
}
function Pay({ step, setStep }) {
  const newLinePay = useRef(null)
  const [paid, setPaid] = useState(false)
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
  useEffect(() => {
    subscribe('paid', () => setPaid(true))
    if (paid) {
      setStep(step + 1)
    }
    return () => {
      unsubscribe('paid')
    }
  }, [paid])
  return (
    <>
      <div className={styled.choose}>
        <button
          onClick={() => {
            setStep(step - 1)
          }}
        >
          重新選擇付款方式
        </button>
      </div>

      <div className={styled.pay}>
        <button
          onClick={async () => {
            testOrder.orderId = new Date().getTime()
            const { data } = await axios.post(
              `http://localhost:3001/order/createOrder`,
              testOrder
            )
            if (data.returnCode === '0000') {
              newLinePay.current = window.open(
                `${data?.info.paymentUrl.web}`,
                'hiking',
                'height=800,width=1000'
              )
            }
          }}
        >
          LINE PAY 付款
        </button>
      </div>
    </>
  )
}

export default Pay
