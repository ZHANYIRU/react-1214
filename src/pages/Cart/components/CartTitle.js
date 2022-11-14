import styled from '../../../styles/cart-scss/Cart.module.scss'
function CartTitle({ maxStep, step }) {
  return (
    <>
      <div className={styled.cardWrap}>
        <div className={styled.cartTitle}>
          {Array(maxStep)
            .fill(1)
            .map((v, i) => {
              return (
                <div className={step >= i + 1 ? styled.active : ''} key={i + 1}>
                  {i + 1}
                </div>
              )
            })}
        </div>
        <div className={styled.text}>
          <p>購物清單</p>
          <p>填寫資料</p>
          <p>付款頁面</p>
          <p>完成訂單</p>
        </div>
      </div>
    </>
  )
}

export default CartTitle
