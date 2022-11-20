import React from 'react'
import { useState } from 'react'
import styled from '../../../styles/order-scss/OrderNum.module.scss'
import dayjs from 'dayjs'
function OrderNum({ momOrder, open, setOpen }) {
  // order範本
  // "sid": 59,
  // "order_num": "20220923025717",
  // "member_sid": 644,
  // "total": "2200",
  // "created_time": "2022-09-23T06:57:17.000Z"
  const { rows, proRows, roomRows, renRows, camRows } = momOrder
  //給lightBox
  const [lightOpen, setLightOpen] = useState(false)
  //格式化金額
  const moneyFormat = (price) => {
    let a = Number(price)
    let b = a.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })
    let c = b.split('.')
    return c[0]
  }
  //打開子訂單
  const openWrap = (e) => {
    const value = Number(e.target.value)
    console.log(value)
    if (open.includes(value)) {
      const newOpen = open.filter((el2) => el2 !== value)
      setOpen(newOpen)
    } else {
      const newOpen = [...open, value]
      setOpen(newOpen)
    }
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
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
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
        {rows &&
          rows.map((el, i) => {
            return (
              <div key={el.sid}>
                <input
                  type="checkbox"
                  value={`${el.sid}`}
                  id={`${el.sid}`}
                  onClick={(e) => {
                    openWrap(e)
                  }}
                />
                <label className={styled.orderNum} htmlFor={`${el.sid}`}>
                  <p> 訂單編號：{el.order_num}</p>
                  <p>金額：{moneyFormat(el.total)}</p>
                  <i className="fa-solid fa-chevron-down"></i>
                </label>
                <div
                  className={
                    open.includes(el.sid)
                      ? `${styled.contentWrapOpen}`
                      : `${styled.contentWrap}`
                  }
                >
                  <div className={styled.pro}>
                    {proRows &&
                      proRows.findIndex(
                        (pro) => pro.order_num === el.order_num
                      ) !== -1 && (
                        <div className={styled.proContentTitle}>
                          <p>商品</p>
                          <p>單價</p>
                          <p>數量</p>
                          <p>金額</p>
                        </div>
                      )}
                    {proRows &&
                      proRows.map((el2, i2) => {
                        return el.order_num === el2.order_num ? (
                          <div
                            className={styled.proContent}
                            key={el2.product_sid}
                          >
                            <div className={styled.contentDe}>
                              <div className={styled.imgWrap}>
                                <img
                                  src="https://cdn2.ettoday.net/images/4778/d4778980.jpg"
                                  alt=""
                                />
                              </div>
                              <p>{el2.product_name}</p>
                              <p>{moneyFormat(el2.product_price)}</p>
                              <p>{el2.qty}</p>
                              <p>{moneyFormat(el2.total)}</p>
                            </div>
                            <button
                              onClick={() => {
                                setLightOpen(!lightOpen)
                              }}
                            >
                              給予評價
                            </button>
                          </div>
                        ) : (
                          ''
                        )
                      })}
                  </div>
                  <div className={styled.room}>
                    {roomRows &&
                      roomRows.findIndex(
                        (room) => room.order_num === el.order_num
                      ) !== -1 && (
                        <div className={styled.roomContentTitle}>
                          <p>房間</p>
                          <p>入住日期</p>
                          <p>退房日期</p>
                          <p>單價</p>
                          <p>天數</p>
                          <p>金額</p>
                        </div>
                      )}
                    {roomRows &&
                      roomRows.map((el3, i) => {
                        const ds = dayjs(el3.start)
                        const de = dayjs(el3.end)
                        return el.order_num === el3.order_num ? (
                          <div
                            className={styled.roomContent}
                            key={el3.room_sid}
                          >
                            <div className={styled.contentDe}>
                              <div className={styled.imgWrap}>
                                <img
                                  src="https://cdn2.ettoday.net/images/4778/d4778980.jpg"
                                  alt=""
                                />
                              </div>
                              <p>
                                <span>{el3.room_name}</span>
                                <br />
                                <br />
                                <span>地址：{el3.room_details}</span>
                              </p>
                              <p>{ds.isValid() && ds.format('YYYY-MM-DD')}</p>
                              <p>{de.isValid() && de.format('YYYY-MM-DD')}</p>
                              <p>{moneyFormat(el3.room_price)}</p>
                              <p>{el3.qty}</p>
                              <p>{moneyFormat(el3.total)}</p>
                            </div>
                            <button
                              onClick={() => {
                                setLightOpen(!lightOpen)
                              }}
                            >
                              給予評價
                            </button>
                          </div>
                        ) : (
                          ''
                        )
                      })}
                  </div>
                  <div className={styled.camp}>
                    {camRows &&
                      camRows.findIndex(
                        (cam) => cam.order_num === el.order_num
                      ) !== -1 && (
                        <div className={styled.campContentTitle}>
                          <p>活動</p>
                          <p>開始日期</p>
                          <p>結束日期</p>
                          <p>單價</p>
                          <p>人數</p>
                          <p>金額</p>
                        </div>
                      )}
                    {camRows &&
                      camRows.map((el4, i) => {
                        const ds = dayjs(el4.date_start)
                        const de = dayjs(el4.date_end)
                        return (
                          el.order_num === el4.order_num && (
                            <div
                              className={styled.campContent}
                              key={el4.campaign_sid}
                            >
                              <div className={styled.contentDe}>
                                <div className={styled.imgWrap}>
                                  <img
                                    src="https://cdn2.ettoday.net/images/4778/d4778980.jpg"
                                    alt=""
                                  />
                                </div>
                                <p>
                                  <span>{el4.name}</span>
                                  <br />
                                  <br />
                                  <span>地址：板橋</span>
                                </p>
                                <p>{ds.isValid() && ds.format('YYYY-MM-DD')}</p>
                                <p>{de.isValid() && de.format('YYYY-MM-DD')}</p>
                                <p>{moneyFormat(el4.price)}</p>
                                <p>{el4.people}</p>
                                <p>{moneyFormat(el4.total)}</p>
                              </div>
                              <button
                                onClick={() => {
                                  setLightOpen(!lightOpen)
                                }}
                              >
                                給予評價
                              </button>
                            </div>
                          )
                        )
                      })}
                  </div>
                  <div className={styled.ren}>
                    <div className={styled.renContentTitle}>
                      <p>租借商品</p>
                      <p>
                        租<i className="fa-solid fa-arrow-right"></i>還
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
                          Arcteryx 始祖鳥 Beta LT 女款 Gore Tex登山雨衣/風雨衣
                          29458 鐵克諾紅 Techno
                        </p>
                        <p>
                          台北<i className="fa-solid fa-arrow-right"></i>高雄
                        </p>
                        <p>
                          2022/10/11<i className="fa-solid fa-arrow-down"></i>
                          2022/10/12
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
            )
          })}
      </div>
    </>
  )
}

export default OrderNum
