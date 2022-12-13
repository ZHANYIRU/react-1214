import { useRef, useState, useEffect, useContext } from 'react'
import styled from '../../../styles/cart-scss/Pay.module.scss'
import ProCartContext from '../../../contexts/ProCartContext'
import MemberContext from '../../../contexts/MemberContext'
import Card from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import axios from 'axios'
import dayjs from 'dayjs'
import './TapPay.scss'
function subscribe(eventName, listener) {
  document.addEventListener(eventName, listener)
}

function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, listener)
}
function getTPDirect() {
  return new Promise((resolve, reject) => {
    if (typeof window.TPDirect !== 'undefined') {
      return resolve(window.TPDirect)
    } else {
      const script = window.document.createElement('script')
      script.src = 'https://js.tappaysdk.com/sdk/tpdirect/v5.14.0'
      script.async = true
      script.onload = () => {
        if (typeof window.TPDirect !== 'undefined') {
          resolve(window.TPDirect)
        } else {
          reject(new Error('failed to load TapPay sdk'))
        }
      }
      script.onerror = reject
      window.document.body.appendChild(script)
    }
  })
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
  const num = useRef(null)
  const exp = useRef(null)
  const ccv = useRef(null)
  const paymentSetUp = () => {
    getTPDirect().then((TPDirect) => {
      console.log(TPDirect)
      TPDirect.setupSDK(
        11327,
        'app_whdEWBH8e8Lzy4N6BysVRRMILYORF6UxXbiOFsICkz0J9j1C0JUlCHv1tVJC',
        'sandbox'
      )
      TPDirect.card.setup({
        // Display ccv field
        fields: {
          number: {
            // element: '.form-control.card-number',
            element: num.current,
            placeholder: '4434 5678 1234 5678',
          },
          expirationDate: {
            // element: document.getElementById('tappay-expiration-date'),
            element: exp.current,
            placeholder: '12 / 22',
          },
          ccv: {
            // element: '.form-control.ccv',
            element: ccv.current,
            placeholder: 'ccv',
          },
        },
        styles: {
          input: {
            color: 'gray',
          },
          ':focus': {
            color: 'black',
          },
          '.valid': {
            color: 'black',
          },
        },
        // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
        isMaskCreditCardNumber: true,
        maskCreditCardNumberRange: {
          beginIndex: 6,
          endIndex: 11,
        },
      })
      TPDirect.card.onUpdate((update) => {
        console.log(update)
      })
    })
  }
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
  const { issuer, focused } = card
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
    getTPDirect().then((TPDirect) => {
      TPDirect.card.getPrime(async (result) => {
        console.log(result)
        const res = await axios.post(
          'http://localhost:3001/order/TapPay',
          result.card
        )
        if (res.data.status === 0) {
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
      })
    })
  }
  useEffect(() => {
    subscribe('paid', () => setPaid(true))
    if (paid) {
      setTimeout(() => {
        setStep(step + 1)
      }, 2500)
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
  useEffect(() => {
    paymentSetUp()
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
            number={4434567812345678}
            name={'範例信用卡'}
            expiry={'12/22'}
            cvc={123}
            focused={focused}
          />
          <form className={styled.form}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <div className="cardWrap">
                <label htmlFor="">信用卡卡號(支援的卡別)：</label>
                <div className="cardImgWrap">
                  <img src="../../img/visa.png" alt="" />
                  <img src="../../img/amex.png" alt="" />
                  <img src="../../img/mastercard.png" alt="" />
                  <img src="../../img/jcb.png" alt="" />
                  <img src="../../img/card4.png" alt="" />
                </div>
              </div>
              <div className="TapNum" ref={num}></div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="">到期日</label>
                <div className="TapExp" ref={exp}></div>
              </div>
              <div className="col-6">
                <label htmlFor="">安全碼</label>
                <div className="TapCcv" ref={ccv}></div>
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
