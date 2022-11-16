import React from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from '../../styles/product-scss/productPage.module.scss'

export default function ProductPage() {
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
  const { product_sid } = useParams()
  return (
    <>
      <div className={styled.empty}></div>
      <div className={styled.container}>
        <div className={styled.card}>
          {/* //bordshell */}
          {productData.map((v, i) => {
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
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                    </Link>
                  </div>

                  <div className={styled.standard}>
                    <h2>商品規格</h2>
                    <div className={styled.standardBox}>S</div>
                    <div className={styled.standardBox}>M</div>
                    <div className={styled.standardBox}>L</div>
                  </div>
                  <h2>金額：{v.product_price}</h2>
                  <div className={styled.howNum}>
                    <p>商品數量</p>
                    <div className={styled.numBox}>
                      <div className={styled.numBox1}>-</div>
                      <div className={styled.numBox2}>
                        {v.product_inventory}
                      </div>
                      <div className={styled.numBox3}>+</div>
                    </div>
                  </div>
                  <div className={styled.deliver}>
                    <p>配送方式：</p>
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
        </div>
      </div>
      <div>555</div>
      <div>{product_sid}</div>
    </>
  )
}
