import React from 'react'
import styled from '../../../styles/cart-scss/cartDetail.module.scss'
function CartDetailRen() {
  return (
    <>
      <div className={`${styled.dtWrap} ${styled.ren}`}>
        <div className={styled.outWrap}>
          {/* 之後map的 */}
          <div className={styled.wrap}>
            <input type="checkbox" />
            <div className={styled.wrapRight} style={{ height: '250px' }}>
              <div className={styled.roomText}>
                <h2>NorthFace睡袋</h2>
                <p>尺寸：Ｍ</p>
                <p>租還日期：2022/12/31~2023/1/2</p>
                <p>租借－歸還：大安店-木柵店</p>
                <p>單價：3299</p>
                <div className={styled.qty}>
                  <button>－</button>
                  <input type="text" />
                  <button>＋</button>
                </div>
                <p>總金額：3450</p>
              </div>
              <div className={styled.roomImg}>
                <img src="https://vencedor888.com/upload/1000_86.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className={styled.wrap}>
            <input type="checkbox" />
            <div className={styled.wrapRight} style={{ height: '250px' }}>
              <div className={styled.roomText}>
                <h2>NorthFace睡袋</h2>
                <p>尺寸：Ｍ</p>
                <p>租還日期：2022/12/31~2023/1/2</p>
                <p>租借－歸還：大安店-木柵店</p>
                <p>單價：3299</p>
                <div className={styled.qty}>
                  <button>－</button>
                  <input type="text" />
                  <button>＋</button>
                </div>
                <p>總金額：3450</p>
              </div>
              <div className={styled.roomImg}>
                <img src="https://vencedor888.com/upload/1000_86.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className={styled.wrap}>
            <input type="checkbox" />
            <div className={styled.wrapRight} style={{ height: '250px' }}>
              <div className={styled.roomText}>
                <h2>NorthFace睡袋</h2>
                <p>尺寸：Ｍ</p>
                <p>租還日期：2022/12/31~2023/1/2</p>
                <p>租借－歸還：大安店-木柵店</p>
                <p>單價：3299</p>
                <div className={styled.qty}>
                  <button>－</button>
                  <input type="text" />
                  <button>＋</button>
                </div>
                <p>總金額：3450</p>
              </div>
              <div className={styled.roomImg}>
                <img src="https://vencedor888.com/upload/1000_86.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartDetailRen
