import styled from '../../../styles/order-scss/OrderNum.module.scss'
import StarRating from '../../product/components/starRating'
import ProCartContext from '../../../contexts/ProCartContext.js'
import MemberContext from '../../../contexts/MemberContext'
import dayjs from 'dayjs'
import axios from 'axios'
import { useState, useContext } from 'react'
function OrderNum({ momOrder, open, setOpen, change, setChange }) {
  const { stars, setStar } = useContext(ProCartContext)
  const { data } = useContext(MemberContext)
  //母訂單+子訂單
  const { rows, proRows, roomRows, renRows, camRows } = momOrder
  //給lightBox
  const [lightOpen, setLightOpen] = useState(false)
  //給看評價
  const [lookLightBox, setLookSetLigjtBox] = useState(false)
  //格式化金額
  const moneyFormat = (price) => {
    let a = Number(price)
    let b = a.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })
    let c = b.split('.')
    return c[0]
  }
  //給予評價顯示
  const [evaluation, setEvaluation] = useState([])
  //看評價顯示
  const [lookEva, setLookEva] = useState([])
  //寫評價
  const [writeEva, setWriteEve] = useState('')
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
  //讀取評價
  const getEva = async (proSid, roomSid, renSid, campSid) => {
    if (proSid) {
      const res = await axios.get(
        `http://localhost:3001/order/lookEva?proSid=${proSid}`
      )
      if (res.data) {
        setLookEva(res.data)
        setLookSetLigjtBox(!lookLightBox)
        return
      }
    }
    if (roomSid) {
      const res = await axios.get(
        `http://localhost:3001/order/lookEva?roomSid=${roomSid}`
      )
      if (res.data) {
        setLookEva(res.data)
        setLookSetLigjtBox(!lookLightBox)
        return
      }
    }
    if (renSid) {
      const res = await axios.get(
        `http://localhost:3001/order/lookEva?renSid=${renSid}`
      )
      if (res.data) {
        setLookEva(res.data)
        setLookSetLigjtBox(!lookLightBox)
        return
      }
    }
    if (campSid) {
      const res = await axios.get(
        `http://localhost:3001/order/lookEva?campSid=${campSid}`
      )
      if (res.data) {
        setLookEva(res.data)
        setLookSetLigjtBox(!lookLightBox)
        return
      }
    }
  }
  //寫入評價
  const addEva = async (el) => {
    if (writeEva === '') {
      alert('請輸入文字')
      return
    }
    const json = await {
      sid: el.order_sid,
      star: stars,
      text: writeEva,
    }
    if (el.product_sid) {
      const res = await axios.post(
        'http://localhost:3001/order/writeEvaPro',
        json
      )
      if (res.data.affectedRows === 1) {
        setStar(1)
        setChange(!change)
        setLightOpen(!lightOpen)
      }
    }
    if (el.room_sid) {
      const res = await axios.post(
        'http://localhost:3001/order/writeEvaRoom',
        json
      )
      if (res.data.affectedRows === 1) {
        setStar(1)
        setChange(!change)
        setLightOpen(!lightOpen)
      }
    }
    if (el.campaign_sid) {
      const res = await axios.post(
        'http://localhost:3001/order/writeEvaCamp',
        json
      )
      if (res.data.affectedRows === 1) {
        setStar(1)
        setChange(!change)
        setLightOpen(!lightOpen)
      }
    }
    if (el.rental_sid) {
      const res = await axios.post(
        'http://localhost:3001/order/writeEvaRen',
        json
      )
      if (res.data.affectedRows === 1) {
        setStar(1)
        setChange(!change)
        setLightOpen(!lightOpen)
      }
    }
  }
  return (
    <>
      {/* 給評價 */}
      {lightOpen &&
        evaluation.map((el) => {
          return (
            <div
              className={styled.lightBgc}
              onClick={(e) => {
                setStar(1)
                setLightOpen(!lightOpen)
              }}
              key={el.order_sid}
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
                      src={`http://localhost:3001/imgs/zx/${el.product_img}`}
                      alt=""
                    />
                  </div>
                  <p>{el.product_name}</p>
                </div>
                <StarRating />
                <textarea
                  rows="6"
                  placeholder="寫點甚麼...."
                  onChange={(e) => setWriteEve(e.target.value)}
                />
                <button
                  className={styled.yes}
                  onClick={() => {
                    console.log(el)
                    if (el.product_sid) addEva(el)
                    if (el.room_sid) addEva(el)
                    if (el.campaign_sid) addEva(el)
                    if (el.rental_sid) addEva(el)
                  }}
                >
                  確認
                </button>
              </div>
            </div>
          )
        })}
      {/* 看評價 */}
      {lookLightBox &&
        lookEva.map((el, i) => {
          return (
            <div
              className={styled.lightBgc}
              onClick={(e) => {
                setStar(1)
                setLookSetLigjtBox(!lookLightBox)
              }}
              key={el.order_sid}
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
                      src={`http://localhost:3001/imgs/zx/${el.product_img}`}
                      alt=""
                    />
                  </div>
                  <p>{el.product_name}</p>
                </div>
                <div className={styled.lookMember}>
                  <div className={styled.memberLeft}>
                    <div className={styled.memImgWrap}>
                      {data && data.avatar ? (
                        <img
                          src={`http://localhost:3001/uploads/avatar_${data.avatar}`}
                          alt="avatar"
                        ></img>
                      ) : (
                        <img
                          src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
                          alt="postImg"
                        ></img>
                      )}
                    </div>
                    <div className={styled.memberText}>
                      <p>{data && data.nickname} 銀級玩家</p>
                      <span>{dayjs(el.messageTime).format('YYYY-MM-DD')}</span>
                    </div>
                  </div>
                  <div className={styled.starRating}>
                    {[...Array(5)].map((star, index) => {
                      const totalStars = el.star
                      index += 1
                      return (
                        <p
                          key={index}
                          className={
                            index <= totalStars
                              ? `${styled.on}`
                              : `${styled.off}`
                          }
                        >
                          <span className="star">&#9733;</span>
                        </p>
                      )
                    })}
                  </div>
                </div>
                <div className={styled.lookBottom}>
                  <p>{el.message}</p>
                  <button
                    className={styled.close}
                    onClick={(e) => {
                      setLookSetLigjtBox(!lookLightBox)
                    }}
                  >
                    關閉
                  </button>
                </div>
              </div>
            </div>
          )
        })}

      <div className={styled.numWrap}>
        {rows &&
          rows.map((el, i) => {
            return (
              <div key={el.order_sid}>
                <div className={styled.camera}>
                  <div
                    className={styled.recipientWrap}
                    style={{
                      transform:
                        open.includes(el.order_sid) && 'rotateX(180deg)',
                    }}
                  >
                    <input
                      type="checkbox"
                      value={`${el.order_sid}`}
                      id={`${el.order_sid}`}
                      onClick={(e) => {
                        openWrap(e)
                      }}
                    />
                    <label
                      className={styled.orderNum}
                      htmlFor={`${el.order_sid}`}
                    >
                      <p> 訂單編號：{el.order_num}</p>
                      <p>金額：{moneyFormat(el.total)}</p>
                      <i className="fa-solid fa-chevron-up"></i>
                    </label>
                    <div
                      className={styled.recipient}
                      onClick={() => {
                        closeWrap(el.order_sid)
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
                    maxHeight: open.includes(el.order_sid) && '50vh',
                    overflow: open.includes(el.order_sid) && 'auto',
                    paddingTop: open.includes(el.order_sid) && '10px',
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
                            key={`pro${el2.order_sid}`}
                          >
                            <div className={styled.contentDe}>
                              <div className={styled.imgWrap}>
                                <img
                                  src={`http://localhost:3001/imgs/zx/${el2.product_img}`}
                                  alt=""
                                />
                              </div>
                              <p>{el2.product_name}</p>
                              <p>{moneyFormat(el2.product_price)}</p>
                              <p>{el2.qty}</p>
                              <p>{moneyFormat(el2.total)}</p>
                            </div>
                            {el2.star ? (
                              <button
                                onClick={() => {
                                  getEva(el2.order_sid, 0, 0, 0)
                                }}
                              >
                                看評價
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  const writeStars = [el2]
                                  setEvaluation(writeStars)
                                  setLightOpen(!lightOpen)
                                }}
                              >
                                給予評價
                              </button>
                            )}
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
                          <p>床位</p>
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
                            key={`room${el3.order_sid}`}
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
                            {el3.star ? (
                              <button
                                onClick={() => {
                                  getEva(0, el3.order_sid, 0, 0)
                                }}
                              >
                                看評價
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  const writeStars = [el3]
                                  setEvaluation(writeStars)
                                  setLightOpen(!lightOpen)
                                }}
                              >
                                給予評價
                              </button>
                            )}
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
                              key={`cam${el4.order_sid}`}
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
                              {el4.star ? (
                                <button
                                  onClick={() => {
                                    getEva(0, 0, 0, el4.order_sid)
                                  }}
                                >
                                  看評價
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    const writeStars = [el4]
                                    setEvaluation(writeStars)
                                    setLightOpen(!lightOpen)
                                  }}
                                >
                                  給予評價
                                </button>
                              )}
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
                          <p>跨店費用</p>
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
                              key={`ren${el5.order_sid}`}
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
                                  {dayjs(el5.out_date).format('YYYY-MM-DD')}
                                  <i className="fa-solid fa-arrow-down"></i>
                                  {dayjs(el5.back_date).format('YYYY-MM-DD')}
                                </p>
                                <p>{moneyFormat(el5.rental_price)}</p>
                                <p>跨店費用</p>
                                <p>{el5.qty}</p>
                                <p>{moneyFormat(el5.total)}</p>
                              </div>
                              {el5.star ? (
                                <button
                                  onClick={() => {
                                    getEva(0, 0, el5.order_sid, 0)
                                  }}
                                >
                                  看評價
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    const writeStars = [el5]
                                    setEvaluation(writeStars)
                                    setLightOpen(!lightOpen)
                                  }}
                                >
                                  給予評價
                                </button>
                              )}
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
