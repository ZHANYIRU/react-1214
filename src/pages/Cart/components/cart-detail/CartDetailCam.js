import React from 'react'
import styled from '../../../../styles/cart-scss/cartDetail.module.scss'
function CartDetailCam() {
  return (
    <>
      <div className={`${styled.dtWrap} ${styled.cam}`}>
        <div className={styled.outWrap}>
          {/* 之後map的 */}
          <div className={styled.wrap}>
            <input type="checkbox" />
            <div className={styled.wrapRight}>
              <div className={styled.roomText}>
                <h2>眠月線-失落的森林</h2>
                <p>集合地址：353苗栗縣南庄鄉蓬萊村42份7-6號</p>
                <p>預定日期：2022/10/31</p>
                <p>3天2夜</p>
                <p>總金額：3450</p>
              </div>
              <div className={styled.roomImg}>
                <img
                  src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
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
            <i class="fa-regular fa-trash-can"></i>
          </div>
          <div className={styled.wrap}>
            <input type="checkbox" />
            <div className={styled.wrapRight}>
              <div className={styled.roomText}>
                <h2>眠月線-失落的森林</h2>
                <p>集合地址：353苗栗縣南庄鄉蓬萊村42份7-6號</p>
                <p>預定日期：2022/10/31</p>
                <p>3天2夜</p>
                <p>總金額：3450</p>
              </div>
              <div className={styled.roomImg}>
                <img
                  src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
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
            <i class="fa-regular fa-trash-can"></i>
          </div>
          <div className={styled.wrap}>
            <input type="checkbox" />
            <div className={styled.wrapRight}>
              <div className={styled.roomText}>
                <h2>眠月線-失落的森林</h2>
                <p>集合地址：353苗栗縣南庄鄉蓬萊村42份7-6號</p>
                <p>預定日期：2022/10/31</p>
                <p>3天2夜</p>
                <p>總金額：3450</p>
              </div>
              <div className={styled.roomImg}>
                <img
                  src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
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
            <i class="fa-regular fa-trash-can"></i>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartDetailCam
