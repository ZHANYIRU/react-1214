import React from 'react'
import styled from '../../../styles/cart-scss/cartDetail.module.scss'
function CartDetailPro() {
  return (
    <>
      <div className={`${styled.dtWrap} ${styled.pro}`}>
        <div className={styled.outWrap}>
          {/* 之後map的 */}
          <div className={styled.wrap}>
            <input type="checkbox" />
            <div className={styled.wrapRight}>
              <div className={styled.roomText}>
                <h2>NorthFace外套</h2>
                <p>尺寸：Ｍ</p>
                <p>單價：3299</p>
                <div className={styled.qty}>
                  <button>－</button>
                  <input type="text" />
                  <button>＋</button>
                </div>
                <p>總金額：3450</p>
              </div>
              <div className={styled.roomImg}>
                <img
                  src="https://cdn2.ettoday.net/images/4778/d4778980.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className={styled.wrap}>
            <input type="checkbox" />
            <div className={styled.wrapRight}>
              <div className={styled.roomText}>
                <h2>NorthFace外套</h2>
                <p>尺寸：Ｍ</p>
                <p>單價：3299</p>
                <div className={styled.qty}>
                  <button>－</button>
                  <input type="text" />
                  <button>＋</button>
                </div>
                <p>總金額：3450</p>
              </div>
              <div className={styled.roomImg}>
                <img
                  src="https://cdn2.ettoday.net/images/4778/d4778980.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className={styled.wrap}>
            <input type="checkbox" />
            <div className={styled.wrapRight}>
              <div className={styled.roomText}>
                <h2>NorthFace外套</h2>
                <p>尺寸：Ｍ</p>
                <p>單價：3299</p>
                <div className={styled.qty}>
                  <button>－</button>
                  <input type="text" />
                  <button>＋</button>
                </div>
                <p>總金額：3450</p>
              </div>
              <div className={styled.roomImg}>
                <img
                  src="https://cdn2.ettoday.net/images/4778/d4778980.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartDetailPro
