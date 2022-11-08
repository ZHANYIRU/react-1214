import styled from '../../styles/Cart.module.scss'
import CartTitle from './components/CartTitle'
import BuyCart from './components/BuyCart'
import CartDetail from './child-pages/CartDetail'
import WriteData from './child-pages/WriteData'
import OkOrder from './child-pages/OkOrder'
import { useState } from 'react'
function Cart() {
  const maxStep = 3
  const [step, setStep] = useState(1)
  //動態元件
  const components = [CartDetail, WriteData, OkOrder]
  const NowComponents = components[step - 1]
  return (
    <>
      <div className={styled.body}>
        <CartTitle />
        <NowComponents />
        {/* <CartDetail /> */}
        {/* <OkOrder /> */}
        {/* <BuyCart /> */}
        <div className={styled.btn}>
          <button
            onClick={() => {
              if (step >= 1) setStep(step - 1)
            }}
            disabled={step === 1}
          >
            上一步
          </button>
          <button
            onClick={() => {
              if (step < maxStep) setStep(step + 1)
            }}
            disabled={step === maxStep}
          >
            下一步
          </button>
        </div>
      </div>
    </>
  )
}
export default Cart
