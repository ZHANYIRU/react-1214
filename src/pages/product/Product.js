import { useState, useEffect } from 'react'
// import ScrollTest from './components/scroll_test'
import { Link, useNavigate } from 'react-router-dom'
import Bear from './components/bear'
import Slider from './components/slider'
import ProductFilter from './components/product_filter'
import { useMediaQuery } from 'react-responsive'
import ToTop from './components/toTop'
import axios from 'axios'
import styled from '../../styles/product-scss/product.module.scss'
import img1 from './img/img1.jpg'
import img2 from './img/img2.jpg'
import img3 from './img/img3.jpg'

function Product() {
  const linkToDetail = useNavigate()
  //目前點選的nav
  const [nav, setNav] = useState()
  //卡片
  const [howLongCard, setHowLongCard] = useState(16)
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

  // 輸入用(可控表單元件用)
  const [inputKeyword, setInputKeyword] = useState('')
  // 按下搜尋按鈕用，真正搜尋用
  const [searchKeyword, setSearchKeyWord] = useState('')

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

  //偵測滾動時，filter要吸附的位置
  const scrollFilter = () => {
    let Window_W = window.innerWidth
    let windowScrollY = window.scrollY
    // console.log(windowScrollY)
    if (windowScrollY > 630 && Window_W > 500) {
      setFixedd(true)
    } else if (windowScrollY < 630 && Window_W > 500) {
      setFixedd(false)
    }
  }

  // const location = useLocation()
  // // 視窗寬度方法
  // const reSize = () => {
  //   let Window_W = window.innerWidth
  //   if (
  //     Window_W < 500 &&
  //     (location.pathname === '/product' || location.pathname === '/product/')
  //   ) {
  //     return setMob(true)
  //   } else if (Window_W > 500) {
  //     setMob(false)
  //   }
  // }

  // const addCard = () => {
  //   for (let i = 1; i <= datas.length; i++) {
  //     if (windowScrollY >= `${710 + 900 * i}px`) {
  //       return setHowLongCard(howLongCard + 16)
  //     }
  //   }
  // }
  // 抓取所有商品
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

  //Fetch產品
  const getProductData = async (url) => {
    try {
      const response = await axios.get(`http://localhost:3001/product/${url}`)
      const r = response.data

      setDatas(r)
    } catch (e) {
      console.log(e.message)
    }
  }

  const min = Math.min(howLongCard, datas.length)
  //-------------------------------------------------------------------
  useEffect(() => {
    getProductData('all')

    // window.addEventListener('resize', reSize)
  }, [])
  useEffect(() => {
    window.addEventListener('scroll', scrollFilter)
  }, [fixedd])

  useEffect(() => {}, [])
  return (
    <>
      <ToTop />
      <Bear />
      <div className={styled.container}>
        <div className={styled.empty}></div>
        {/* Slider */}
        <Slider data={data} fixedd={fixedd} />

        {/* 搜尋專區 */}
        {mobile ? (
          ''
        ) : (
          <div className={fixedd ? `${styled.stickyWrapSearch}` : ''}>
            <div
              className={styled.forms}
              style={search}
              onClick={(e) => {
                searchStyle(e)
              }}
            >
              <form
                action=""
                onSubmit={(e) => {
                  e.preventDefault()
                }}
              >
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
          </div>
        )}

        {/* 種類專區 */}
        <div
          className={
            fixedd ? `${styled.stickyWrapCate}` : `${styled.scrollWrap}`
          }
        >
          <div
            className={styled.product_nav}
            style={fixedd ? { marginBottom: '10px' } : {}}
          >
            <div className={styled.product_nav_box1}>
              <Link
                onClick={() => {
                  setNav('new')
                  getProductData('new')
                }}
              >
                <h2 style={nav === 'new' ? { color: 'red' } : {}}>最新上架</h2>
              </Link>
              {mobile ? <p>|</p> : ''}
              <Link
                onClick={() => {
                  setNav('hot')
                  getProductData('hot')
                }}
              >
                <h2 style={nav === 'hot' ? { color: 'red' } : {}}>熱門商品</h2>
              </Link>
              {mobile ? <p>|</p> : ''}
              <Link
                onClick={() => {
                  setNav('clothe')
                  getProductData('clothe')
                }}
              >
                <h2 style={nav === 'clothe' ? { color: 'red' } : {}}>
                  男女服飾
                </h2>
              </Link>
              {mobile ? <p>|</p> : ''}
            </div>
            <div className={styled.product_nav_box2}>
              {mobile ? '' : <p>商品類別</p>}
              {mobile ? (
                <Link to="/product/custom">
                  <h2>客製衣服</h2>
                </Link>
              ) : (
                ''
              )}
            </div>
            {mobile ? <p>|</p> : ''}
            <div className={styled.product_nav_box3}>
              <Link
                onClick={() => {
                  setNav('bag')
                  getProductData('bag')
                }}
              >
                <h2 style={nav === 'bag' ? { color: 'red' } : {}}>登山背包</h2>
              </Link>
              {mobile ? <p>|</p> : ''}
              <Link
                onClick={() => {
                  setNav('shose')
                  getProductData('shose')
                }}
              >
                <h2 style={nav === 'shose' ? { color: 'red' } : {}}>登山鞋</h2>
              </Link>
              {mobile ? <p>|</p> : ''}
              <Link
                onClick={() => {
                  setNav('accessories')
                  getProductData('accessories')
                }}
              >
                <h2 style={nav === 'accessories' ? { color: 'red' } : {}}>
                  專業配件
                </h2>
              </Link>
            </div>
          </div>
        </div>
        {/* 卡片專區 */}
        {/* {fixedd ? <div className={styled.empty}></div> : ''} */}

        <div className={styled.cardBigBox}>
          <ProductFilter
            fixedd={fixedd}
            datas={datas}
            setDatas={setDatas}
            inputKeyword={inputKeyword}
            setInputKeyword={setInputKeyword}
            setSearchKeyWord={setSearchKeyWord}
            getProductData={getProductData}
            nav={nav}
          />
          <div className={styled.cardbox}>
            {inputKeyword
              ? ''
              : Array(min)
                  .fill(1)
                  .map((v2, i) => {
                    const v = datas[i]

                    return (
                      <div className={styled.cardWrap} key={v2.product_sid}>
                        <div
                          className={styled.card}
                          onClick={() => {
                            if (
                              v.product_sid === 719 ||
                              v.product_sid === 720 ||
                              v.product_sid === 721 ||
                              v.product_sid === 722
                            ) {
                              linkToDetail(`/product/custom`)
                            } else {
                              linkToDetail(`/product/${v.product_sid}`)
                            }
                          }}
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
                            <div
                              className={v.proof !== '0' ? styled.banner2 : ''}
                            >
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
                        </div>
                      </div>
                    )
                  })}

            {/* 舊資料 */}
            {inputKeyword
              ? datas
                  .filter((v, i) => {
                    if (searchKeyword) {
                      return v.product_name.includes(searchKeyword)
                    } else {
                      return v
                    }
                  })
                  .map((v, i) => {
                    return (
                      <div className={styled.cardWrap} key={v.product_sid}>
                        <div
                          className={styled.card}
                          onClick={() => {
                            if (
                              v.product_sid === 719 ||
                              v.product_sid === 720 ||
                              v.product_sid === 721 ||
                              v.product_sid === 722
                            ) {
                              linkToDetail(`/product/custom`)
                            } else {
                              linkToDetail(`/product/${v.product_sid}`)
                            }
                          }}
                        >
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

                          {v.proof === '防水' ? (
                            <div
                              className={v.proof !== '0' ? styled.banner2 : ''}
                            >
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
                        </div>
                      </div>
                    )
                  })
              : ''}
          </div>
        </div>
        {datas.length === howLongCard ? (
          ''
        ) : (
          <div className={styled.clickme}>
            <button
              onClick={() => {
                setHowLongCard(howLongCard + 16)
              }}
            >
              更多商品
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Product
