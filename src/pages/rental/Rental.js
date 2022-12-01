import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Carousel from './components/Carousel'
import Search from './components/Search'
import RentalCard from './components/RentalCard'
import rentalcss from '../../styles/rental-scss/rental.module.scss'
// import RentalFilter from './components/RentalFilter'
import { useLocation } from 'react-router-dom'
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
  })

  const rental_url_new = 'http://localhost:3001/rental/pageApi'

  async function getList() {
    const newConditions = {}
    for (let k in conditions) {
      if (conditions[k]) {
        newConditions[k] = conditions[k]
      }
    }
    const u = new URLSearchParams(newConditions)
    //const response = await axios.get(rental_url_new + `?page=${page}`)
    const response = await axios.get(rental_url_new + `?` + u.toString())
    console.log(response.data)
    setData(response.data.rows)
    setCount(response.data.count)
    setTotalPages(response.data.totalPages)
  }

  // 這兩種篩選最終都要廢棄
  // const priceOrder = function (text) {
  //   const newData = [...data]

  //   newData.sort((a, b) => {
  //     if (text === 'lowToHigh') {
  //       return a.rental_price - b.rental_price
  //     } else {
  //       return b.rental_price - a.rental_price
  //     }
  //   })
  //   setData(newData)
  // }
  // const timeOrder = function () {
  //   const newData = [...data]
  //   newData.sort((a, b) => {
  //     return Date.parse(a.rental_time) - Date.parse(b.rental_time)
  //   })
  //   setData(newData)
  // }
  useEffect(() => {
    getList()
  }, [conditions])

  return (
    <>
      <div className={rentalcss.empty}></div>
      {/*  <button
        onClick={() => {
          setPage(page + 1)
        }}
      >
        +
      </button> */}

      {/* <RentalFilter /> */}
      <div className={rentalcss.container}>
        {/* 製作輪播牆 */}
        <Carousel />
        {/* 搜尋元件 */}
        <Search
          setData={setData}
          setTotalPages={setTotalPages}
          conditions={conditions}
          setConditions={setConditions}
        />

        {/* 篩選列表 */}
        <div className={rentalcss.orderShow}>
          <div className={rentalcss.filtermore}>
            <h2>進階搜尋</h2>
            <i className="fa fa-angle-double-down" aria-hidden="true"></i>
          </div>
          <div className={rentalcss.order}>
            <p>一共{count}筆數</p>
            <p>最新上架</p>
            <p>最熱銷</p>
            <p
              onClick={() =>
                setConditions({ ...conditions, order_by: 'price_DESC' })
              }
            >
              價格高到低
            </p>
            <p
              onClick={() =>
                setConditions({ ...conditions, order_by: 'price_ASC' })
              }
            >
              價格低到高
            </p>
          </div>
        </div>

        <div className={rentalcss.more}>
          <div className={rentalcss.filtermorecontainer}>
            <div className={rentalcss.kind}>
              <p>品牌</p>
              <div className={rentalcss.checkboxcontainer}>
                <div>
                  <input type="checkbox" />
                  <label>測試資料</label>
                </div>
                <div>
                  <input type="checkbox" />
                  <label>測試資料二</label>
                </div>
              </div>
            </div>
            <div className={rentalcss.kind}>
              <p>特色</p>
              <div className={rentalcss.checkboxcontainer}>
                <div>
                  <input type="checkbox" />
                  <label>測試資料</label>
                </div>
                <div>
                  <input type="checkbox" />
                  <label>測試資料二</label>
                </div>
              </div>
            </div>
            <div className={rentalcss.kind}>
              <p>排序</p>
              <div className={rentalcss.checkboxcontainer}>
                <div>
                  <input type="checkbox" />
                  <label>測試資料</label>
                </div>
                <div>
                  <input type="checkbox" />
                  <label>測試資料二</label>
                </div>
              </div>
            </div>
            <div className={rentalcss.kind}>
              <button>篩選商品</button>
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
