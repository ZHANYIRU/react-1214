import React from 'react'
import { useState } from 'react'
import Evaluation from './Evaluation'
import styled from '../../../styles/order-scss/OrderNum.module.scss'
function OrderNum() {
  //給lightBox
  const [lightOpen, setLightOpen] = useState(false)
  const [orderopen, setOrderOpen] = useState(false)
  const openOrder = (e) => {
    setOrderOpen(!orderopen)
  }
  return (
    <>
      {lightOpen && (
        <div
          className={styled.lightBgc}
          onClick={(e) => {
            setLightOpen(!lightOpen)
          }}
        >
          <div
            className={styled.lightbox}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className={styled.lightName}>
              <div className={styled.lightImg}>
                <img
                  src="https://assets.juksy.com/files/articles/112793/800x_100_w-61af971ed4cc6.jpg"
                  alt=""
                />
              </div>
              <p>
                韓國超級巨星IUUUU韓國超級巨星IUUUU韓國超級巨星IUUUU韓國超級巨星IUUUU韓國超級巨星IUUUU韓國超級巨星IUUUU
              </p>
            </div>
            <div className={styled.star}>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </div>
            <textarea rows="6" placeholder="寫點甚麼...." />
            <button
              onClick={(e) => {
                setLightOpen(!lightOpen)
              }}
            >
              確認
            </button>
          </div>
        </div>
      )}

      <div className={styled.numWrap}>
        <input type="checkbox" id="order" />
        <label className={styled.orderNum} onClick={openOrder} htmlFor="order">
          <p> 訂單編號：0000000000</p>
          <p>金額：9487</p>
          <i className="fa-solid fa-chevron-down"></i>
        </label>
        <div
          className={
            orderopen ? `${styled.contentWrapOpen}` : `${styled.contentWrap}`
          }
        >
          <div className={styled.pro}>
            <div className={styled.proContentTitle}>
              <p>商品</p>
              <p>單價</p>
              <p>數量</p>
              <p>金額</p>
            </div>
            <div className={styled.proContent}>
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
              <button
                onClick={() => {
                  setLightOpen(!lightOpen)
                }}
              >
                給予評價
              </button>
            </div>
          </div>
          <div className={styled.room}>
            <div className={styled.roomContentTitle}>
              <p>房間</p>
              <p>入住日期</p>
              <p>退房日期</p>
              <p>單價</p>
              <p>天數</p>
              <p>金額</p>
            </div>
            <div className={styled.roomContent}>
              <div className={styled.contentDe}>
                <div className={styled.imgWrap}>
                  <img
                    src="https://cdn2.ettoday.net/images/4778/d4778980.jpg"
                    alt=""
                  />
                </div>
                <p>
                  <span>南庄小美家民宿</span>
                  <br />
                  <br />
                  <span>地址：353苗栗縣南庄鄉蓬萊村42份7-6號</span>
                </p>
                <p>2022/10/10</p>
                <p>2022/10/11</p>
                <p>600</p>
                <p>2</p>
                <p>1200</p>
              </div>
              <button
                onClick={() => {
                  setLightOpen(!lightOpen)
                }}
              >
                給予評價
              </button>
            </div>
          </div>
          <div className={styled.camp}>
            <div className={styled.campContentTitle}>
              <p>活動</p>
              <p>開始日期</p>
              <p>結束日期</p>
              <p>單價</p>
              <p>人數</p>
              <p>金額</p>
            </div>
            <div className={styled.campContent}>
              <div className={styled.contentDe}>
                <div className={styled.imgWrap}>
                  <img
                    src="https://cdn2.ettoday.net/images/4778/d4778980.jpg"
                    alt=""
                  />
                </div>
                <p>
                  <span>耶誕城</span>
                  <br />
                  <br />
                  <span>地址：板橋</span>
                </p>
                <p>2022/10/10</p>
                <p>2022/10/11</p>
                <p>600</p>
                <p>2</p>
                <p>1200</p>
              </div>
              <button
                onClick={() => {
                  setLightOpen(!lightOpen)
                }}
              >
                給予評價
              </button>
            </div>
          </div>
          <div className={styled.ren}>
            <div className={styled.renContentTitle}>
              <p>租借商品</p>
              <p>
                租<i class="fa-solid fa-arrow-right"></i>還
              </p>
              <p>日期</p>
              <p>單價</p>
              <p>運費</p>
              <p>數量</p>
              <p>金額</p>
            </div>
            <div className={styled.renContent}>
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
                <p>
                  台北<i class="fa-solid fa-arrow-right"></i>高雄
                </p>
                <p>
                  2022/10/11<i class="fa-solid fa-arrow-down"></i>2022/10/12
                </p>
                <p>600</p>
                <p>600</p>
                <p>2</p>
                <p>2400</p>
              </div>
              <button
                onClick={() => {
                  setLightOpen(!lightOpen)
                }}
              >
                給予評價
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderNum
