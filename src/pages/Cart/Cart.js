import styled from '../../styles/cart-scss/Cart.module.scss'
import CartTitle from './components/CartTitle'
import BuyCart from './components/BuyCart'
import CartDetail from './child-pages/CartDetail'
import WriteData from './child-pages/WriteData'
import OkOrder from './child-pages/OkOrder'
import { useState } from 'react'
function Cart() {
  //最大流程數
  const maxStep = 3
  //for流程
  const [step, setStep] = useState(1)
  //動態元件
  const components = [CartDetail, WriteData, OkOrder]
  const NowComponents = components[step - 1]
  return (
    <>
      <div className={styled.body}>
        <CartTitle step={step} maxStep={maxStep} />
        <NowComponents step={step} setStep={setStep} />
        <BuyCart step={step} setStep={setStep} />
      </div>
    </>
  )
}
export default Cart
