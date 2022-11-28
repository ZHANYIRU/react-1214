import { useState, useEffect, useRef } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import Slider from './components/slider'
import Product_filter from './components/product_filter'
import { useMediaQuery } from 'react-responsive'

import axios from 'axios'
import styled from '../../styles/product-scss/product.module.scss'
import img1 from './img/img1.jpg'
import img2 from './img/img2.jpg'
import img3 from './img/img3.jpg'

function Product() {
  // 輸入用(可控表單元件用)
  const [inputKeyword, setInputKeyword] = useState('')
  // 按下搜尋按鈕用，真正搜尋用
  const [searchKeyword, setSearchKeyWord] = useState('')
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
  // search style
  const [search, setSearch] = useState({
    width: '10%',
  })

  const searchStyle = (e) => {
    e.preventDefault()
    if (search.width === '10%') {
      setSearch({ ...search, width: '40%' })
    }
  }

  //format currency
  const moneyFormat = (price) => {
    let a = Number(price)
    let b = a.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })
    let c = b.split('.')
    return c[0]
  }

  // 手機板判定
  const mobile = useMediaQuery({ query: '(max-width:390px)' })
  //附style給filter
  const [fixedd, setFixedd] = useState(false)
  //偵測是否為手機版面
  const [mob, setMob] = useState(false)
  const filterRef = useRef('')
  //偵測滾動時，filter要吸附的位置
  const scrollFilter = () => {
    const windowScrollY = window.scrollY
    let Window_W = window.innerWidth
    if (windowScrollY > 770 && Window_W > 500) {
      setFixedd(true)
    } else if (windowScrollY < 770 && Window_W > 500) {
      setFixedd(false)
    }
  }

  const location = useLocation()
  // 視窗寬度方法
  const reSize = () => {
    let Window_W = window.innerWidth
    if (
      Window_W < 500 &&
      (location.pathname === '/product' || location.pathname === '/product/')
    ) {
      return setMob(true)
    } else if (Window_W > 500) {
      setMob(false)
    }
  }
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

  //Fetch產品
  const getProductData = async (url) => {
    const response = await axios.get(`http://localhost:3001/product/${url}`)
    const r = response.data
    // console.log(r)
    setDatas(r)
  }

  //-------------------------------------------------------------------
  useEffect(() => {
    getProductData('all')

    window.addEventListener('resize', reSize)
  }, [])
  useEffect(() => {
    window.addEventListener('scroll', scrollFilter)
  }, [fixedd])

  return (
    <>
      <div className={styled.container}>
        <div className={styled.empty}></div>
        {/* Slider */}
        <Slider data={data} />

        {/* 搜尋專區 */}
        {mobile ? (
          ''
        ) : (
          <div
            className={styled.forms}
            style={search}
            onClick={(e) => {
              searchStyle(e)
            }}
          >
            <form action="">
              <input
                className={styled.search}
                type="text"
                value={inputKeyword}
                onChange={(e) => {
                  setInputKeyword(e.target.value)
                }}
              />

              <i
                className="fa-solid fa-magnifying-glass"
                onClick={() => {
                  setSearchKeyWord(inputKeyword)
                }}
              ></i>
            </form>
          </div>
        )}

        {/* 種類專區 */}
        <div className={styled.product_nav} onDrag={() => {}}>
          <div className={styled.product_nav_box1}>
            <Link
              onClick={() => {
                getProductData('new')
              }}
            >
              <h2>最新上架</h2>
            </Link>
            {mobile ? <p>|</p> : ''}
            <Link
              onClick={() => {
                getProductData('hot')
              }}
            >
              <h2>熱門商品</h2>
            </Link>
            {mobile ? <p>|</p> : ''}
            <Link
              onClick={() => {
                getProductData('clothe')
              }}
            >
              <h2>男女服飾</h2>
            </Link>
            {mobile ? <p>|</p> : ''}
          </div>
          <div className={styled.product_nav_box2}>
            <p>商品類別</p>
          </div>
          <div className={styled.product_nav_box3}>
            <Link
              onClick={() => {
                getProductData('bag')
              }}
            >
              <h2>登山背包</h2>
            </Link>
            {mobile ? <p>|</p> : ''}
            <Link
              onClick={() => {
                getProductData('shose')
              }}
            >
              <h2>登山鞋</h2>
            </Link>
            {mobile ? <p>|</p> : ''}
            <Link
              onClick={() => {
                getProductData('accessories')
              }}
            >
              <h2>專業配件</h2>
            </Link>
          </div>
        </div>

        {/* 卡片專區 */}

        {/* <div className={styled.cardBigBox}> */}
        <Product_filter
          fixedd={fixedd}
          datas={datas}
          setDatas={setDatas}
          inputKeyword={inputKeyword}
          setInputKeyword={setInputKeyword}
          setSearchKeyWord={setSearchKeyWord}
          getProductData={getProductData}
        />
        <div className={styled.cardbox}>
          {datas
            .filter((v, i) => {
              return v.product_name.includes(searchKeyword)
            })
            .map((v, i) => {
              return (
                <Link
                  className={styled.card}
                  key={v.product_sid}
                  to={'/product/' + v.product_sid}
                >
                  {/* 右上角布條 抗水 防潑水 */}
                  {v.proof === '抗水' || '防潑水' ? (
                    <div
                      className={v.proof !== '0' ? styled.banner : ''}
                      style={
                        v.proof === '防潑水'
                          ? { backgroundColor: 'rgb(0, 190, 164)' }
                          : {}
                      }
                    >
                      {v.proof !== '0' ? v.proof : ''}
                    </div>
                  ) : (
                    ''
                  )}
                  {/* 右上角布條  防水 */}
                  {v.proof === '防水' ? (
                    <div className={v.proof !== '0' ? styled.banner2 : ''}>
                      {v.proof !== '0' ? v.proof : ''}
                    </div>
                  ) : (
                    ''
                  )}
                  <div className={styled.imgWrap}>
                    <img
                      src={`http://localhost:3001/imgs/zx/${v.product_img}`}
                      alt=""
                    />
                  </div>
                  <p className={styled.p}>{v.product_name}</p>
                  <h2>
                    金額：<span>{moneyFormat(v.product_price)}</span>
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
