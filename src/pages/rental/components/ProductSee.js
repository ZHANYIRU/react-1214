import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from '../../product/components/slider'
// import Product_filter from './product_filter'
// import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import styled from '../../../styles/rental-scss/productSee.module.scss'


function Product() {
  //圖片
  const data = [
    // {
    //   key: 1,
    //   src: img1,
    // },
    // {
    //   key: 2,
    //   src: img2,
    // },
    // {
    //   key: 3,
    //   src: img3,
    // },
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
  const { product_sid } = useParams()

  const [sid, getSid] = useState('')

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
        {/* <div className={styled.filter}></div> */}
        <div className={styled.empty}></div>
        Slider
        <Slider data={data} />
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
              <h2>最新上架</h2>
            </Link>
            <Link>
              <h2>熱門商品</h2>
            </Link>
            <Link>
              <h2>男女服飾</h2>
            </Link>
          </div>
          <div className={styled.product_nav_box2}>
            <p>商品類別</p>
          </div>
          <div className={styled.product_nav_box3}>
            <Link>
              <h2>專業用品</h2>
            </Link>
            <Link>
              <h2>飲水用品</h2>
            </Link>
            <Link>
              <h2>其他配件</h2>
            </Link>
          </div>
        </div>
        {/* 卡片專區 */}
        {/* <div className={styled.cardBigBox}> */}
        <div className={styled.cardbox}>
          {datas.map((v, i) => {
            return (
              <Link
                className={styled.card}
                key={v.product_sid}
                to={'/product/' + v.product_sid}
              >
                <div className={styled.imgWrap}>
                  <img
                    src="https://www.arcteryx.com.tw/media/catalog/product/cache/9f23c48e1ba32633494dfb89a2676b50/3/0/30698_l08370200_gamma-lt-jacket_m_habitat_1.jpg"
                    alt=""
                  />
                </div>
                <p className={styled.p}>{v.product_name}</p>
                <h2>
                  金額：<span>${v.product_price}</span>
                </h2>
              </Link>
            )
          })}
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default Product
