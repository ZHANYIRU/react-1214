import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Carousel from './components/Carousel'
import Search from './components/Search'
import RentalCard from './components/RentalCard'
import rentalcss from '../../styles/rental-scss/rentalProducts.module.scss'
import RentalFilter from './components/RentalFilter'

function Rental(props) {
  let [data, setData] = useState(null)

  const rental_url = 'http://localhost:3001/rental/api'

  async function getList() {
    const response = await axios.get(rental_url)
    console.log(response.data.rows)
    setData(response.data.rows)
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

  useEffect(() => {
    getList()
  }, [])

  return (
    <>
      <div className={rentalcss.empty}></div>

      {/* <RentalFilter /> */}
      <div className={rentalcss.container}>
        {/* 製作輪播牆 */}
        <Carousel />
        {/* 搜尋元件 */}
        <Search setData={setData} />

        {/* 分類選單 */}
        {/* <div className={rentalcss.categoryBox}>
          <div className={rentalcss.box}>
            <h2>最新上架</h2>
            <h2>熱銷商品</h2>
            <h2>露營帳篷</h2>
          </div>
          <div className={rentalcss.middle}>
            <h2>商品類別</h2>
          </div>
          <div className={rentalcss.box}>
            <h2>登山杖</h2>
            <h2>保暖睡袋</h2>
            <h2>登山躺椅</h2>
          </div>
        </div> */}
        <div className={rentalcss.orderShow}>
          <div className={rentalcss.filtermore}>
            <h2>進階搜尋</h2>
            <i className="fa fa-angle-double-down" aria-hidden="true"></i>
          </div>
          <div className={rentalcss.order}>
            <p>最新上架</p>
            <p>最熱銷</p>
            <p onClick={() => priceOrder('highToLow')}>價格高到低</p>
            <p onClick={() => priceOrder('lowToHigh')}>價格低到高</p>
          </div>
        </div>

        {/* 卡片元件 */}
        <div className={rentalcss.rentalProductBox}>
          {data &&
            data.map((d) => {
              return <RentalCard data={d} key={d.rental_product_sid} />
            })}
        </div>
      </div>
    </>
  )
}

export default Rental
