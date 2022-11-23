import React, { useRef, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from '../../styles/product-scss/productPage.module.scss'
import axios from 'axios'
import { useEffect } from 'react'
import ProCartContext from '../../contexts/ProCartContext'
import StarRating from './components/starRating'
import CommentLightBox from './components/CommentLightBox'
import comFakeData from './comFakeData'

export default function ProductPage() {
  const { product_sid } = useParams()
  const { addProCart } = useContext(ProCartContext)
  //哪一筆評論的Index
  const [whichCom, setWhichCom] = useState(-1)

  //燈箱切換
  const [comLightBox, setComLightBox] = useState(false)
  //換圖
  const changePic = useRef()
  // 尺寸選取
  const [size, setSize] = useState({
    S: false,
    M: false,
    L: false,
  })
  //尺寸方法
  const choseSize = (choseOption) => {
    if (choseOption === 'S') {
      const choseSizeTarget = { ...size, S: true, M: false, L: false }
      setSize(choseSizeTarget)
    } else if (choseOption === 'M') {
      const choseSizeTarget = { ...size, S: false, M: true, L: false }
      setSize(choseSizeTarget)
    } else {
      const choseSizeTarget = { ...size, S: false, M: false, L: true }
      setSize(choseSizeTarget)
    }
  }
  //選擇數量
  const [num, setNum] = useState(1)
  //商品介紹、評論
  const [introCom, setintroCom] = useState(true)
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
  const getProductData = async (url) => {
    const response = await axios.get(
      `http://localhost:3001/product/${product_sid}`
    )
    const r = response.data
    console.log(r)
    setDatas(r)
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
  // 切換開關方法
  const changeBtn = (e) => {
    setintroCom(!introCom)
  }

  // 商品介紹 or 商品評論
  const intro = datas.map((v, i) => {
    return (
      <div className={styled.introWrap}>
        <div className={styled.introTitle}>產品規格</div>
        <p className={styled.intro}>{v.product_spec}</p>
        <div className={styled.introTitle}>特色說明</div>
        <p className={styled.intro}>{v.product_feature}</p>
        <div className={styled.introTitle}>猜你喜歡</div>
        <div className={styled.guessYouLike}>
          {randomData.map((v, i) => {
            return (
              <Link
                className={styled.card}
                key={v.product_sid}
                to={'/product/' + v.product_sid}
              >
                <div>
                  <img
                    src="https://cdn1.cybassets.com/media/W1siZiIsIjE2MTQyL3Byb2R1Y3RzLzM2MzA1MjQwLzE2NjM5MDE2NDZfODM4NGYzMjY3ODcxNmYwOGQ3YTUuanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=0c0e2037acddca29"
                    alt=""
                  />
                  <p className={styled.p}>{v.product_name}</p>
                  <h2>
                    金額：<span>${v.product_price}</span>
                  </h2>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  })

  const com = (
    <div className={styled.comWrap}>
      <div className={styled.starBox}>
        <StarRating />
        <p className={styled.write} onClick={() => {}}>
          (19)
        </p>
      </div>
      <div className={styled.commonArea}>
        {comFakeData.map((v, i) => {
          return (
            <div className={styled.commonBox}>
              <div className={styled.commonTitle}>
                <div className={styled.commonTitle_img_border}>
                  <div className={styled.commonTitle_img}>
                    <img
                      src="https://cdn2.ettoday.net/images/2253/2253152.jpg"
                      alt=""
                    />
                  </div>
                </div>

                <div className={styled.memberName}>{v.name}</div>
              </div>
              <div className={styled.commonText}>{v.text}</div>
              <div className={styled.howStar}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
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
  useEffect(() => {
    getRondomProductData()
  }, [])
  useEffect(() => {
    getProductData()
  }, [])

  return (
    <>
      <div className={styled.empty}></div>
      {comLightBox && (
        <CommentLightBox
          comFakeData={comFakeData}
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
                      src="https://shoplineimg.com/5cb3fc58c267700001e04d1a/5f5a0384892c53004593cd6b/800x.webp?source_format=jpg"
                      alt=""
                      ref={changePic}
                    />
                  </div>
                  <div className={styled.imgGroup}>
                    <img
                      src="https://shoplineimg.com/5cb3fc58c267700001e04d1a/5f5a0384892c53004593cd6b/800x.webp?source_format=jpg"
                      alt=""
                      onMouseMove={() => {
                        changePic.current.setAttribute(
                          'src',
                          'https://shoplineimg.com/5cb3fc58c267700001e04d1a/5f5a0384892c53004593cd6b/800x.webp?source_format=jpg'
                        )
                      }}
                      onMouseLeave={() => {
                        changePic.current.setAttribute(
                          'src',
                          'https://shoplineimg.com/5cb3fc58c267700001e04d1a/5f5a0384892c53004593cd6b/800x.webp?source_format=jpg'
                        )
                      }}
                    />
                    <img
                      src="https://shoplineimg.com/5cb3fc58c267700001e04d1a/5f5a0384f6822100480585f0/800x.webp?source_format=jpg"
                      alt=""
                      onMouseMove={() => {
                        changePic.current.setAttribute(
                          'src',
                          'https://shoplineimg.com/5cb3fc58c267700001e04d1a/5f5a0384f6822100480585f0/800x.webp?source_format=jpg'
                        )
                      }}
                      onMouseLeave={() => {
                        changePic.current.setAttribute(
                          'src',
                          'https://shoplineimg.com/5cb3fc58c267700001e04d1a/5f5a0384892c53004593cd6b/800x.webp?source_format=jpg'
                        )
                      }}
                    />
                    <img
                      src="https://shoplineimg.com/5cb3fc58c267700001e04d1a/5f5a038499ed9f002a97789b/800x.webp?source_format=jpg"
                      alt=""
                      onMouseMove={() => {
                        changePic.current.setAttribute(
                          'src',
                          'https://shoplineimg.com/5cb3fc58c267700001e04d1a/5f5a038499ed9f002a97789b/800x.webp?source_format=jpg'
                        )
                      }}
                      onMouseLeave={() => {
                        changePic.current.setAttribute(
                          'src',
                          'https://shoplineimg.com/5cb3fc58c267700001e04d1a/5f5a0384892c53004593cd6b/800x.webp?source_format=jpg'
                        )
                      }}
                    />
                    <img
                      src="https://shoplineimg.com/5cb3fc58c267700001e04d1a/5f5a0384741e520042b11aff/800x.webp?source_format=jpg"
                      alt=""
                      onMouseMove={() => {
                        changePic.current.setAttribute(
                          'src',
                          'https://shoplineimg.com/5cb3fc58c267700001e04d1a/5f5a0384741e520042b11aff/800x.webp?source_format=jpg'
                        )
                      }}
                      onMouseLeave={() => {
                        changePic.current.setAttribute(
                          'src',
                          'https://shoplineimg.com/5cb3fc58c267700001e04d1a/5f5a0384892c53004593cd6b/800x.webp?source_format=jpg'
                        )
                      }}
                    />
                  </div>
                </div>

                <div className={styled.productText}>
                  <div className={styled.productTitle}>
                    <h1>{v.product_name}</h1>
                    <Link>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </Link>
                  </div>

                  <div className={styled.standard}>
                    <h2>商品規格</h2>
                    <div
                      className={
                        size.S
                          ? `${styled.standardBoxChose}`
                          : `${styled.standardBox}`
                      }
                      onClick={() => {
                        if (size.S) {
                          return setSize({
                            S: false,
                            M: false,
                            L: false,
                          })
                        }
                        choseSize('S')
                      }}
                    >
                      S
                    </div>
                    <div
                      className={
                        size.M
                          ? `${styled.standardBoxChose}`
                          : `${styled.standardBox}`
                      }
                      onClick={() => {
                        if (size.M) {
                          return setSize({
                            S: false,
                            M: false,
                            L: false,
                          })
                        }
                        choseSize('M')
                      }}
                    >
                      M
                    </div>
                    <div
                      className={
                        size.L
                          ? `${styled.standardBoxChose}`
                          : `${styled.standardBox}`
                      }
                      onClick={() => {
                        if (size.L) {
                          return setSize({
                            S: false,
                            M: false,
                            L: false,
                          })
                        }
                        choseSize('L')
                      }}
                    >
                      L
                    </div>
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
                  <div className={styled.deliver}>
                    <p>配送方式</p>
                    <label htmlFor="home">宅配</label>
                    <input type="radio" id="home" name="deliver" value="home" />
                    <label htmlFor="711">超商取貨</label>
                    <input type="radio" id="711" name="deliver" value="711" />
                    <label htmlFor="shop">實體店取貨</label>
                    <input type="radio" id="shop" name="deliver" value="shop" />
                  </div>
                  <div className={styled.buttonGroup}>
                    <button
                      className={styled.cart}
                      onClick={() => {
                        addProCart('50', '我是衣服', 'S', 2500, 1)
                      }}
                    >
                      加入購物車
                    </button>
                    <button className={styled.buy}>直接購買</button>
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
              商品評論
            </div>
          </div>
          {introCom ? intro : com}
          <div className={styled.empty}></div>
        </div>
      </div>
    </>
  )
}
