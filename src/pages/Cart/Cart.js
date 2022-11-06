import styled from '../../styles/Cart.module.scss'
import CartTitle from './components/CartTitle'
import BuyCart from './components/BuyCart'
function Cart() {
  return (
    <>
      <div className={styled.body}>
        <CartTitle />
        {/* <BuyCart /> */}
      </div>
    </>
  )
}
export default Cart
