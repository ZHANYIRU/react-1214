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
  const { cartItem } = useContext(ProCartContext)
  //查看body高度
  const bodyHeight = useRef(null)
  //給buyBar的判斷
  const [buyBar, setBuyBar] = useState(false)

  const scroll = () => {
    const windowH = window.innerHeight
    const bodyH = bodyHeight.current.clientHeight
    const windowScrollY = window.scrollY
    if (windowScrollY + windowH > bodyH) {
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
  //最大流程數
  const maxStep = 4
  //流程的狀態
  const [step, setStep] = useState(1)
  //動態元件
  const components = [CartDetail, WritePage, Pay, OkOrder]
  const NowComponents = components[step - 1]
  return (
    <>
      {cartItem ? (
        <div className={styled.body} ref={bodyHeight}>
          <CartTitle step={step} maxStep={maxStep} />
          <NowComponents step={step} setStep={setStep} />
          <BuyCart step={step} setStep={setStep} buyBar={buyBar} />
        </div>
      ) : (
        <div className={styled.container}>
          <div className={styled.noCart}>
            <i className="fa-solid fa-cart-arrow-down"></i>
            <i className="fa-regular fa-hand-point-down"></i>
            <p>您的購物車還沒有商品，趕緊去逛逛吧！！</p>
          </div>
        </div>
      )}
    </>
  )
}
export default Cart
