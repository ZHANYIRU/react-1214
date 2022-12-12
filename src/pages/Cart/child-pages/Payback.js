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
  const { number, name, expiry, cvc, issuer, focused } = card
  const handleInputChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value })
  }
  const handleInputFocus = (e) => {
    e.preventDefault()
    setCard({ ...card, focused: e.target.name })
  }
  const { data } = useContext(MemberContext)
  const { pro, ren, room, camp, cartPrice, moneyFormat } =
    useContext(ProCartContext)
  //用來開啟新視窗
  const newLinePay = useRef(null)
  const [paid, setPaid] = useState(false)
  const [cardAni, setCardAni] = useState(false)
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
  const cardPay = async (e) => {
    e.preventDefault()
    setCardAni(true)
    let cardOrder = testOrder.totalOrder
    cardOrder.orderId = new Date().getTime()
    const { data } = await axios.post(
      'http://localhost:3001/order/cardPay',
      cardOrder
    )
    if (data.affectedRows) {
      setForOk({
        orderN: cardOrder.orderId,
        family: familySelect,
        pay: paySelect,
        orderDay: dayjs(cardOrder.orderId).format('YYYY-MM-DD'),
        totalPrice: cartPrice - coupon,
      })
      setTimeout(() => {
        setCardAni(false)
        setStep(step + 1)
      }, 1500)
    }
  }
  useEffect(() => {
    subscribe('paid', () => setPaid(true))
    if (paid) {
      setTimeout(() => {
        setStep(step + 1)
      }, 3200)
    }
    return () => {
      unsubscribe('paid')
    }
  }, [paid])
  //進這元件的時候，滾動到視窗最上面
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [])
  return (
    <>
      {cardAni && (
        <div className={styled.payAnimation}>
          <p>付款中，請稍後</p>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
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
              <button
                className={styled.btn}
                onClick={(e) => {
                  cardPay(e)
                }}
              >
                付款
              </button>
              <button
                className={styled.btn2}
                onClick={(e) => {
                  e.preventDefault()
                  setCard({
                    number: '4963547812985476',
                    name: 'ZHANYIRU',
                    expiry: '27/12',
                  })
                }}
              >
                付款
              </button>
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
