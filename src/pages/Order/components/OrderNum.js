import React from 'react'
import { useState } from 'react'
import styled from '../../../styles/order-scss/OrderNum.module.scss'
function OrderNum() {
  const [open, setOpen] = useState(false)
  const openOrder = (e) => {
    console.log(e.currentTarget)
    setOpen(!open)
  }
  return (
    <>
      <div className={styled.numWrap}>
        <input type="checkbox" id="order" />
        <label className={styled.orderNum} onClick={openOrder} htmlFor="order">
          <p> 訂單編號：0000000000</p>
          <p>金額：9487</p>
          <i className="fa-solid fa-chevron-down"></i>
        </label>
        <div
          className={
            open ? `${styled.contentWrapOpen}` : `${styled.contentWrap}`
          }
        >
          <div className={styled.proContentTitle}>
            <p>商品</p>
            <p>單價</p>
            <p>數量</p>
            <p>金額</p>
          </div>
          <div className={styled.content}>
            <div className={styled.contentDe}>
              <div className={styled.imgWrap}>
                <img
                  src="https://cdn2.ettoday.net/images/4778/d4778980.jpg"
                  alt=""
                />
              </div>
              <p>
                Arcteryx 始祖鳥 Beta LT 女款 Gore Tex登山雨衣/風雨衣 29458
                鐵克諾紅 Techno
              </p>
              <p>600</p>
              <p>2</p>
              <p>1200</p>
            </div>
            <button>給予評價</button>
          </div>
          <div className={styled.content}>
            <div className={styled.contentDe}>
              <div className={styled.imgWrap}>
                <img
                  src="https://cdn2.ettoday.net/images/4778/d4778980.jpg"
                  alt=""
                />
              </div>
              <p>
                Arcteryx 始祖鳥 Beta LT 女款 Gore Tex登山雨衣/風雨衣 29458
                鐵克諾紅 Techno
              </p>
              <p>600</p>
              <p>2</p>
              <p>1200</p>
            </div>
            <button>給予評價</button>
          </div>
        </div>
        {/* <input type="checkbox" id="order1" />
        <label
          className={styled.orederNum}
          onClick={openOrder}
          htmlFor="order1"
        >
          <p> 訂單編號：11111111</p>
        </label>
        <div className={open ? `${styled.contentOpen}` : `${styled.content}`}>
          <div className={styled.div1}>12121</div>
          <div className={styled.div1}>121212</div>
          <div className={styled.div1}>21212</div>
          <div className={styled.div1}>21212</div>
        </div> */}
      </div>
      {/* <div className="tabs">
        <div className="tab">
          <input type="checkbox" id="chck1" />
          <label className="tab-label" for="chck1">
            Item 1
          </label>
          <div className="tab-content">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum,
            reiciendis!
          </div>
        </div>
      </div> */}
    </>
  )
}

export default OrderNum
