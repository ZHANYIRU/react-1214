import { useRef, useState, useEffect, useContext } from 'react'
import styled from '../../../styles/cart-scss/Pay.module.scss'
import ProCartContext from '../../../contexts/ProCartContext'
import MemberContext from '../../../contexts/MemberContext'
import Card from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import axios from 'axios'
import dayjs from 'dayjs'
function subscribe(eventName, listener) {
  document.addEventListener(eventName, listener)
}

function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, listener)
}
function Pay({
  paySelect,
  familySelect,
  step,
  setStep,
  setForOk,
  useCoupon,
  writeUser,
}) {
  //信用卡套件
  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
  })
  const { number, name, expiry, cvc, issuer, focused, formData } = card
  const handleInputChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value })
  }
  const handleInputFocus = (e) => {
    setCard({ ...card, focused: e.target.name })
  }
  const { data } = useContext(MemberContext)
  const { pro, ren, room, camp, cartPrice, moneyFormat } =
    useContext(ProCartContext)
  //用來開啟新視窗
  const newLinePay = useRef(null)
  const [paid, setPaid] = useState(false)
  //優惠卷的金額
  let coupon = 0
  if (useCoupon === 'Hiking837') {
    coupon = 100
  }
  if (useCoupon === 'Hero837') {
    coupon = 80
  }
  if (useCoupon === 'Happy837') {
    coupon = 50
  }
  const testOrder = {
    order: {
      amount: cartPrice - coupon,
      currency: 'TWD',
      packages: [
        {
          id: 'products_1',
          amount: cartPrice - coupon,
          products: [
            {
              name: 'hiking棒棒',
              quantity: 1,
              price: cartPrice - coupon,
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
      totalPrice: cartPrice - coupon,
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
            setStep(step - 1)
          }}
        >
          重新選擇付款方式
        </button>
      </div>
      {paySelect === '信用卡' && (
        <div className={styled.payCard}>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
          />
          <form className={styled.form}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                maxLength={16}
                value={card.number}
                onChange={(e) => {
                  handleInputChange(e)
                }}
                onFocus={(e) => {
                  handleInputFocus(e)
                }}
              />
              <small>E.g.: 49..., 51..., 36..., 37...</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={card.name}
                className="form-control"
                placeholder="Name"
                required
                onChange={(e) => {
                  handleInputChange(e)
                }}
                onFocus={(e) => {
                  handleInputFocus(e)
                }}
                style={{ marginBottom: '20px' }}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  value={card.expiry}
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={(e) => {
                    handleInputChange(e)
                  }}
                  onFocus={(e) => {
                    handleInputFocus(e)
                  }}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  value={card.cvc}
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  maxLength={3}
                  onChange={(e) => {
                    handleInputChange(e)
                  }}
                  onFocus={(e) => {
                    handleInputFocus(e)
                  }}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="form-actions" style={{ marginTop: '20px' }}>
              <button className="btn btn-primary btn-block">PAY</button>
            </div>
          </form>
        </div>
      )}
      {paySelect === 'LINE PAY' && (
        <div className={styled.pay}>
          <p>
            總金額:{moneyFormat(cartPrice - coupon)}
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
                  totalPrice: cartPrice - coupon,
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
      )}
    </>
  )
}

export default Pay
