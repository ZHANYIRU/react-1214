import styled from '../../styles/cart-scss/Cart.module.scss'
import CartTitle from './components/CartTitle'
import BuyCart from './components/BuyCart'
import CartDetail from './child-pages/CartDetail'
import WritePage from './child-pages/WritePage'
import OkOrder from './child-pages/OkOrder'
import { useState, useRef, useEffect } from 'react'
function Cart() {
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
    window.addEventListener('scroll', scroll)
    return () => {
      window.removeEventListener('scroll', scroll)
    }
  }, [])
  //最大流程數
  const maxStep = 4
  //流程的狀態
  const [step, setStep] = useState(1)
  //動態元件
  const components = [CartDetail, WritePage, OkOrder]
  const NowComponents = components[step - 1]
  return (
    <>
      <div className={styled.body} ref={bodyHeight}>
        <CartTitle step={step} maxStep={maxStep} />
        <NowComponents step={step} setStep={setStep} />
        <BuyCart step={step} setStep={setStep} buyBar={buyBar} />
      </div>
    </>
  )
}
export default Cart
