import { useRef, useState, useEffect, useContext } from 'react'
import styled from '../../../styles/cart-scss/Pay.module.scss'
import ProCartContext from '../../../contexts/ProCartContext'
import axios from 'axios'
function subscribe(eventName, listener) {
  document.addEventListener(eventName, listener)
}

function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, listener)
}
function Pay({ step, setStep }) {
  const { pro, ren, room, camp, cartPrice, moneyFormat } =
    useContext(ProCartContext)
  // console.log(pro, ren, room, camp, cartPrice)
  console.log([...camp])
  const newLinePay = useRef(null)
  const [paid, setPaid] = useState(false)
  const testOrder = {
    amount: cartPrice,
    currency: 'TWD',
    packages: [
      {
        id: 'products_1',
        amount: cartPrice,
        products: [
          {
            name: '六角棒棒',
            quantity: 1,
            price: cartPrice,
          },
        ],
      },
    ],
  }
  // const testOrder = {
  //   amount: cartPrice,
  //   currency: 'TWD',
  //   packages: [
  //     {
  //       id: 'pro_1',
  //       amount: cartPrice,
  //       products: [
  //         {
  //           name: '六角棒棒',
  //           quantity: 1,
  //           price: cartPrice,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'camp_1',
  //       amount: cartPrice,
  //       products: [
  //         {
  //           name: '六角棒棒',
  //           quantity: 1,
  //           price: cartPrice,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'room_1',
  //       amount: cartPrice,
  //       products: [
  //         {
  //           name: '六角棒棒',
  //           quantity: 1,
  //           price: cartPrice,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'ren_1',
  //       amount: cartPrice,
  //       products: [
  //         {
  //           name: '六角棒棒',
  //           quantity: 1,
  //           price: cartPrice,
  //         },
  //       ],
  //     },
  //   ],
  // }
  useEffect(() => {
    subscribe('paid', () => setPaid(true))
    if (paid) {
      setTimeout(() => {
        setStep(step + 1)
      }, 2000)
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
        <p>
          總金額:{moneyFormat(cartPrice)}
          <span>{paid ? '已付款' : '尚未付款'}</span>
        </p>
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
