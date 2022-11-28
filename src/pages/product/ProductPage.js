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
  // //fetchSize
  const [fetchSize, setFetchSize] = useState([{}])
  // 尺寸選取
  const [size2, setSize2] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ])
  //預設值
  const shoseDefaultSize = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]
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

  const whatSize = (v) => {
    if (Object.values(size)[0]) {
      return 'S'
    } else if (Object.values(size)[1]) {
      return 'M'
    } else if (Object.values(size)[2]) {
      return 'L'
    } else if (size2[0]) {
      if (v.product_category_sid == 7) {
        return 'US8'
      } else if (v.product_category_sid == 8) {
        return 'US6'
      }
    } else if (size2[1]) {
      if (v.product_category_sid == 7) {
        return 'US8.5'
      } else if (v.product_category_sid == 8) {
        return 'US6.5'
      }
    } else if (size2[2]) {
      if (v.product_category_sid == 7) {
        return 'US9'
      } else if (v.product_category_sid == 8) {
        return 'US7'
      }
    } else if (size2[3]) {
      if (v.product_category_sid == 7) {
        return 'US9.5'
      } else if (v.product_category_sid == 8) {
        return 'US7.5'
      }
    } else if (size2[4]) {
      if (v.product_category_sid == 7) {
        return 'US10'
      } else if (v.product_category_sid == 8) {
        return 'US8'
      }
    } else if (size2[5]) {
      if (v.product_category_sid == 7) {
        return 'US10.5'
      } else if (v.product_category_sid == 8) {
        return 'US8.5'
      }
    } else if (size2[6]) {
      if (v.product_category_sid == 7) {
        return 'US11'
      } else if (v.product_category_sid == 8) {
        return 'US9'
      }
    } else if (size2[7]) {
      if (v.product_category_sid == 7) {
        return 'US11.5'
      } else if (v.product_category_sid == 8) {
        return 'US9.5'
      }
    }
  }
  //尺寸方法 (衣服)
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
  const getProductData = async () => {
    const response = await axios.get(
      `http://localhost:3001/product/${product_sid}`
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
  const shoseSize = () => {
    return (
      <>
        <h2>商品規格</h2>
        {fetchSize.map((v, i) => {
          return (
            <>
              <div
                className={
                  size2[i]
                    ? `${styled.standardBoxChose2}`
                    : `${styled.standardBox2}`
                }
                onClick={() => {
                  const newSize = [...shoseDefaultSize]
                  newSize[i] = true
                  setSize2(newSize)
                }}
              >
                {v.size}
              </div>
            </>
          )
        })}
      </>
    )
  }
  const clotheChose = (
    <>
      <h2>商品規格</h2>
      <div
        className={
          size.S ? `${styled.standardBoxChose}` : `${styled.standardBox}`
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
          size.M ? `${styled.standardBoxChose}` : `${styled.standardBox}`
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
          size.L ? `${styled.standardBoxChose}` : `${styled.standardBox}`
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
    </>
  )
  useEffect(() => {
    getRondomProductData()
  }, [])
  useEffect(() => {
    getProductData()
  }, [product_sid])
  useEffect(() => {
    getSize2()
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
                      src={`http://localhost:3001/imgs/zx/${v.product_img}`}
                      alt=""
                      ref={changePic}
                    />
                  </div>
                  <div className={styled.imgGroup}>
                    <img
                      src={`http://localhost:3001/imgs/zx/${v.product_imgs[0]}`}
                      alt=""
                      onMouseMove={() => {
                        changePic.current.setAttribute(
                          'src',
                          `http://localhost:3001/imgs/zx/${v.product_imgs[0]}`
                        )
                      }}
                      onMouseLeave={() => {
                        msLeave(v)
                      }}
                    />
                    <img
                      src={`http://localhost:3001/imgs/zx/${v.product_imgs[1]}`}
                      alt=""
                      onMouseMove={() => {
                        changePic.current.setAttribute(
                          'src',
                          `http://localhost:3001/imgs/zx/${v.product_imgs[1]}`
                        )
                      }}
                      onMouseLeave={() => {
                        msLeave(v)
                      }}
                    />
                    <img
                      src={`http://localhost:3001/imgs/zx/${v.product_imgs[2]}`}
                      alt=""
                      onMouseMove={() => {
                        changePic.current.setAttribute(
                          'src',
                          `http://localhost:3001/imgs/zx/${v.product_imgs[2]}`
                        )
                      }}
                      onMouseLeave={() => {
                        msLeave(v)
                      }}
                    />
                    <img
                      src={`http://localhost:3001/imgs/zx/${v.product_imgs[3]}`}
                      alt=""
                      onMouseMove={() => {
                        changePic.current.setAttribute(
                          'src',
                          `http://localhost:3001/imgs/zx/${v.product_imgs[3]}`
                        )
                      }}
                      onMouseLeave={() => {
                        msLeave(v)
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
                    {v.product_category_sid == 9 || v.product_category_sid == 10
                      ? clotheChose
                      : ''}
                    {v.product_category_sid == 7 || v.product_category_sid == 8
                      ? shoseSize(v)
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
                  {/* <div className={styled.deliver}>
                    <p>配送方式</p>
                    <label htmlFor="home">宅配</label>
                    <input type="radio" id="home" name="deliver" value="home" />
                    <label htmlFor="711">超商取貨</label>
                    <input type="radio" id="711" name="deliver" value="711" />
                    <label htmlFor="shop">實體店取貨</label>
                    <input type="radio" id="shop" name="deliver" value="shop" />
                  </div> */}
                  <div className={styled.buttonGroup}>
                    <button
                      className={styled.cart}
                      onClick={async () => {
                        const SML = await whatSize(v)
                        addProCart(
                          product_sid,
                          v.product_name,
                          SML,
                          Number(v.product_price),
                          num,
                          v.product_img
                        )
                      }}
                    >
                      加入購物車
                    </button>
                    <Link to="/cart">
                      <button
                        className={styled.buy}
                        onClick={async () => {
                          let SML = await whatSize(v)

                          addProCart(
                            product_sid,
                            v.product_name,
                            SML,
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
