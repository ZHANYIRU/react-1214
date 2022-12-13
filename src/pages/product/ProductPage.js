import React, { useRef, useState, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import styled from '../../styles/product-scss/productPage.module.scss'
import axios from 'axios'
import { useEffect } from 'react'
import MemberContext from '../../contexts/MemberContext'
import ProCartContext from '../../contexts/ProCartContext'
import CommentLightBox from './components/CommentLightBox'
import ProductComment from './components/ProductComment'
// import comFakeData from './comFakeData'
import Swal from 'sweetalert2'
import { useMediaQuery } from 'react-responsive'

export default function ProductPage() {
  const navigate = useNavigate()
  //評價state
  const [commentFetch, setCommentFetch] = useState([])
  //useMediaQuery
  const minPc = useMediaQuery({ query: '(max-width:1100px)' })
  //會員頭像邊框
  function avatarLevel(height = 0) {
    if (height > 10000) {
      return styled.gold
    }
    if (height > 3000) {
      return styled.silver
    }
    return styled.bronze
  }
  const { product_sid } = useParams()
  const memberData = useContext(MemberContext)
  const { addProCart } = useContext(ProCartContext)
  //平均星數
  const [avgStar, setAvgStar] = useState(0)
  //哪一筆評論的Index
  const [whichCom, setWhichCom] = useState(0)
  //衣服size
  const clotheSize = ['S', 'M', 'L']
  // //fetchSize
  const [fetchSize, setFetchSize] = useState([{}])
  //預設值

  // 尺寸選取
  const [size2, setSize2] = useState()

  //燈箱切換
  const [comLightBox, setComLightBox] = useState(false)
  //換圖
  const changePic = useRef()
  // 尺寸選取

  //選擇數量
  const [num, setNum] = useState(1)
  //商品介紹、評論
  const [introCom, setintroCom] = useState(true)

  //sweetAlert2
  const sweetAlert = (text) => {
    Swal.fire({
      title: `${text}`,
      icon: 'info',
      showCancelButton: false,
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
    })
    addProCart(
      product_sid,
      v.product_name,
      size2,
      Number(v.product_price),
      num,
      v.product_img
    )
  }

  //隨機產生3筆資料
  const [randomData, setRandomData] = useState([
    {
      product_sid: '1',
      product_name: 'a',
      product_category_sid: '10',
      brand_sid: '7',
      product_price: '3699',
      product_inventory: '20',
      product_img: '1',
      product_imgs: '1',
      product_spec: '1',
      product_feature: '1',
      size: 'S',
    },
  ])
  //商品細節主商品
  const productData = [
    {
      product_sid: 1,
      product_name:
        'Arcteryx 始祖鳥 Beta LT  Gore Tex登山雨衣/風雨衣/女款 鐵克諾紅 Techno',
      product_category_sid: 10,
      brand_sid: 7,
      product_price: 3699,
      product_inventory: 20,
      product_img: 'M84312469_big4.jpg',
      product_imgs:
        'M84312469_big4.jpg,M84312469_big3.jpg,M84312469_big2.jpg,M84312469_big1.jpg',
      product_spec:
        'Arcteryx 始祖鳥 Beta LT 女款 Gore Tex登山雨衣/風雨衣 29458 材質：3L tricot技術N40p-X GORE-TEX材質 重量：350g 符合bluesign標準的材料',
      product_feature:
        '透氣的GORE-TEX材質提供全面抗候防護 可調整、可兼容頭盔StormHood™兜帽提供防護且不遮擋視線 WaterTight™抗水主拉鍊 雙WaterTight™抗水拉鍊插手口袋，配有RS™拉鍊頭 腋下拉鍊以便透氣 WaterTight™抗水主拉鍊 兩個可調節的下擺抽繩，可防止寒氣入侵 可調式袖口 ',
      size: 'S',
    },
  ]

  const [datas, setDatas] = useState([
    {
      product_sid: '1',
      product_name: 'a',
      product_category_sid: '10',
      brand_sid: '7',
      product_price: '3699',
      product_inventory: '20',
      product_img: '1',
      product_imgs: '1',
      product_spec: '1',
      product_feature: '1',
      size: 'S',
    },
  ])
  //我是fetch
  const getProductData = async () => {
    const response = await axios.get(
      `http://localhost:3001/product/page/${product_sid}`
    )
    const r = response.data
    console.log(r)
    setDatas(r)
  }
  //我是fetch Size的
  const getSize2 = async () => {
    const response = await axios.get(
      `http://localhost:3001/product/size/${product_sid}`
    )
    const r = response.data
    console.log(r)
    // const  ascSize = r.filter((v)=> )
    setFetchSize(r)
  }

  //format currency
  const moneyFormat = (price) => {
    let a = Number(price)
    let b = a.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })
    let c = b.split('.')
    return c[0]
  }
  //取得亂數資料的方法
  const getRondomProductData = async () => {
    const response = await axios.get('http://localhost:3001/product/random')
    const r = response.data
    console.log(r)
    setRandomData(r)
  }
  //取得評論資訊
  const comMentData = async () => {
    const response = await axios.get(
      `http://localhost:3001/product/comment?pid=${product_sid}`
    )
    const r = response.data.rows
    const r2 = response.data.rows2[0].avgStar
    console.log(response.data)
    setCommentFetch(r)
    setAvgStar(r2)
  }
  // 切換開關方法
  const changeBtn = (e) => {
    setintroCom(!introCom)
  }
  // mouseLeave Function
  const msLeave = (v) => {
    changePic.current.setAttribute(
      'src',
      `http://localhost:3001/imgs/zx/${v.product_imgs[0]}`
    )
  }
  // guessUlike 2卡片
  const guessUlike_2_card = randomData.map((v, i) => {
    if (i < 2)
      return (
        <Link
          className={styled.card}
          key={v.product_sid}
          to={'/product/' + v.product_sid}
          onClick={() => {
            getProductData()
          }}
        >
          <div>
            <div className={styled.imgWrap}>
              <img
                src={`http://localhost:3001/imgs/zx/${v.product_img}`}
                alt=""
              />
            </div>
            <p className={styled.p}>{v.product_name}</p>
            <h2>
              金額：<span>${v.product_price}</span>
            </h2>
          </div>
        </Link>
      )
  })
  // guessUlike 3卡片
  const guessUlike_3_card = randomData.map((v, i) => {
    return (
      <Link
        className={styled.card}
        key={v.product_sid}
        to={'/product/' + v.product_sid}
        onClick={() => {
          getProductData()
        }}
      >
        <div>
          <div className={styled.imgWrap}>
            <img
              src={`http://localhost:3001/imgs/zx/${v.product_img}`}
              alt=""
            />
          </div>
          <p className={styled.p}>{v.product_name}</p>
          <h2>
            金額：<span>${v.product_price}</span>
          </h2>
        </div>
      </Link>
    )
  })

  // 商品介紹 or 商品評論
  const intro = datas.map((v, i) => {
    return (
      <div className={styled.introWrap} key={i}>
        <div className={styled.introTitle}>產品規格</div>
        <p className={styled.intro}>{v.product_spec}</p>
        <div className={styled.introTitle}>特色說明</div>
        <p className={styled.intro}>{v.product_feature}</p>
        <div className={styled.introTitle}>鑑賞期說明</div>
        <p>
          依據消費者保護法之規定，消費者得於收到商品或接受服務後七天內，以退回商品或書面通知方式解除契約，無須說明理由及負擔任何費用或對價。但以下情形例外不適用：
          易於腐敗、保存期限較短或解約時即將逾期。
          <br />
          <br />
          1.依消費者要求所為之客製化給付。 報紙、期刊或雜誌。
          <br />
          2.經消費者拆封之影音商品或電腦軟體。
          <br />
          3.非以有形媒介提供之數位內容或一經提供即為完成之線上服務，經消費者事先同意始提供。
          <br />
          4.已拆封之個人衛生用品。 國際航空客運服務。
          <br />
          5.故若賣家販售的商品為以上不適用於7天鑑賞期之商品，根據法律規定，還請賣家先於商品頁面上載明，若事先未載明則無法排除適用，請賣家務必注意。
          同時，七天鑑賞期指的是猶豫期而非試用期喔！商品須在完整且可還原狀態下才能進行退貨。
          <br />
          <br />
          因此，若賣家遇到買家退貨商品有逾越檢查必要之使用痕跡或需酌收費用才可還原的情形時，賣家可與買家協調商品整新費用等必要支出。
          <br />
          🔔 註：七天鑑賞期的算法是從收到商品的隔天開始算七天，且包含例假日。
        </p>
        <div className={styled.introTitle}>猜你喜歡</div>
        <div className={styled.guessYouLike}>
          {minPc ? guessUlike_2_card : guessUlike_3_card}
        </div>
      </div>
    )
  })

  const com = (
    <div className={styled.comWrap}>
      <div className={styled.starBox}>
        {/* <StarRating />
         */}

        <p className={styled.write} onClick={() => {}}>
          {[...Array(5)].map((star, index) => {
            const tatalStar = Math.floor(avgStar)
            index += 1
            return (
              <p
                key={index}
                className={
                  index <= tatalStar ? `${styled.on}` : `${styled.off}`
                }
              >
                <span className="star">&#9733;</span>
              </p>
            )
          })}
        </p>
        <p>{avgStar} &nbsp; 顆星</p>
      </div>
      <div className={styled.commonArea}>
        {commentFetch.map((v, i) => {
          return (
            <div className={styled.commonBox} key={i}>
              <div className={styled.commonTitle}>
                <div
                  className={`${styled.commonTitle_img_border} ${avatarLevel(
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
                  <div className={styled.commonTitle_img}>
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

                <div className={styled.memberName}>{v.nickname}</div>
              </div>
              <div className={styled.commonText}>{v.message}</div>
              <div className={styled.howStar}>
                {[...Array(5)].map((star2, index) => {
                  const totalStars = v.star
                  index += 1
                  return (
                    <p
                      key={index}
                      className={
                        index <= totalStars ? `${styled.on}` : `${styled.off}`
                      }
                    >
                      <span className="star">&#9733;</span>
                    </p>
                  )
                })}
              </div>
              <div
                className={styled.readMore}
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
  )
  const shoseSize = (
    <>
      <h2>商品規格</h2>
      {product_sid &&
        fetchSize.map((v, i) => {
          return (
            <>
              <div
                className={
                  size2 === v
                    ? `${styled.standardBoxChose2}`
                    : `${styled.standardBox2}`
                }
                onClick={() => {
                  setSize2(v)
                }}
              >
                {v}
              </div>
            </>
          )
        })}
    </>
  )

  const clotheChose = (
    <>
      <h2>商品規格</h2>
      {clotheSize.map((v, i) => {
        return (
          <>
            <div
              className={
                size2 == clotheSize[i]
                  ? `${styled.standardBoxChose}`
                  : `${styled.standardBox}`
              }
              onClick={() => {
                setSize2(v)
              }}
              key={i}
            >
              {v}
            </div>
          </>
        )
      })}
    </>
  )
  useEffect(() => {
    getRondomProductData()
  }, [product_sid])
  useEffect(() => {
    getProductData()
  }, [product_sid])
  useEffect(() => {
    getSize2()
  }, [product_sid])
  useEffect(() => {
    comMentData()
  }, [product_sid])
  return (
    <>
      <div className={styled.empty}></div>
      {comLightBox && (
        <CommentLightBox
          commentFetch={commentFetch}
          whichCom={whichCom}
          setComLightBox={setComLightBox}
        />
      )}
      <div className={styled.card}>
        <div className={styled.container}>
          {/* //bordshell */}
          {datas.map((v, i) => {
            return (
              <div className={styled.productDtail} key={v.product_sid}>
                <div className={styled.imgBox}>
                  <div className={styled.bigImg}>
                    <img
                      src={`http://localhost:3001/imgs/zx/${v.product_img}`}
                      alt=""
                      ref={changePic}
                    />
                  </div>
                  <div className={styled.imgGroup}>
                    {[...Array(5)].map((v2, i2) => {
                      return (
                        <img
                          src={`http://localhost:3001/imgs/zx/${v.product_imgs[i2]}`}
                          alt=""
                          onMouseMove={() => {
                            changePic.current.setAttribute(
                              'src',
                              `http://localhost:3001/imgs/zx/${v.product_imgs[i2]}`
                            )
                          }}
                          onMouseLeave={() => {
                            msLeave(v)
                          }}
                          key={i}
                        />
                      )
                    })}
                  </div>
                </div>

                <div className={styled.productText}>
                  <div className={styled.productTitle}>
                    <h1>{v.product_name}</h1>
                    <div className={styled.starBox}>
                      <p className={styled.write} onClick={() => {}}>
                        {[...Array(5)].map((star, index) => {
                          const tatalStar = Math.floor(avgStar)
                          index += 1
                          return (
                            <p
                              key={index}
                              className={
                                index <= tatalStar
                                  ? `${styled.on}`
                                  : `${styled.off}`
                              }
                            >
                              <span className="star">&#9733;</span>
                            </p>
                          )
                        })}
                      </p>
                      <p>{avgStar} &nbsp; </p>
                    </div>
                  </div>

                  <div className={styled.standard}>
                    {v.product_category_sid == 9 || v.product_category_sid == 10
                      ? clotheChose
                      : ''}
                    {v.product_category_sid == 7 || v.product_category_sid == 8
                      ? shoseSize
                      : ''}
                  </div>
                  <h2>金額：{moneyFormat(v.product_price)}</h2>
                  <div className={styled.howNum}>
                    <p>商品數量</p>
                    <div className={styled.numBox}>
                      <div className={styled.numBox1}>
                        <i
                          className="fa-solid fa-minus"
                          onClick={() => {
                            if (num < 2) return
                            setNum(num - 1)
                          }}
                        ></i>
                      </div>
                      <div className={styled.numBox2}>{num}</div>
                      <div className={styled.numBox3}>
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

                  <div className={styled.buttonGroup}>
                    <button
                      className={styled.cart}
                      onClick={() => {
                        if (
                          (v.product_category_sid == '7' ||
                            v.product_category_sid == '8' ||
                            v.product_category_sid == '9' ||
                            v.product_category_sid == '10') &&
                          !size2
                        ) {
                          return sweetAlert('請選尺寸')
                        }
                        addCartFunction(v)
                      }}
                    >
                      加入購物車
                    </button>
                    <Link
                      to={
                        (v.product_category_sid == '7' ||
                          v.product_category_sid == '8' ||
                          v.product_category_sid == '9' ||
                          v.product_category_sid == '10') &&
                        !size2
                          ? ''
                          : '/cart'
                      }
                    >
                      <button
                        className={styled.buy}
                        onClick={() => {
                          if (
                            (v.product_category_sid == '7' ||
                              v.product_category_sid == '8' ||
                              v.product_category_sid == '9' ||
                              v.product_category_sid == '10') &&
                            !size2
                          ) {
                            return sweetAlert('請選尺寸')
                          }
                          addProCart(
                            product_sid,
                            v.product_name,
                            size2,
                            Number(v.product_price),
                            num,
                            v.product_img
                          )
                        }}
                      >
                        直接購買
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
          <div className={styled.changeTitle}>
            <div
              className={
                introCom
                  ? `${styled.productIntro} ${styled.underLine}`
                  : `${styled.productIntro}`
              }
              onClick={(e) => {
                if (!introCom) {
                  changeBtn()
                } else {
                  return
                }
              }}
            >
              商品介紹
            </div>
            <div
              className={
                !introCom
                  ? `${styled.productIntro} ${styled.underLine}`
                  : `${styled.productIntro}`
              }
              onClick={() => {
                if (introCom) {
                  changeBtn()
                } else {
                  return
                }
              }}
            >
              商品評論({commentFetch.length})
            </div>
          </div>
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
          <div className={styled.empty}></div>
        </div>
      </div>
    </>
  )
}
