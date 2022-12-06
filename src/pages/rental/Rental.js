import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Carousel from './components/Carousel'
import Search from './components/Search'
import RentalCard from './components/RentalCard'
import rentalcss from '../../styles/rental-scss/rental.module.scss'
// import RentalFilter from './components/RentalFilter'
// import { useLocation } from 'react-router-dom'
import CustomIcons from './components/CustomIcons'

function Rental(props) {
  const [data, setData] = useState(null)
  const [count, setCount] = useState(1)
  // const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  //搜尋文字用狀態存起來
  // const [input, setInput] = useState('')
  const [conditions, setConditions] = useState({
    search: '',
    low_price: undefined,
    high_price: undefined,
    page: 1,
    order_by: '',
    brand: [],
    label: [],
  })

  const brandOption = ['TiiTENT', 'Snow Peak', 'ZANE ARTS', 'HILLEBERG']
  const labelOption = ['二人帳', '四人帳']
  const rental_url_new = 'http://localhost:3001/rental/pageApi'

  async function getList() {
    const newConditions = {}
    for (let k in conditions) {
      if (conditions[k]) {
        newConditions[k] = conditions[k]
      }
    }
    const u = new URLSearchParams(newConditions)
    console.log(u)
    //const response = await axios.get(rental_url_new + `?page=${page}`)
    const response = await axios.get(rental_url_new + `?` + u.toString())
    console.log(response.data)
    setData(response.data.rows)
    setCount(response.data.count)
    setTotalPages(response.data.totalPages)
  }

  useEffect(() => {
    getList()
  }, [conditions])

  return (
    <>
      <div className={rentalcss.empty}></div>

      <div className={rentalcss.container}>
        {/* 製作輪播牆 */}
        <Carousel />
        {/* 搜尋元件 */}

        {/* 篩選列表 */}
        <div className={rentalcss.orderShow}>
          <div className={rentalcss.category}>
            <p>全部商品</p>
            <p>露營帳篷</p>
            <p>戶外桌椅</p>
            <p>戶外電器</p>
          </div>
          {/* <div className={rentalcss.nameSearch}></div> */}
          <div className={rentalcss.order}>
            <p>一共{count}筆數</p>
            <p
              onClick={() =>
                setConditions({ ...conditions, order_by: 'time_DESC', page: 1 })
              }
            >
              最新上架
            </p>
            <p>最熱銷</p>
            <p
              onClick={() =>
                setConditions({
                  ...conditions,
                  order_by: 'price_DESC',
                  page: 1,
                })
              }
            >
              價格高到低
            </p>
            <p
              onClick={() =>
                setConditions({ ...conditions, order_by: 'price_ASC', page: 1 })
              }
            >
              價格低到高
            </p>
            <Search
              setData={setData}
              setTotalPages={setTotalPages}
              conditions={conditions}
              setConditions={setConditions}
            />
            <i class="fa-solid fa-filter"></i>
          </div>
        </div>

        <div className={rentalcss.more}>
          <div className={rentalcss.filtermorecontainer}>
            <div className={rentalcss.kind}>
              <p>品牌</p>
              <div className={rentalcss.checkboxcontainer}>
                {brandOption.map((v, i) => {
                  return (
                    <div key={i}>
                      <input
                        type="checkbox"
                        checked={conditions.brand.includes(v)}
                        value={v}
                        onChange={(e) => {
                          const value = e.target.value
                          if (conditions.brand.includes(v)) {
                            const delbrand = conditions.brand.filter(
                              (c) => c !== value
                            )
                            setConditions({
                              ...conditions,
                              brand: delbrand,
                              page: 1,
                            })
                          } else {
                            const addbrand = conditions.brand
                            addbrand.push(value)
                            setConditions({
                              ...conditions,
                              brand: addbrand,
                              page: 1,
                            })
                          }
                        }}
                      />
                      <label htmlFor="">{v}</label>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className={rentalcss.kind}>
              <p>特色</p>
              <div className={rentalcss.checkboxcontainer}>
                {labelOption &&
                  labelOption.map((v, i) => {
                    return (
                      <div key={i}>
                        <input
                          type="checkbox"
                          checked={conditions.label.includes(v)}
                          value={v}
                          onChange={(e) => {
                            const value = e.target.value
                            if (conditions.label.includes(v)) {
                              const dellabel = conditions.label.filter(
                                (c) => c !== value
                              )
                              setConditions({
                                ...conditions,
                                label: dellabel,
                                page: 1,
                              })
                            } else {
                              const addlabel = conditions.label
                              addlabel.push(value)
                              setConditions({
                                ...conditions,
                                label: addlabel,
                                page: 1,
                              })
                            }
                          }}
                        />
                        <label htmlFor="">{v}</label>
                      </div>
                    )
                  })}
              </div>
            </div>
            <div className={rentalcss.kind}>
              <p>排序</p>
              <div className={rentalcss.checkboxcontainer}>
                <div>
                  <input
                    type="radio"
                    name="order_by"
                    value=""
                    onClick={() => {
                      setConditions({
                        ...conditions,
                        order_by: 'time_DESC',
                        page: 1,
                      })
                    }}
                  />
                  <label>最新上架</label>
                  <input
                    type="radio"
                    name="order_by"
                    value="price_DESC"
                    onClick={() =>
                      setConditions({
                        ...conditions,
                        order_by: 'price_DESC',
                        page: 1,
                      })
                    }
                  />
                  <label>價格高到低</label>
                  <input
                    type="radio"
                    name="order_by"
                    value="price_ASC"
                    onClick={() =>
                      setConditions({
                        ...conditions,
                        order_by: 'price_ASC',
                        page: 1,
                      })
                    }
                  />
                  <label>價格低到高</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 卡片元件 */}
        <div className={rentalcss.rentalProductBox}>
          {data &&
            data.map((d) => {
              return <RentalCard data={d} key={d.sid} />
            })}
        </div>
        <div className={rentalcss.pageContainer}>
          <CustomIcons
            className={rentalcss.pagination}
            totalPages={totalPages}
            conditions={conditions}
            setConditions={setConditions}
          />
        </div>
      </div>
    </>
  )
}

export default Rental
