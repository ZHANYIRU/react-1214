import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from '../../../styles/product-scss/product.module.scss'
import { filter_if } from '../if.js'
import Swal from 'sweetalert2'

export default function ProductFilter({
  fixedd,
  mob,
  datas,
  setDatas,
  setSearchKeyWord,
  inputKeyword,
  setInputKeyword,
  getProductData,
  nav,
}) {
  const [priceToggle, setPriceToggle] = useState('')
  const mobile = useMediaQuery({ query: '(max-width:390px)' })
  // const [genderFilter, setGenderFilter] = useState([{}])
  const genderOptions = ['男', '女']
  const [proofList, setProofList] = useState([])
  const wProofOptions = [
    '抗水（Water Resistant）',
    '防潑水（Water Repellent）',
    '防水（Waterproof）',
  ]
  const [genders, setGenders] = useState('')
  const [filters, setFilter] = useState({
    lowPrice: '',
    highPrice: '',
    brand: '',
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

  //fetch
  const [getBrands, setGetBrand] = useState([{}])

  const fetchBrand = async () => {
    const response = await axios.get('http://localhost:3001/product/brands')
    const r = response.data
    setGetBrand(r)
  }
  let brand_sid_num
  let brandNoReapeat
  const nowBrandSid = () => {
    //brand_sid
    brand_sid_num = datas.map((v, i) => {
      return v.brand_sid
    })
    // brand_sid_no-repeat
    brandNoReapeat = brand_sid_num
      .filter((v, i, arr) => {
        return arr.indexOf(v) === i
      })
      .sort((a, b) => {
        return a - b
      })
    return brandNoReapeat
  }

  // const [nowBrand, setNowBrand] = useState([...brandNoReapeat])
  // console.log(brandNoReapeat)

  const [filterOpen, setFilterOpen] = useState(false)

  const mbfilterRef = useRef('')

  // '抗水（Water Resistant）',
  //'防潑水（Water Repellent）',
  //'防水（Waterproof）',

  //sweetAlert2
  const sweetAlert = (text) => {
    Swal.fire({
      title: `${text}`,
      icon: 'info',
      showCancelButton: false,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    })
  }
  //判斷
  const filterRender = () => {
    if (
      filters.lowPrice &&
      filters.highPrice &&
      filters.brand &&
      (genders || proofList)
    ) {
      const data = datas.filter((v, i) => {
        return (
          (v.product_price > filters.lowPrice) &
          (v.product_price < filters.highPrice) &
          (v.brand_sid == filters.brand)
        )
      })
      filter_if(proofList, genders, data, setDatas)
    } else if (filters.lowPrice && filters.highPrice && filters.brand) {
      const data = datas.filter((v, i) => {
        return (
          (v.product_price > filters.lowPrice) &
          (v.product_price < filters.highPrice) &
          (v.brand_sid == filters.brand)
        )
      })
      setDatas(data)
    } else if (
      filters.lowPrice &&
      filters.highPrice &&
      (genders || proofList)
    ) {
      const data = datas.filter((v, i) => {
        return (
          v.product_price > filters.lowPrice &&
          v.product_price < filters.highPrice
        )
      })
      filter_if(proofList, genders, data, setDatas)
    } else if (filters.lowPrice && filters.highPrice) {
      const data = datas.filter((v, i) => {
        return (
          v.product_price > filters.lowPrice &&
          v.product_price < filters.highPrice
        )
      })
      setDatas(data)
    } else if (filters.brand && (genders || proofList)) {
      const data = datas.filter((v, i) => {
        return v.brand_sid == filters.brand
      })
      filter_if(proofList, genders, data, setDatas)
    } else if (filters.brand) {
      const data = datas.filter((v, i) => {
        return v.brand_sid == filters.brand
      })
      setDatas(data)
    } else {
      filter_if(proofList, genders, datas, setDatas)
    }
  }

  let filter = 'http://localhost:3001/product/filter'

  //金錢切換toggle
  // const priceBtn = (text) => {
  //   if (priceToggle === 'asc') {
  //     const d = [...datas]
  //     //sort無淺拷貝
  //     d.sort((a, b) => {
  //       return a.product_price - b.product_price
  //     })
  //     setDatas(d)
  //     setPriceToggle(text)
  //   } else if (priceToggle === 'desc') {
  //     const d = [...datas]
  //     //sort無淺拷貝
  //     d.sort((a, b) => {
  //       return b.product_price - a.product_price
  //     })
  //     setDatas(d)
  //     setPriceToggle(text)
  //   }
  // }

  const getData = () => {
    if (Number(filters.lowPrice) > Number(filters.highPrice)) {
      sweetAlert('請檢查價格是否輸入錯誤')
      console.log('請檢查價格是否輸入錯誤')
    } else if (
      filters.lowPrice ||
      filters.highPrice ||
      filters.brand ||
      genders ||
      proofList
    ) {
      filterRender()
    } else if (
      !filters.brand &&
      !filters.lowPrice &&
      !filters.highPrice &&
      !genders &&
      !proofList
    ) {
      console.log('請填資料')
      sweetAlert('請填資料')
    }
  }

  //-----------------
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
    <div className={fixedd ? `${styled.filter2}` : `${styled.filter}`}>
      <form onSubmit={handleFormSubmit}>
        <div className={styled.sort}>
          <h2>價格</h2>
          {!priceToggle ? (
            <i
              className="fa-solid fa-sort"
              onClick={() => {
                const d = [...datas]
                //sort無淺拷貝
                d.sort((a, b) => {
                  return a.product_price - b.product_price
                })
                setDatas(d)
                setPriceToggle('asc')
              }}
            ></i>
          ) : (
            ''
          )}
          {priceToggle === 'desc' ? (
            <i
              class="fa-solid  fa-arrow-down-wide-short"
              onClick={() => {
                const d = [...datas]
                //sort無淺拷貝
                d.sort((a, b) => {
                  return a.product_price - b.product_price
                })
                setDatas(d)
                setPriceToggle('asc')
              }}
            ></i>
          ) : (
            ''
          )}
          {priceToggle === 'asc' ? (
            <i
              class="fa-solid  fa-arrow-down-short-wide"
              onClick={() => {
                const d = [...datas]
                //sort無淺拷貝
                d.sort((a, b) => {
                  return b.product_price - a.product_price
                })
                setDatas(d)
                setPriceToggle('desc')
              }}
            ></i>
          ) : (
            ''
          )}
        </div>
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
          <option value="0">請選出廠牌</option>
          {getBrands.map((v, i) => {
            if (nowBrandSid().includes(v.brand_sid)) {
              return (
                <option key={v.brand_sid} value={v.brand_sid}>
                  {v.brand_name}
                </option>
              )
            }
          })}
        </select>

        {nav !== 'accessories' && (
          <>
            <div className={styled.genderRadio}>
              {genderOptions.map((v, i) => {
                return (
                  <div key={i} className={styled.genderBox}>
                    <input
                      type="radio"
                      id={v}
                      checked={genders === v}
                      name="gender"
                      value={v}
                      onChange={(e) => {
                        setGenders(e.target.value)
                      }}
                    ></input>
                    <label htmlFor={v}> {v}</label>
                  </div>
                )
              })}
            </div>
            <h2> 防水等級</h2>
            <div className={styled.checkBoxWrap}>
              {wProofOptions.map((v, i) => {
                return (
                  <div className={styled.checkBox} key={i}>
                    <input
                      type="checkbox"
                      checked={proofList.includes(v)}
                      value={v}
                      id={i}
                      onChange={(e) => {
                        const value = e.target.value

                        if (proofList.includes(value)) {
                          // 如果此項目值在state陣列中 -> 移出state陣列
                          const newProofList = proofList.filter(
                            (v2, i2) => v2 !== value
                          )
                          setProofList(newProofList)
                        } else {
                          // 如果不在此state陣列中 -> 加到state陣列中
                          const newProofList = [...proofList, value]
                          setProofList(newProofList)
                        }
                      }}
                    />
                    <label htmlFor={i}>{v}</label>
                  </div>
                )
              })}
            </div>
          </>
        )}
        <div className={styled.btnGroup}>
          <button type="submit" className={styled.filterButton}>
            送出
          </button>
          <button
            type="button"
            className={styled.filterButton}
            onClick={() => {
              if (!nav) {
                getProductData('all')
              }
              getProductData(nav)
              setFilter({
                lowPrice: '',
                highPrice: '',
                brand: '',
                gender: '1',
                wProof: '1',
              })
              setProofList([])
              setGenders('')
            }}
          >
            清除
          </button>
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
          <div className={styled.icon}>
            {!priceToggle ? (
              <i
                className="fa-solid fa-sort"
                onClick={() => {
                  const d = [...datas]
                  //sort無淺拷貝
                  d.sort((a, b) => {
                    return a.product_price - b.product_price
                  })
                  setDatas(d)
                  setPriceToggle('asc')
                }}
              ></i>
            ) : (
              ''
            )}
            {priceToggle === 'desc' ? (
              <i
                class="fa-solid  fa-arrow-down-wide-short"
                onClick={() => {
                  const d = [...datas]
                  //sort無淺拷貝
                  d.sort((a, b) => {
                    return a.product_price - b.product_price
                  })
                  setDatas(d)
                  setPriceToggle('asc')
                }}
              ></i>
            ) : (
              ''
            )}
            {priceToggle === 'asc' ? (
              <i
                class="fa-solid  fa-arrow-down-short-wide"
                onClick={() => {
                  const d = [...datas]
                  //sort無淺拷貝
                  d.sort((a, b) => {
                    return b.product_price - a.product_price
                  })
                  setDatas(d)
                  setPriceToggle('desc')
                }}
              ></i>
            ) : (
              ''
            )}

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
          {getBrands.map((v, i) => {
            if (nowBrandSid().includes(v.brand_sid)) {
              return (
                <option key={v.brand_sid} value={v.brand_sid}>
                  {v.brand_name}
                </option>
              )
            }
          })}
        </select>
        {nav !== 'accessories' && (
          <>
            <div className={styled.genderRadio}>
              {genderOptions.map((v, i) => {
                return (
                  <div key={i} className={styled.genderBox}>
                    <input
                      type="radio"
                      id={v}
                      checked={genders === v}
                      name="gender"
                      value={v}
                      onChange={(e) => {
                        setGenders(e.target.value)
                      }}
                    ></input>
                    <label htmlFor={v}> {v}</label>
                  </div>
                )
              })}
            </div>
            <h2> 防水等級</h2>
            <div className={styled.checkBoxWrap}>
              {wProofOptions.map((v, i) => {
                return (
                  <div className={styled.checkBox} key={i}>
                    <input
                      type="checkbox"
                      checked={proofList.includes(v)}
                      value={v}
                      id={i}
                      onChange={(e) => {
                        const value = e.target.value

                        if (proofList.includes(value)) {
                          // 如果此項目值在state陣列中 -> 移出state陣列
                          const newProofList = proofList.filter(
                            (v2, i2) => v2 !== value
                          )
                          setProofList(newProofList)
                        } else {
                          // 如果不在此state陣列中 -> 加到state陣列中
                          const newProofList = [...proofList, value]
                          setProofList(newProofList)
                        }
                      }}
                    />
                    <label htmlFor={i}>{v}</label>
                  </div>
                )
              })}
            </div>
          </>
        )}
        <div className={styled.btnGroup}>
          <button type="submit" className={styled.filterButton}>
            送出
          </button>
          <button
            type="button"
            className={styled.filterButton}
            onClick={() => {
              if (!nav) {
                getProductData('all')
              }
              getProductData(nav)
              setFilter({
                lowPrice: '',
                highPrice: '',
                brand: '',
                gender: '1',
                wProof: '1',
              })
              setProofList([])
              setGenders('')
            }}
          >
            清除
          </button>
        </div>
      </form>
    </div>
  )
  useEffect(() => {
    fetchBrand()
  }, [])

  return (
    <>
      {mobile || webFilter}
      {mobile && mobFilter}
    </>
  )
}
