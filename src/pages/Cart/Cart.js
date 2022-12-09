import styled from '../../styles/cart-scss/Cart.module.scss'
import CartTitle from './components/CartTitle'
import BuyCart from './components/BuyCart'
import CartDetail from './child-pages/CartDetail'
import WritePage from './child-pages/WritePage'
import Pay from './child-pages/Pay'
import OkOrder from './child-pages/OkOrder'
import ProCartContext from '../../contexts/ProCartContext'
import { useState, useRef, useEffect, useContext } from 'react'
function Cart() {
  //勾選自動帶入會員資料
  const [same, setSame] = useState(false)
  //填寫(收件人)
  const [writeUser, setWriteUser] = useState({
    name: '',
    mobile: 0,
    address: '',
    email: '',
    text: '',
  })
  //寄送方式
  const [familySelect, setFamilySelect] = useState('')
  //付款方式
  const [paySelect, setPaySelect] = useState('')
  //優惠卷
  const [useCoupon, setUseCoupon] = useState('')
  //for完成訂單的顯示
  const [forOk, setForOk] = useState({
    orderN: 0,
    family: '',
    pay: '',
    orderDay: '',
    totalPrice: 0,
  })
  //商品數量(項目)
  const { cartItem } = useContext(ProCartContext)
  //最大流程數
  const maxStep = 4
  //流程的狀態
  const [step, setStep] = useState(1)
  //動態元件
  const components = [CartDetail, WritePage, Pay, OkOrder]
  const NowComponents = components[step - 1]
  //查看body高度
  const bodyHeight = useRef(null)
  //給buyBar的判斷
  const [buyBar, setBuyBar] = useState(false)
  const scroll = () => {
    const windowH = window.innerHeight
    const bodyH = bodyHeight.current.clientHeight
    const windowScrollY = window.scrollY
    if (windowScrollY + windowH * 0.8 > bodyH) {
      setBuyBar(true)
    } else {
      setBuyBar(false)
    }
  }
  useEffect(() => {
    if (cartItem !== 0) {
      window.addEventListener('scroll', scroll)
      return () => {
        window.removeEventListener('scroll', scroll)
      }
    }
  }, [cartItem])
  return (
    <>
      {step === 4 || cartItem !== 0 ? (
        <>
          <div className={styled.empty1}></div>
          <div className={styled.body} ref={bodyHeight}>
            <CartTitle step={step} maxStep={maxStep} />
            <NowComponents
              step={step}
              setStep={setStep}
              forOk={forOk}
              setForOk={setForOk}
              familySelect={familySelect}
              setFamilySelect={setFamilySelect}
              paySelect={paySelect}
              setPaySelect={setPaySelect}
              useCoupon={useCoupon}
              setUseCoupon={setUseCoupon}
              same={same}
              setSame={setSame}
              writeUser={writeUser}
              setWriteUser={setWriteUser}
            />
          </div>
          <BuyCart step={step} setStep={setStep} buyBar={buyBar} />
        </>
      ) : (
        ''
      )}
      {cartItem === 0 && step !== 4 && (
        <>
          <div className={styled.empty}></div>
          <div className={styled.noCart}>
            <i className="fa-solid fa-cart-arrow-down"></i>
            {/* <i className="fa-regular fa-hand-point-down"></i> */}
            <p>您的購物車還沒有商品，趕緊去逛逛吧！！</p>
          </div>
        </>
      )}
    </>
  )
}
export default Cart
