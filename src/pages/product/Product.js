import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Slider from './slider'
import Product_filter from './product_filter'
// import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import styled from '../../styles/product-scss/product.module.scss'
import img1 from './img/img1.jpg'
import img2 from './img/img2.jpg'
import img3 from './img/img3.jpg'

function Product() {
  //圖片
  const data = [
    {
      key: 1,
      src: img1,
    },
    {
      key: 2,
      src: img2,
    },
    {
      key: 3,
      src: img3,
    },
  ]

  //抓取fetch狀態
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

  const getProductData = async () => {
    const response = await axios.get('http://localhost:3001/product/all')
    const r = response.data
    // console.log(r)
    setDatas(r)
  }

  useEffect(() => {
    getProductData()
  }, [])

  return (
    <>
      <div className={styled.container}>
        <div className={styled.filter}></div>
        <div className={styled.empty}></div>
        {/* Slider */}
        <Slider data={data} />
        <Product_filter />
        {/* 搜尋專區 */}
        <div className={styled.form}>
          <form action="">
            <input className={styled.search} type="text" />

            <i className="fa-solid fa-magnifying-glass"></i>
          </form>
          {/* 種類專區 */}
        </div>
        <div className={styled.product_nav}>
          <div className={styled.product_nav_box1}>
            <Link>
              <div>最新上架</div>
            </Link>
            <Link>
              <div>熱門商品</div>
            </Link>
            <Link>
              <div>男女服飾</div>
            </Link>
          </div>
          <div className={styled.product_nav_box2}>
            <p>商品類別</p>
          </div>
          <div className={styled.product_nav_box3}>
            <Link>
              <div>專業用品</div>
            </Link>
            <Link>
              <div>飲水用品</div>
            </Link>
            <Link>
              <div>其他配件</div>
            </Link>
          </div>
        </div>

        {/* 卡片專區 */}
        <div className={styled.cardbox}>
          {datas.map((v, i) => {
            return (
              <div key={v.product_sid} className={styled.card}>
                <img
                  src="https://cdn1.cybassets.com/media/W1siZiIsIjE2MTQyL3Byb2R1Y3RzLzM2MzA1MjQwLzE2NjM5MDE2NDZfODM4NGYzMjY3ODcxNmYwOGQ3YTUuanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=0c0e2037acddca29"
                  alt=""
                />
                <p className={styled.p}>{v.product_name}</p>
                <h2>金額：{v.product_price}</h2>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Product
