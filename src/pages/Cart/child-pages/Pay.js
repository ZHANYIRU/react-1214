import { useRef, useState, useEffect, useContext } from 'react'
import styled from '../../../styles/cart-scss/Pay.module.scss'
import ProCartContext from '../../../contexts/ProCartContext'
import MemberContext from '../../../contexts/MemberContext'
import axios from 'axios'
import dayjs from 'dayjs'
function subscribe(eventName, listener) {
  document.addEventListener(eventName, listener)
}

function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, listener)
}
function Pay({ paySelect, familySelect, step, setStep, setForOk }) {
  const { data } = useContext(MemberContext)
  const { pro, ren, room, camp, cartPrice, moneyFormat, writeUser } =
    useContext(ProCartContext)
  const newLinePay = useRef(null)
  const [paid, setPaid] = useState(false)
  const testOrder = {
    order: {
      amount: cartPrice,
      currency: 'TWD',
      packages: [
        {
          id: 'products_1',
          amount: cartPrice,
          products: [
            {
              name: 'hiking棒棒',
              quantity: 1,
              price: cartPrice,
            },
          ],
        },
      ],
    },
    totalOrder: {
      pro: pro,
      room: room,
      camp: camp,
      ren: ren,
      memberSid: data.member_sid,
      totalPrice: cartPrice,
      pay: paySelect,
      user: writeUser,
    },
  }
  useEffect(() => {
    subscribe('paid', () => setPaid(true))
    if (paid) {
      setTimeout(() => {
        setStep(step + 1)
      }, 1200)
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
            setStep(step + 1)
          }}
        >
          下一步test
        </button>
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
            testOrder.order.orderId = new Date().getTime()
            testOrder.order.packages[0].products[0].name = `訂單編號：${testOrder.order.orderId}`
            const { data } = await axios.post(
              `http://localhost:3001/order/createOrder`,
              testOrder
            )
            if (data.returnCode === '0000') {
              setForOk({
                orderN: testOrder.order.orderId,
                family: familySelect,
                pay: paySelect,
                orderDay: dayjs(testOrder.order.orderId).format('YYYY-MM-DD'),
                totalPrice: cartPrice,
              })
              newLinePay.current = window.open(
                `${data?.info.paymentUrl.web}`,
                'hiking',
                'height=600,width=800'
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
