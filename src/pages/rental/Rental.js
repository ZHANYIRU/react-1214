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
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)

  // const rental_url = 'http://localhost:3001/rental/api'
  const rental_url_new = 'http://localhost:3001/rental/pageApi'

  async function getList() {
    const response = await axios.get(rental_url_new + `?page=${page}`)
    console.log(response.data)
    setData(response.data.rows)
    setCount(response.data.count)
    setTotalPages(response.data.totalPages)
  }

  const priceOrder = function (text) {
    const newData = [...data]

    newData.sort((a, b) => {
      if (text === 'lowToHigh') {
        return a.rental_price - b.rental_price
      } else {
        return b.rental_price - a.rental_price
      }
    })
    setData(newData)
  }
  const timeOrder = function () {
    const newData = [...data]
    newData.sort((a, b) => {
      return Date.parse(a.rental_time) - Date.parse(b.rental_time)
    })
    setData(newData)
  }
  useEffect(() => {
    getList()
  }, [page])

  return (
    <>
      {/* <div className={rentalcss.empty}></div>
      <button
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
        <Search setData={setData} setTotalPages={setTotalPages} />

        {/* 篩選列表 */}
        <div className={rentalcss.orderShow}>
          <div className={rentalcss.filtermore}>
            <h2>進階搜尋</h2>
            <i className="fa fa-angle-double-down" aria-hidden="true"></i>
          </div>
          <div className={rentalcss.order}>
            <p>一共{count}筆數</p>
            <p onClick={() => timeOrder()}>最新上架</p>
            <p>最熱銷</p>
            <p onClick={() => priceOrder('highToLow')}>價格高到低</p>
            <p onClick={() => priceOrder('lowToHigh')}>價格低到高</p>
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
            setPage={setPage}
          />
        </div>
      </div>
    </>
  )
}

export default Rental
