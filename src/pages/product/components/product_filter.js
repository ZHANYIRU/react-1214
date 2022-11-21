import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from '../../../styles/product-scss/product.module.scss'

export default function ProductFilter({ fixedd, mob, setMob, filterRef }) {
  const mobile = useMediaQuery({ query: '(max-width:390px)' })
  const [filters, setFilter] = useState({
    lowPrice: '',
    highPrice: '',
    brand: '',
    gender: '',
  })
  // 輸入時抓到value
  const handleFieldChange = (e) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value }
    setFilter(newFilters)
  }
  //按下去後的做動
  const handleFormSubmit = (e) => {
    // 阻擋預設form送出的行為
    e.preventDefault()

    // 得到輸入值的方式
    // 第1種，從state直接得到
    console.log(filters)
  }

  const [lowPrice, setLowPrice] = useState('')
  const [highPrice, setHighPrice] = useState('')
  const brandOptions = [
    { brand: 'Arcteryx 始祖鳥', id: 7 },
    { brand: 'nnnnnnn', id: 1 },
  ]
  const [brand, setBrand] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)

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

  const mbfilterRef = useRef('')

  // let allProduct = 'http://localhost:3001/product/all'
  // let price = 'http://localhost:3001/product/price'
  // let brands = 'http://localhost:3001/product/brand'
  // let price_brand = 'http://localhost:3001/product/filter'
  let filter = 'http://localhost:3001/product/filter'
  const getData = async (rotues) => {
    if (filters.lowPrice && filters.highPrice) {
      const response = await axios.post(rotues, {
        lowPrice: filters.lowPrice,
        highPrice: filters.highPrice,
      })
      const data = response.data
      console.log(data)
    } //else if (
    //   (lowPrice && highPrice) ||
    //   (lowPrice && highPrice && brand === -1)
    // ) {
    //   const response = await axios.post(rotues, {
    //     lowPrice: [lowPrice],
    //     highPrice: [highPrice],
    //   })
    //   const data = response.data
    //   console.log(data)
    // } else if (brand) {
    //   const response = await axios.post(rotues, {
    //     brand: [brand],
    //   })
    //   const data = response.data
    //   console.log(data)
    // }
    // else if (!brand || !lowPrice || !highPrice) {
    //   // alert('請填資料')
    // }
  }

  // const filterToggle
  const filterToggle = () => {
    if (!filterOpen) {
      // mbfilterRef.current.style = 'borderRadius: 10px'
      mbfilterRef.current.style.height = '430px'
      mbfilterRef.current.style.backgroundColor = '#F5F5F5'
      // mbfilterRef.current.style = 'background-Color : #F5F5F5'
      // borderRadius: '10px',
      // backgroundColor: '#F5F5F5',
      // boxShadow: '3px 3px 6px rgb(127, 126, 126)',
      // height: '380px',
      setFilterOpen(true)
    } else {
      mbfilterRef.current.style.height = ''
      mbfilterRef.current.style.backgroundColor = ''

      setFilterOpen(false)
    }
  }

  const filterData = () => {
    getData(filter)
  }

  // filter樣式 (電腦版)
  const webFilter = (
    <div
      className={fixedd ? `${styled.filter2}` : `${styled.filter}`}
      ref={filterRef}
    >
      {mob ? '' : ''}
      <form action="">
        <h2>價格</h2>
        <div className={styled.pricebox}>
          <input
            size="5"
            type="text"
            placeholder="最低價格"
            name="lowPrice"
            value={lowPrice}
            onChange={(e) => {
              setLowPrice(e.target.value)
            }}
          />
          <div className={styled.dash}></div>
          <div className="dash"></div>
          <input
            size="5"
            type="text"
            placeholder="最高價格"
            name="highPrice"
            value={highPrice}
            onChange={(e) => {
              setHighPrice(e.target.value)
            }}
          />
        </div>
        <h2> 品牌</h2>
        <select
          name="brand"
          id=""
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value)
          }}
          className={styled.filterSelect}
        >
          <option value="">請選出廠牌</option>
          {brandOptions.map((v, i) => {
            return (
              <option key={i} value={v.id}>
                {v.brand}
              </option>
            )
          })}
        </select>
        <div className={styled.genderRadio}>
          <div className={styled.genderBox}>
            <label htmlFor="male">男性</label>
            <input type="radio" id="male" name="gender" value="male" />
          </div>
          <div className={styled.genderBox}>
            <label htmlFor="female">女性</label>
            <input type="radio" id="female" name="gender" value="female" />
          </div>
        </div>
        <h2> 防水等級</h2>
        <div className={styled.checkBoxWrap}>
          <div className={styled.checkBox}>
            <input type="checkbox" id="wRes" value="wRes" name="wRes" />
            <label htmlFor="wRes">抗水（Water Resistant）</label>
          </div>
          <div className={styled.checkBox}>
            <input type="checkbox" id="wRep" value="wRep" name="wRep" />
            <label htmlFor="wRep">防潑水（Water Repellent）</label>
          </div>
          <div className={styled.checkBox}>
            <input type="checkbox" id="wProof" value="wProof" name="proof" />
            <label htmlFor="wProof">防水（Waterproof）</label>
          </div>
        </div>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            filterData()
          }}
          className={styled.filterButton}
        >
          送出
        </button>
        <hr />
        <div className={styled.star}>
          <Link>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </Link>

          <Link>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </Link>

          <Link>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </Link>

          <Link>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </Link>

          <Link>
            <i className="fa-solid fa-star"></i>
          </Link>
        </div>
      </form>
    </div>
  )

  //手機版面
  const mobFilter = (
    <div className={styled.mbfilter} ref={mbfilterRef}>
      <form action="">
        <div className={styled.filterTop}>
          <div className={styled.forms}>
            <form action="" onSubmit={handleFormSubmit}>
              <input className={styled.search} type="text" />

              <i className="fa-solid fa-magnifying-glass"></i>
            </form>
          </div>
          <div className={styled.icon}>
            <i className="fa-solid fa-sort"></i>
            <i
              className="fa-solid fa-filter"
              onClick={() => {
                filterToggle()
              }}
            ></i>
          </div>
        </div>
        <h2>價格</h2>
        <div className={styled.pricebox}>
          <input
            size="5"
            type="text"
            placeholder="最低價格"
            name="lowPrice"
            value={filters.lowPrice}
            onChange={handleFieldChange}
          />
          <div className={styled.dash}></div>
          <div className="dash"></div>
          <input
            size="5"
            type="text"
            placeholder="最高價格"
            name="highPrice"
            value={filters.highPrice}
            onChange={handleFieldChange}
          />
        </div>
        <h2> 品牌</h2>
        <select
          name="brand"
          id=""
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value)
          }}
          className={styled.filterSelect}
        >
          <option value="">請選出廠牌</option>
          {brandOptions.map((v, i) => {
            return (
              <option key={i} value={v.id}>
                {v.brand}
              </option>
            )
          })}
        </select>
        <div className={styled.genderRadio}>
          <div className={styled.genderBox}>
            <label htmlFor="male">男性</label>
            <input type="radio" id="male" name="sex" value="male" />
          </div>
          <div className={styled.genderBox}>
            <label htmlFor="female">女性</label>
            <input type="radio" id="female" name="sex" value="female" />
          </div>
        </div>
        <h2> 防水等級</h2>
        <div className={styled.checkBoxWrap}>
          <div className={styled.checkBox}>
            <input type="checkbox" id="wRes" value="wRes" />
            <label htmlFor="wRes">抗水（Water Resistant）</label>
          </div>
          <div className={styled.checkBox}>
            <input type="checkbox" id="wRep" value="wRep" />
            <label htmlFor="wRep">防潑水（Water Repellent）</label>
          </div>
          <div className={styled.checkBox}>
            <input type="checkbox" id="wProof" value="wProof" />
            <label htmlFor="wProof">防水（Waterproof）</label>
          </div>
        </div>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            filterData()
          }}
          className={styled.filterButton}
        >
          送出
        </button>
      </form>
    </div>
  )
  useEffect(() => {
    // window.addEventListener('resize', reSize)
  }, [])
  return (
    <>
      {mobile || webFilter}
      {mobile && mobFilter}
    </>
  )
}
