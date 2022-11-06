import styled from '../../styles/Cart.module.scss'
import CartTitle from './components/CartTitle'
import BuyCart from './components/BuyCart'
import OkOrder from './components/OkOrder'
function Cart() {
  return (
    <>
      <div className={styled.body}>
        <CartTitle />
        <OkOrder />
        {/* <BuyCart /> */}
      </div>
    </>
  )
}
export default Cart
