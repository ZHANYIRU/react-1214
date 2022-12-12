import React, { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ListLeft from './components/ListLeft'
import style from '../../styles/camp-scss/campproduct.module.scss'
import { useSearchParams, useParams } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import ProCartContext from '../../contexts/ProCartContext'
import MemberContext from '../../contexts/MemberContext'
import ProductComment from '../product/components/ProductComment'
import pstyled from '../../styles/product-scss/ProductComment.module.scss'
import CommentLightBox from '../product/components/CommentLightBox'
import lbstyled from '../../styles/product-scss/CommentLightBox.module.scss'
import Swal from 'sweetalert2'

function CampProduct() {
  const navigate = useNavigate()
  const picRef = useRef()
  const { addCampCart } = useContext(ProCartContext)
  const memberData = useContext(MemberContext)
  const { camp_sid } = useParams()
  //sid活動產品資料
  const [campSid, setCampSid] = useState([])
  let sid = 'sid'

  //抓url的/?camp_sid=多少
  const [usp] = useSearchParams()
  //console.log(camp_sid)

  //存選擇的數量
  const [num, setNum] = useState(1)

  //今天的日期
  const date = Date.parse(new Date())
  //最的日期
  const today = dayjs(date + 172800000).format('YYYY-MM-DD')

  //存報名的日期
  const [chooseDate, setChooseDate] = useState(today)

  //燈箱切換
  const [comLightBox, setComLightBox] = useState(false)

  //商品介紹、評論
  const [introCom, setintroCom] = useState(true)

  // 切換開關方法
  const changeBtn = (e) => {
    setintroCom(!introCom)
  }

  //sweetAlert2
  const sweetAlert = (text) => {
    Swal.fire({
      title: `${text}`,
      icon: 'info',
      scrollbarPadding: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    })
  }
//加入購物車方法
const addCartFunction = (v) => {
  Swal.fire({
    icon: 'success',
    title: '已加入!',
    showCancelButton: false,
  })}

  //會員頭像邊框
  function avatarLevel(height = 0) {
    if (height > 10000) {
      return pstyled.gold
    }
    if (height > 3000) {
      return pstyled.silver
    }
    return pstyled.bronze
  }

  //評價的狀態
  const [commentFetch, setCommentFetch] = useState([])
  //平均星數
  const [avgStar, setAvgStar] = useState(0)
  //哪一筆評論的Index
  const [whichCom, setWhichCom] = useState(0)

  //取得評論資訊
  const comMentData = async () => {
    const response = await axios.get(
      `http://localhost:3001/camp/comment?cid=${camp_sid}`
    )
    const r = response.data.rows
    const r2 = response.data.rows2[0].avgStar
    console.log(response.data)

    setCommentFetch(r)
    setAvgStar(r2)
  }

  //活動介紹區塊
  const intro = campSid.map((v, i) => {
    return (
      <div id="introduction" key={i}>
        <h4>活動介紹</h4>
        <p>{v.brife_describe}</p>

        <h4>行程規劃</h4>
        <div className={style.schedule}>
          <pre>{v.schedule_day1}</pre>
          <pre>{v.schedule_day2}</pre>
          <pre>{v.schedule_day3}</pre>
        </div>

        <h4>注意事項</h4>
        <p>
          出發前請留意氣象資訊，山區天氣變化多端，早晚以及越往山上溫差越大，穿著建議以洋蔥式穿法。不管是在夏季或冬季氣候，高山氣溫還是明顯偏低，切記要做好保暖才不會容易引發高山症。
          另外，每個人對於溫度的感受不盡相同，請務必根據自己的身體條件，做好穿著和攜帶衣物的責任。
          如所攜帶之裝備不足以完成行程的人，以及對個人或團隊安全有所危害者，領隊嚮導有權要求撤退並陪同之。
          行進間，除領隊或嚮導有特別安排，請勿超前隊伍自行脫隊，或刻意落後，為了各位夥伴安全，讓領隊及嚮導好好待在身旁。
          行程中有任何問題如擔心、害怕、心生疑慮，或遇到不敢通過的地形等，請務必告知領隊或嚮導，我們將盡最大的努力提供最好的服務。
          初學者如尚不適應登山行程、或裝備不熟悉者，切記量力而為。建議將背包總重量（含背包本身、行動水、午餐、行動糧）控制在八公斤以下。
          請在出發前就多加進行自主訓練，訓練方向請針對心肺和肌力，跑步、游泳、重訓、深蹲等多方加強。
          請審慎評估自身能力再進行報名。
          此次行程安全為第一考量，落實無痕山林，一起當個友愛大自然的孩子吧！
          爬山過程中，如遇身體不適，或有任何情況發生，請盡快告知領隊或嚮導，請勿硬撐而讓自己陷入危險當中。
        </p>
        <h5>【報名前請務必詳閱 條款及細則 ＆ 裝備說明】 </h5>
      </div>
    )
  })

  //評論區塊
  const com = (
    <div id="comment">
      <h4>評論數量</h4>
      <div className={pstyled.comWrap}>
        <div className={pstyled.starBox}>
          {/* <StarRating />
           */}

          <p className={pstyled.write}>
            {[...Array(5)].map((star, index) => {
              const tatalStar = Math.floor(avgStar)
              index += 1
              return (
                <p
                  key={index}
                  className={
                    index <= tatalStar ? `${pstyled.on}` : `${pstyled.off}`
                  }
                >
                  <span className="star">&#9733;</span>
                </p>
              )
            })}
          </p>
          <p>{avgStar} &nbsp; 顆星</p>
        </div>
        <div className={pstyled.commonArea}>
          {commentFetch.map((v, i) => {
            return (
              <div className={pstyled.commonBox} key={i}>
                <div className={pstyled.commonTitle}>
                  <div
                    className={`${pstyled.commonTitle_img_border} ${avatarLevel(
                      v.total_height
                    )}`}
                    onClick={() => {
                      navigate(
                        `${memberData.data.member_sid}` === `${v.member_sid}`
                          ? `/member`
                          : `/profile?id=${v.member_sid}`
                      )
                    }}
                  >
                    <div className={pstyled.commonTitle_img}>
                      {v && v.avatar ? (
                        <img
                          src={`http://localhost:3001/uploads/avatar_${v.avatar}`}
                          alt="avatar"
                        ></img>
                      ) : (
                        <img src="/img/default_avatar.png" alt="avatar" />
                      )}
                    </div>
                  </div>

                  <div className={pstyled.memberName}>{v.nickname}</div>
                </div>
                <div className={pstyled.commonText}>{v.message}</div>
                <div className={pstyled.howStar}>
                  {[...Array(5)].map((star2, index) => {
                    const totalStars = v.star
                    index += 1
                    return (
                      <p
                        key={index}
                        className={
                          index <= totalStars
                            ? `${pstyled.on}`
                            : `${pstyled.off}`
                        }
                      >
                        <span className="star">&#9733;</span>
                      </p>
                    )
                  })}
                </div>
                <div
                  className={pstyled.readMore}
                  onClick={() => {
                    setWhichCom(i)
                    setComLightBox(true)
                  }}
                >
                  閱讀更多
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <h5>【報名前請務必詳閱 條款及細則 ＆ 裝備說明】 </h5>
    </div>
  )

  const fetchAll = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/camp/${camp_sid}`)
      const data = response.data
      console.log('sid')

      setCampSid(data)
    } catch (e) {
      console.log(e.message)
    }
  }
  useEffect(() => {
    fetchAll('sid')
  }, [])

  useEffect(() => {
    comMentData()
  }, [camp_sid])

  return (
    <>
      <div className={style.product}>
        <ListLeft />
        {comLightBox && (
          <CommentLightBox
            commentFetch={commentFetch}
            whichCom={whichCom}
            setComLightBox={setComLightBox}
          />
        )}
        <div className={style.pright}>
          {campSid.length !== 0 &&
            campSid.map((v, i) => {
              if (i < 1) {
                return (
                  <div className={style.card} key={i}>
                    <div className={style.cardtop}>
                      <h2>{v.camp_name}</h2>
                      <div className={style.infos}>
                        <div>
                          <div className={style.location}>
                            <span>
                              <i className="fa-solid fa-map-location-dot"></i>
                            </span>
                            <p>{v.name}</p>
                          </div>
                          <div className={style.location}>
                            <span>
                              <i className="fa-solid fa-mountain"></i>
                            </span>
                            <p>{v.mountain_name}</p>
                          </div>
                          <div className={style.price}>金額：${v.price}/人</div>
                          <div className={style.price}>
                            {' '}
                            評價：
                            {[...Array(5)].map((star, index) => {
                              const tatalStar = Math.floor(avgStar)
                              index += 1
                              return (
                                <span
                                  key={index}
                                  className={
                                    index <= tatalStar
                                      ? `${lbstyled.on}`
                                      : `${lbstyled.off}`
                                  }
                                >
                                  <span className="star">&#9733;</span>
                                </span>
                              )
                            })}
                          </div>
                        </div>
                        <div className={style.select}>
                          <label className={style.stitle}>請選擇報名日期</label>
                          <input
                            type="date"
                            min={today}
                            max={dayjs(v.camp_joinenddate).format('YYYY-MM-DD')}
                            value={chooseDate ? chooseDate : today}
                            onChange={(e) => {
                              const myDate = e.target.value
                              setChooseDate(myDate)
                            }}
                          />
                          <div className={style.howNum}>
                            <p>報名人數：</p>
                            <div className={style.numBox}>
                              <div className={style.numBox1}>
                                <i
                                  className="fa-solid fa-minus"
                                  onClick={() => {
                                    if (num < 2) return
                                    setNum(num - 1)
                                  }}
                                ></i>
                                {/* {console.log(num)} */}
                              </div>
                              <div className={style.numBox2}>{num}</div>
                              <div className={style.numBox3}>
                                <i
                                  className="fa-solid fa-plus"
                                  onClick={() => {
                                    if (num > v.product_inventory) return
                                    setNum(num + 1)
                                  }}
                                ></i>
                              </div>
                            </div>
                          </div>
                          <button
                            className={style.buy}
                            onClick={() => {
                              let a
                              if (v.campaign_days_sid === 1) {
                                a = '一日遊'
                              } else if (v.campaign_days_sid === 2) {
                                a = '兩天一夜'
                              } else if (v.campaign_days_sid === 3) {
                                a = '三天兩夜'
                              }
                              addCampCart(
                                v.c_sid,
                                v.camp_name,
                                chooseDate,
                                a,
                                v.name,
                                v.mountain_name,
                                v.price,
                                num,
                                v.mainImage
                              )
                              addCartFunction(v)
                            }}
                          >
                            加入購物車
                          </button>
                        </div>

                        {console.log(chooseDate)}
                      </div>
                      <div className={style.imgarea}>
                        <div className={style.mainImage}>
                          <img
                            ref={picRef}
                            src={`http://localhost:3001/n7/campmain/${v.mainImage}`}
                            alt=""
                          />
                        </div>
                        <div className={style.detailsimgs}>
                          <img
                            onClick={() => {
                              picRef.current.setAttribute(
                                'src',
                                `http://localhost:3001/n7/campmain/${v.mainImage}`
                              )
                            }}
                            src={`http://localhost:3001/n7/campmain/${v.mainImage}`}
                            alt=""
                          />
                          <img
                            onClick={() => {
                              picRef.current.setAttribute(
                                'src',
                                `http://localhost:3001/n7/${v.detailImages[0]}`
                              )
                            }}
                            src={`http://localhost:3001/n7/${v.detailImages[0]}`}
                            alt=""
                          />
                          <img
                            onClick={() => {
                              picRef.current.setAttribute(
                                'src',
                                `http://localhost:3001/n7/${v.detailImages[1]}`
                              )
                            }}
                            src={`http://localhost:3001/n7/${v.detailImages[1]}`}
                            alt=""
                          />
                          <img
                            onClick={() => {
                              picRef.current.setAttribute(
                                'src',
                                `http://localhost:3001/n7/${v.detailImages[2]}`
                              )
                            }}
                            src={`http://localhost:3001/n7/${v.detailImages[2]}`}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className={style.switch}>
                      <div
                        className={
                          introCom
                            ? `${style.productIntro} ${style.underLine}`
                            : `${style.productIntro}`
                        }
                        onClick={(e) => {
                          if (!introCom) {
                            changeBtn()
                          } else {
                            return
                          }
                        }}
                      >
                        介紹
                      </div>
                      <div
                        className={
                          !introCom
                            ? `${style.productIntro} ${style.underLine}`
                            : `${style.productIntro}`
                        }
                        onClick={() => {
                          if (introCom) {
                            changeBtn()
                          } else {
                            return
                          }
                        }}
                      >
                        評論({commentFetch.length})
                      </div>
                    </div>
                    <div className={style.cardcontext}>
                      {/* <div id="introduction">
                          <h4>活動介紹</h4>
                          <p>{v.brife_describe}</p>

                          <h4>行程規劃</h4>
                          <div className={style.schedule}>
                            <p>{v.schedule_day1}</p>
                            <p>{v.schedule_day2}</p>
                            <p>{v.schedule_day3}</p>
                          </div>

                          <h4>注意事項</h4>
                          <p>
                            出發前請留意氣象資訊，山區天氣變化多端，早晚以及越往山上溫差越大，穿著建議以洋蔥式穿法。不管是在夏季或冬季氣候，高山氣溫還是明顯偏低，切記要做好保暖才不會容易引發高山症。
                            另外，每個人對於溫度的感受不盡相同，請務必根據自己的身體條件，做好穿著和攜帶衣物的責任。
                            如所攜帶之裝備不足以完成行程的人，以及對個人或團隊安全有所危害者，領隊嚮導有權要求撤退並陪同之。
                            行進間，除領隊或嚮導有特別安排，請勿超前隊伍自行脫隊，或刻意落後，為了各位夥伴安全，讓領隊及嚮導好好待在身旁。
                            行程中有任何問題如擔心、害怕、心生疑慮，或遇到不敢通過的地形等，請務必告知領隊或嚮導，我們將盡最大的努力提供最好的服務。
                            初學者如尚不適應登山行程、或裝備不熟悉者，切記量力而為。建議將背包總重量（含背包本身、行動水、午餐、行動糧）控制在八公斤以下。
                            請在出發前就多加進行自主訓練，訓練方向請針對心肺和肌力，跑步、游泳、重訓、深蹲等多方加強。
                            請審慎評估自身能力再進行報名。
                            此次行程安全為第一考量，落實無痕山林，一起當個友愛大自然的孩子吧！
                            爬山過程中，如遇身體不適，或有任何情況發生，請盡快告知領隊或嚮導，請勿硬撐而讓自己陷入危險當中。
                          </p>
                          <h5>【報名前請務必詳閱 條款及細則 ＆ 裝備說明】 </h5>
                        </div>
                        <div id="comment">
                          <h4>評論數量</h4>
                          <h5>【報名前請務必詳閱 條款及細則 ＆ 裝備說明】 </h5>
                        </div> */}
                      {introCom ? (
                        intro
                      ) : (
                        <ProductComment
                          avgStar={avgStar}
                          commentFetch={commentFetch}
                          memberData={memberData}
                          setWhichCom={setWhichCom}
                          setComLightBox={setComLightBox}
                        />
                      )}
                    </div>
                  </div>
                )
              }
            })}
        </div>
      </div>
    </>
  )
}

export default CampProduct
