import { useState, useContext } from 'react'
import Swal from 'sweetalert2'
import ProCartContext from '../../../contexts/ProCartContext'
import MemberContext from '../../../contexts/MemberContext'
import styled from '../../../styles/cart-scss/BuyCart.module.scss'
function BuyCart({ step, setStep, buyBar }) {
  const { cartItem, resetCart, cartPrice, moneyFormat } =
    useContext(ProCartContext)
  const { auth } = useContext(MemberContext)
  const [check, setCheck] = useState(false)
  if (step === 1) {
    return (
      <>
        <div
          className={styled.buyCart}
          style={{ position: buyBar && 'relative' }}
        >
          <div className={styled.wrap}>
            {/* <div>
              <input
                type="checkbox"
                id="check"
                checked={check}
                onChange={(e) => {
                  setCheck(e.target.checked)
                }}
              />
              <label htmlFor="check">全選</label>
            </div> */}
            <p>總訂購數量：{cartItem ? cartItem : 0}</p>
            <div className={styled.price}>
              <span>總金額：</span>
              <p>{cartPrice ? moneyFormat(cartPrice) : 0}</p>
            </div>
            <button onClick={resetCart}>清空購物車</button>
            {auth && (
              <button
                onClick={() => {
                  Swal.fire({
                    title: '確認結帳?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '確定!',
                    cancelButtonText: '取消',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setStep(step + 1)
                    }
                  })
                }}
              >
                買單去
              </button>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default BuyCart
