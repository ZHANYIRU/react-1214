import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import RentalCard from './components/RentalCard'
import rentalcss from '../../styles/rental-scss/rentalProducts.module.scss'

function Rental(props) {
  let [data, setData] = useState(null)

  const rental_url = 'http://localhost:3001/rental/api'

  async function getList() {
    const response = await axios.get(rental_url)
    console.log(response)
    setData(response.data.rows)
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <>
      <div className={rentalcss.container}>
        {/* 搜尋元件 */}
        <Search setData={setData} />

        {/* 分類選單 */}
        <div className={rentalcss.categoryBox}>
          <div className={rentalcss.box}>
            <h2>最新上架</h2>
            <h2>熱門商品</h2>
            <h2>男女服飾</h2>
          </div>
          <div className={rentalcss.middle}>
            <h2>商品類別</h2>
          </div>
          <div className={rentalcss.box}>
            <h2>專業用品</h2>
            <h2>飲水用品</h2>
            <h2>其他配件</h2>
          </div>
        </div>

        {/* 卡片元件 */}
        <div className={rentalcss.rentalProductBox}>
          {data &&
            data.map((d) => {
              return <RentalCard data={d} />
            })}
        </div>
      </div>
    </>
  )
}

export default Rental
