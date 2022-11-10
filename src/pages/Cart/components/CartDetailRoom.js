import React from 'react'
import styled from '../../../styles/cart-scss/cartDetail.module.scss'
function CartDetailRoom() {
  return (
    <>
      <div className={styled.dtWrap}>
        <div className={styled.outWrap}>
          {/* 之後map的卡片 */}
          <div className={styled.wrap}>
            <input type="checkbox" />
            <div className={styled.wrapRight}>
              <div className={styled.roomText}>
                <h2>南庄小美家民宿</h2>
                <p>地址：353苗栗縣南庄鄉蓬萊村42份7-6號</p>
                <p>預定日期：2022/10/31</p>
                <p>離開日期：2022/11/1</p>
                <p>人數：10人</p>
                <p>總金額：6050</p>
              </div>
              <div className={styled.roomImg}>
                <img
                  src="https://pix10.agoda.net/hotelImages/793414/-1/97f284bee5c75ff30e2658b179d5c9f1.jpg?ca=9&ce=1&s=1024x768"
                  alt=""
                />
              </div>
              <div className={styled.icon}>
                <div>
                  <i className="fa-solid fa-map-location-dot"></i>
                  <span>苗栗 南庄區</span>
                </div>
                <div>
                  <i className="fa-solid fa-mountain"></i>
                  <span>加里山</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styled.wrap}>
            <input type="checkbox" />
            <div className={styled.wrapRight}>
              <div className={styled.roomText}>
                <h2>南庄小美家民宿</h2>
                <p>地址：353苗栗縣南庄鄉蓬萊村42份7-6號</p>
                <p>預定日期：2022/10/31</p>
                <p>離開日期：2022/11/1</p>
                <p>人數：10人</p>
                <p>總金額：6050</p>
              </div>
              <div className={styled.roomImg}>
                <img
                  src="https://pix10.agoda.net/hotelImages/793414/-1/97f284bee5c75ff30e2658b179d5c9f1.jpg?ca=9&ce=1&s=1024x768"
                  alt=""
                />
              </div>
              <div className={styled.icon}>
                <div>
                  <i className="fa-solid fa-map-location-dot"></i>
                  <span>苗栗 南庄區</span>
                </div>
                <div>
                  <i className="fa-solid fa-mountain"></i>
                  <span>加里山</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartDetailRoom
