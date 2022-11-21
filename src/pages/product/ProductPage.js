import React, { useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from '../../styles/product-scss/productPage.module.scss'
import axios from 'axios'
import { useEffect } from 'react'

export default function ProductPage() {
  const { product_sid } = useParams()
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
        <Link>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </Link>
        <button>撰寫評論</button>
      </div>
      <div className={styled.commonArea}>
        {Array(6)
          .fill(1)
          .map((v, i) => {
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

                  <div className={styled.memberName}>我愛一條柴</div>
                </div>
                <div className={styled.commonText}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                  dolor voluptas velit facere nam, cupiditate iure ratione
                </div>
                <div className={styled.howStar}>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
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
      <div className={styled.card}>
        <div className={styled.container}>
          {/* //bordshell */}
          {datas.map((v, i) => {
            return (
              <div className={styled.productDtail} key={v.product_sid}>
                <div className={styled.imgBox}>
                  <div className={styled.bigImg}>
                    <img
                      src="https://cdn1.cybassets.com/media/W1siZiIsIjE2MTQyL3Byb2R1Y3RzLzM2MzA1MjQwLzE2NjM5MDE2NDZfODM4NGYzMjY3ODcxNmYwOGQ3YTUuanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=0c0e2037acddca29"
                      alt=""
                    />
                  </div>
                  <div className={styled.imgGroup}>
                    <img
                      src="https://cdn1.cybassets.com/media/W1siZiIsIjE2MTQyL3Byb2R1Y3RzLzM2MzA1MjQwLzE2NjM5MDE2NDZfODM4NGYzMjY3ODcxNmYwOGQ3YTUuanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=0c0e2037acddca29"
                      alt=""
                    />
                    <img
                      src="https://cdn1.cybassets.com/media/W1siZiIsIjE2MTQyL3Byb2R1Y3RzLzM2MzA1MjQwLzE2NjM5MDE2NDZfODM4NGYzMjY3ODcxNmYwOGQ3YTUuanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=0c0e2037acddca29"
                      alt=""
                    />
                    <img
                      src="https://cdn1.cybassets.com/media/W1siZiIsIjE2MTQyL3Byb2R1Y3RzLzM2MzA1MjQwLzE2NjM5MDE2NDZfODM4NGYzMjY3ODcxNmYwOGQ3YTUuanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=0c0e2037acddca29"
                      alt=""
                    />
                    <img
                      src="https://cdn1.cybassets.com/media/W1siZiIsIjE2MTQyL3Byb2R1Y3RzLzM2MzA1MjQwLzE2NjM5MDE2NDZfODM4NGYzMjY3ODcxNmYwOGQ3YTUuanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=0c0e2037acddca29"
                      alt=""
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
                    <div className={styled.standardBox}>S</div>
                    <div className={styled.standardBox}>M</div>
                    <div className={styled.standardBox}>L</div>
                  </div>
                  <h2>金額：{moneyFormat(v.product_price)}</h2>
                  <div className={styled.howNum}>
                    <p>商品數量</p>
                    <div className={styled.numBox}>
                      <div className={styled.numBox1}>
                        <i className="fa-solid fa-minus"></i>
                      </div>
                      <div className={styled.numBox2}>
                        {v.product_inventory}
                      </div>
                      <div className={styled.numBox3}>
                        <i className="fa-solid fa-plus"></i>
                      </div>
                    </div>
                  </div>
                  <div className={styled.deliver}>
                    <p>配送方式</p>
                    <label htmlFor="home">宅配</label>
                    <input type="radio" id="home" name="deliver" />
                    <label htmlFor="711">超商取貨</label>
                    <input type="radio" id="711" name="deliver" />
                    <label htmlFor="shop">實體店取貨</label>
                    <input type="radio" id="shop" name="deliver" />
                  </div>
                  <div className={styled.buttonGroup}>
                    <button className={styled.cart}>加入購物車</button>
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
