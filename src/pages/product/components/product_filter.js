import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from '../../../styles/product-scss/product.module.scss'

export default function ProductFilter({
  fixedd,
  mob,
  setMob,
  filterRef,
  setFromFilterDataCard,
  setFromFilterDataGender,
  datas,
  setDatas,
}) {
  const mobile = useMediaQuery({ query: '(max-width:390px)' })
  // const [genderFilter, setGenderFilter] = useState([{}])
  const genderOptions = ['男', '女']
  const [genders, setGenders] = useState('')
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
    getData()
  }

  // const [lowPrice, setLowPrice] = useState('')
  // const [highPrice, setHighPrice] = useState('')
  // const [brand, setBrand] = useState('')
  const brandOptions = [
    { brand: 'Arcteryx 始祖鳥', id: 7 },
    { brand: 'nnnnnnn', id: 1 },
  ]

  const [filterOpen, setFilterOpen] = useState(false)

  // const [datas2, setDatas2] = useState([{}])

  const mbfilterRef = useRef('')

  // let allProduct = 'http://localhost:3001/product/all'
  // let price = 'http://localhost:3001/product/price'
  // let brands = 'http://localhost:3001/product/brand'
  // let price_brand = 'http://localhost:3001/product/filter'

  const filterRender = async (rotues) => {
    const response = await axios.post(rotues, {
      ...filters,
    })
    const data = response.data
    setDatas(data)
    setFromFilterDataCard(datas)
    setFromFilterDataGender(genders)
    console.log(data)
  }

  let filter = 'http://localhost:3001/product/filter'
  const getData = async () => {
    if (Number(filters.lowPrice) > Number(filters.highPrice)) {
      alert('請檢查價格是否輸入錯誤')
      console.log('請檢查價格是否輸入錯誤')
    } else if (genders) {
      filterRender(filter)
    } else if (filters.lowPrice && filters.highPrice && filters.brand) {
      filterRender(filter)
    } else if (
      (filters.lowPrice && filters.highPrice) ||
      (filters.lowPrice && filters.highPrice && filters.brand === -1)
    ) {
      filterRender(filter)
    } else if (filters.brand) {
      filterRender(filter)
    } else if (!filters.brand || !filters.lowPrice || !filters.highPrice) {
      // alert('請填資料')
      console.log('請填資料')
    }
  }

  // const filterToggle
  const filterToggle = () => {
    if (!filterOpen) {
      mbfilterRef.current.style.height = '430px'
      mbfilterRef.current.style.backgroundColor = '#F5F5F5'
      setFilterOpen(true)
    } else {
      mbfilterRef.current.style.height = ''
      mbfilterRef.current.style.backgroundColor = ''
      setFilterOpen(false)
    }
  }

  // filter樣式 (電腦版)
  const webFilter = (
    <div
      className={fixedd ? `${styled.filter2}` : `${styled.filter}`}
      ref={filterRef}
    >
      {mob ? '' : ''}
      <form onSubmit={handleFormSubmit}>
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
          value={filters.brand}
          onChange={handleFieldChange}
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
          {genderOptions.map((v, i) => {
            return (
              <div key={i} className={styled.genderBox}>
                <input
                  type="radio"
                  checked={genders === v}
                  value={v}
                  onChange={(e) => {
                    setGenders(e.target.value)
                  }}
                ></input>
                <label> {v}</label>
              </div>
            )
          })}
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

        <button type="submit" className={styled.filterButton}>
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
      <form action="" onSubmit={handleFormSubmit}>
        <div className={styled.filterTop}>
          <div className={styled.forms}>
            <form action="">
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
          value={filters.brand}
          onChange={handleFieldChange}
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
          {genderOptions.map((v, i) => {
            return (
              <div key={i} className={styled.genderBox}>
                <input
                  type="radio"
                  checked={genders === v}
                  value={v}
                  onChange={(e) => {
                    setGenders(e.target.value)
                  }}
                ></input>
                <label> {v}</label>
              </div>
            )
          })}
          {/* <div className={styled.genderBox}>
            <label htmlFor="male">男性</label>
            <input
              type="radio"
              id="male"
              name="gender"
              checked={sex === 'male'}
              value={filter.gender}
              onChange={handleFieldChange}
            />
          </div>
          <div className={styled.genderBox}>
            <label htmlFor="female">女性</label>
            <input
              type="radio"
              id="female"
              name="gender"
              checked={sex === 'female'}
              value="female"
              onChange={handleFieldChange}
            />
          </div> */}
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
          // onClick={(e) => {
          //   e.preventDefault()
          //
          //   // filterData()
          // }}
          className={styled.filterButton}
        >
          送出
        </button>
      </form>
    </div>
  )
  useEffect(() => {}, [])
  return (
    <>
      {mobile || webFilter}
      {mobile && mobFilter}
    </>
  )
}
