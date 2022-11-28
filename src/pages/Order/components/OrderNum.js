import styled from '../../../styles/order-scss/OrderNum.module.scss'
import dayjs from 'dayjs'
import { useState } from 'react'
function OrderNum({ momOrder, open, setOpen }) {
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
    const value = +e.target.value
    if (!open.includes(value)) {
      const newOpen = [...open, value]
      setOpen(newOpen)
    }
  }
  const closeWrap = (sid) => {
    const newClose = open.filter((el2) => el2 !== sid)
    setOpen(newClose)
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
                <div className={styled.camera}>
                  <div
                    className={styled.recipientWrap}
                    style={{
                      transform: open.includes(el.sid) && 'rotateX(180deg)',
                    }}
                  >
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
                      <i className="fa-solid fa-chevron-up"></i>
                    </label>
                    <div
                      className={styled.recipient}
                      onClick={() => {
                        closeWrap(el.sid)
                      }}
                    >
                      <p>收件人：{el.recipient}</p>
                      <p>地址：{el.recipient_address}</p>
                      <p>電話：{el.recipient_phone}</p>
                      <p>付款方式：{el.payment}</p>
                      <p>備註：{el.remark}</p>
                    </div>
                  </div>
                </div>
                <div
                  className={styled.contentWrap}
                  style={{
                    maxHeight: open.includes(el.sid) && '50vh',
                    overflow: open.includes(el.sid) && 'auto',
                    paddingTop: open.includes(el.sid) && '10px',
                  }}
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
                            key={`pro${el2.sid}`}
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
                      roomRows.map((el3, i3) => {
                        const ds = dayjs(el3.start)
                        const de = dayjs(el3.end)
                        return el.order_num === el3.order_num ? (
                          <div
                            className={styled.roomContent}
                            key={`room${el3.sid}`}
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
                      camRows.map((el4, i4) => {
                        const ds = dayjs(el4.date_start)
                        const de = dayjs(el4.date_end)
                        return (
                          el.order_num === el4.order_num && (
                            <div
                              className={styled.campContent}
                              key={`cam${el4.sid}`}
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
                    {renRows &&
                      renRows.findIndex(
                        (ren) => ren.order_num === el.order_num
                      ) !== -1 && (
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
                      )}
                    {renRows &&
                      renRows.map((el5, i5) => {
                        return (
                          el.order_num === el5.order_num && (
                            <div
                              className={styled.renContent}
                              key={`ren${el5.sid}`}
                            >
                              <div className={styled.contentDe}>
                                <div className={styled.imgWrap}>
                                  <img
                                    src="https://cdn2.ettoday.net/images/4778/d4778980.jpg"
                                    alt=""
                                  />
                                </div>
                                <p>{el5.rental_name}</p>
                                <p>
                                  {el5.store_out}
                                  <i className="fa-solid fa-arrow-right"></i>
                                  {el5.store_back}
                                </p>
                                <p>
                                  {el5.out_date}
                                  <i className="fa-solid fa-arrow-down"></i>
                                  {el5.back_date}
                                </p>
                                <p>{moneyFormat(el5.rental_price)}</p>
                                <p>運費</p>
                                <p>{el5.qty}</p>
                                <p>{moneyFormat(el5.total)}</p>
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
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default OrderNum
