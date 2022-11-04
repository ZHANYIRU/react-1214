import Navbar from '../compoent/NavBar/Navbar'
import styled from '../styles/Cart.module.scss'
function Cart() {
  return (
    <>
      <Navbar />
      <div className={styled.body}>
        <div className={styled.cartTitle}>
          <div className={styled.one}>1</div>
          <div className={styled.two}>2</div>
          <div className={styled.three}>3</div>
        </div>
        <div className={styled.buyCard}></div>
      </div>
    </>
  )
}
export default Cart
