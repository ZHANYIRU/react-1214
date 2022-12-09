import style from '../../../styles/room-scss/roomDetail.module.scss'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import RoomSelectBar from './RoomSelectBar'
import { useEffect, useState } from 'react'
import SeeEvaluation from '../../../components/SeeEvaluation'

function RoomDetail({ detail, detailNoComment, el }) {
  function avatarLevel(height = 0) {
    if (height > 10000) {
      return style.gold
    }
    if (height > 3000) {
      return style.silver
    }
    return style.bronze
  }
  // const [roomData, setRoomData] = useState([])

  const roomData = detailNoComment.length === 0 ? detail : detailNoComment
  // 切換評論 or 房型介紹
  console.log('roomData', roomData)
  console.log('detail', detail)
  console.log('detailNoComment', detailNoComment)

  // console.log('detailNoComment', detailNoComment)

  const [showIntro, setShowIntro] = useState(true)

  const imgs = roomData.room_imgs
  const roomService = roomData.room_service_sid
  console.log('imgs', imgs)

  const [service, setService] = useState([
    '淋浴',
    '沐浴用品',
    '吹風機',
    '毛巾',
    '空調',
    '電風扇',
    '免費wifi',
    '早餐',
    '登山口接駁',
    '登山諮詢',
    '飲水機',
    '插座',
  ])
  const starCount = (e) => {
    if (e > 0 && e === 1) {
      return (
        <>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
        </>
      )
    } else if (e > 0 && e === 2) {
      return (
        <>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
        </>
      )
    } else if (e > 0 && e === 3) {
      return (
        <>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
        </>
      )
    } else if (e > 0 && e === 4) {
      return (
        <>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
        </>
      )
    } else if (e > 0 && e === 5) {
      return (
        <>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </>
      )
    } else if (e <= 0) {
      return (
        <>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
        </>
      )
    }
  }
  // useEffect(() => {}, [roomService])

  return (
    <>
      {roomData.length !== 0 && (
        <>
          <div className={style.cardWrap}>
            <div className={style.top}>
              <div className={style.title}>
                <div className={style.roomName}>{roomData.room_name}</div>
                <div className={style.star}>
                  {starCount(Math.round(roomData.Average))}

                  <span className={style.commentQTY}>
                    ({roomData.commentQty > 0 ? roomData.commentQty : 0})
                  </span>
                </div>
              </div>
              <div className={style.sideTitle}>
                <div className={style.icon}>
                  <div className={style.location}>
                    <span>
                      <i className="fa-solid fa-map-location-dot"></i>
                    </span>
                    <span>{roomData.name}</span>
                  </div>
                  <div className={style.mountain}>
                    <span>
                      <i className="fa-solid fa-mountain"></i>
                    </span>
                    <span>{roomData.mountain_name}</span>
                    <span>{roomData.height}m</span>
                  </div>
                </div>
                <div className={style.price}>
                  金額：${roomData.room_price}/人
                </div>
              </div>
            </div>
            <div className={style.slideWrap}>
              <div className={style.slide}>
                <div className={style.imgs}>
                  <Carousel
                    showArrows={false}
                    showIndicators={false}
                    showStatus={false}
                  >
                    <div className={style.img}>
                      <img
                        src={
                          imgs &&
                          imgs.length !== 0 &&
                          `http://localhost:3001/room_img/${imgs[0]}`
                        }
                        alt=""
                      />
                    </div>
                    <div className={style.img}>
                      <img
                        src={
                          imgs &&
                          imgs.length !== 0 &&
                          `http://localhost:3001/room_img/${imgs[1]}`
                        }
                        alt=""
                      />
                    </div>
                    <div className={style.img}>
                      <img
                        src={
                          imgs &&
                          imgs.length !== 0 &&
                          `http://localhost:3001/room_img/${imgs[2]}`
                        }
                        alt=""
                      />
                    </div>
                    <div className={style.img}>
                      <img
                        src={
                          imgs &&
                          imgs.length !== 0 &&
                          `http://localhost:3001/room_img/${imgs[3]}`
                        }
                        alt=""
                      />
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
            <div className={style.bottom}>
              <div className={style.switch}>
                <div
                  className={`${style.intro} ${showIntro ? style.line : ''}`}
                  onClick={() => {
                    setShowIntro(true)
                  }}
                >
                  介紹
                </div>
                <div
                  className={`${style.comment} ${showIntro ? '' : style.line}`}
                  onClick={() => {
                    setShowIntro(false)
                  }}
                >
                  評論 ({roomData.commentQty > 0 ? roomData.commentQty : 0})
                </div>
              </div>
              {showIntro ? (
                <>
                  <div className={style.sec1}>
                    <h4>營位/山莊</h4>
                    <span>{`${roomData.room_name}`}</span>
                    <span>營業時間：{`${roomData.room_business_hours}`}</span>
                    <span>電話：{`${roomData.room_telephone}`}</span>
                    <span>地址：{`${roomData.room_address}`}</span>
                  </div>
                  <div className={style.sec2}>
                    <h4>登山口資訊</h4>
                    <span>{`${roomData.room_entry_name}`}</span>
                    <span>
                      住宿地點距離登山口：
                      {`${roomData.room_entry_distance}`} 公里
                    </span>
                    <span>地址：{`${roomData.room_entry_address}`}</span>
                  </div>
                  <div className={style.sec3}>
                    <h4>提供設備</h4>
                    <div className={style.facilityList}>
                      {roomService.length !== 0 &&
                        roomService.map((v, i) => {
                          return (
                            <div className={style.facility} key={i}>
                              <img
                                src={`/img/room_service_img/${v}.png`}
                                alt=""
                              />
                              <span>{service[v - 1]}</span>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                  <div className={style.sec4}>
                    <h4> 取消 / 退款說明</h4>
                    <p>
                      ＊以下退款規定關於您的權益，為避免誤解與糾紛，請您充分了解並同意後再進行訂房。
                      <br />
                      訂金付款後若須退款，訂金須扣除「訂金扣款金額」與「單次退款手續費」，
                      <br />
                      詳細計算方式如下： 退款金額=訂金 x (1-訂金扣款百分比) -
                      單次退款手續費（NT$100）
                      <br />
                      入住日前7日取消可全額退款訂金扣款百分比規定如下：
                      <br />
                      入住日前1天（含）退房，訂金扣款100%。
                      <br />
                      入住日前2天（含）退房，訂金扣款90%。
                      <br />
                      入住日前3天（含）退房，訂金扣款75%。
                      <br />
                      入住日前4天（含）退房，訂金扣款60%。
                      <br />
                      入住日前5天（含）退房，訂金扣款45%。
                      <br />
                      入住日前6天（含）退房，訂金扣款30%。
                      <br />
                      入住日前7天（含）以前退房，訂金扣款15%。
                      <br />
                      入住日前8天（含）以前退房，訂金扣款0%。
                      <br />
                      ATM轉帳、信用卡、銀聯卡、Paypal，訂單單次退款手續費為100新台幣。
                      <br />
                      若遇颱風（須中央氣象局發佈陸上颱風警報）或其他重大災害，而且民宿所在縣市宣布停止上班上課，訂金就可以選擇保留，延遲住房期限（六個月內），或扣除單次退款手續費後退還。
                      <br />
                      因中央疫情指揮中心發佈三級因素取消，扣除單次退款手續費後退還。
                      <br />
                      延期相關：延期僅以一次為限，計算方式為預約住宿日期開始180日，到期恕不另行通知
                    </p>
                  </div>
                </>
              ) : (
                //評論頁切換
                <>
                  <div className={style.stars}>
                    {starCount(Math.round(roomData.Average))}

                    <span className={style.commentQTY}>
                      ({roomData.commentQty > 0 ? roomData.commentQty : 0})
                    </span>
                  </div>
                  <div className={style.commenAll}>
                    {/* 印一次 */}
                    <div
                      className={style.commentWrap}
                      onClick={(el) => {
                        console.log(el.target.value)
                        SeeEvaluation()
                      }}
                    >
                      <div className={style.member}>
                        <div
                          className={`${style.memberImg} ${avatarLevel(
                            roomData.total_height
                          )}`}
                        >
                          {roomData.avatar ? (
                            <img
                              src={`http://localhost:3001/uploads/avatar_${roomData.avatar}`}
                              alt="avatar"
                            ></img>
                          ) : (
                            <img src="/img/default_avatar.png" alt="avatar" />
                          )}
                        </div>
                        <span>{roomData.nickname}</span>
                      </div>
                      <div className={style.commentText}>
                        <p>{roomData.message}</p>
                      </div>
                      <div className={style.star}>
                        {starCount(Math.round(roomData.star))}
                      </div>
                      <div className={style.date}>
                        <span style={{ marginRight: '100px' }}>2022-12-01</span>
                        <span>閱讀更多</span>
                      </div>
                    </div>
                    {/* 印一次 */}
                    <div
                      className={style.commentWrap}
                      onClick={(el) => {
                        console.log(el.target.value)
                        SeeEvaluation()
                      }}
                    >
                      <div className={style.member}>
                        <div
                          className={`${style.memberImg} ${avatarLevel(
                            roomData.total_height
                          )}`}
                        >
                          {roomData.avatar ? (
                            <img
                              src={`http://localhost:3001/uploads/avatar_${roomData.avatar}`}
                              alt="avatar"
                            ></img>
                          ) : (
                            <img src="/img/default_avatar.png" alt="avatar" />
                          )}
                        </div>
                        <span>{roomData.nickname}</span>
                      </div>
                      <div className={style.commentText}>
                        <p>{roomData.message}</p>
                      </div>
                      <div className={style.star}>
                        {starCount(Math.round(roomData.star))}
                      </div>
                      <div className={style.date}>
                        <span style={{ marginRight: '100px' }}>2022-12-01</span>
                        <span>閱讀更多</span>
                      </div>
                    </div>
                    {/* 印一次 */}
                    <div
                      className={style.commentWrap}
                      onClick={(el) => {
                        console.log(el.target.value)
                        SeeEvaluation()
                      }}
                    >
                      <div className={style.member}>
                        <div
                          className={`${style.memberImg} ${avatarLevel(
                            roomData.total_height
                          )}`}
                        >
                          {roomData.avatar ? (
                            <img
                              src={`http://localhost:3001/uploads/avatar_${roomData.avatar}`}
                              alt="avatar"
                            ></img>
                          ) : (
                            <img src="/img/default_avatar.png" alt="avatar" />
                          )}
                        </div>
                        <span>{roomData.nickname}</span>
                      </div>
                      <div className={style.commentText}>
                        <p>{roomData.message}</p>
                      </div>
                      <div className={style.star}>
                        {starCount(Math.round(roomData.star))}
                      </div>
                      <div className={style.date}>
                        <span style={{ marginRight: '100px' }}>2022-12-01</span>
                        <span>閱讀更多</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <RoomSelectBar detail={detail} detailNoComment={detailNoComment} />
        </>
      )}
    </>
  )
}

export default RoomDetail
