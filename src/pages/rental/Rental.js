import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Carousel from './components/Carousel'
import Search from './components/Search'
import RentalCard from './components/RentalCard'
import rentalcss from '../../styles/rental-scss/rental.module.scss'
// import RentalFilter from './components/RentalFilter'
// import { useLocation } from 'react-router-dom'
import CustomIcons from './components/CustomIcons'
import FilterAll from '../rental/components/FilterAll'
import Filter1 from '../rental/components/Filter1'
import Filter2 from '../rental/components/Filter2'

function Rental(props) {
  const [data, setData] = useState(null)
  const [count, setCount] = useState(1)
  // const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  //filter要不要出現
  const [showFilter, setShowFilter] = useState(false)
  //搜尋文字用狀態存起來
  // const [input, setInput] = useState('')
  const [conditions, setConditions] = useState({
    category: '',
    search: '',
    low_price: undefined,
    high_price: undefined,
    page: 1,
    order_by: '',
    brand: [],
    label: [],
  })

  // const brandOption = ['TiiTENT', 'Snow Peak', 'ZANE ARTS', 'HILLEBERG']
  // const labelOption = ['二人帳', '四人帳']
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
            <p
              style={
                conditions.category === '' && conditions.search == ''
                  ? { transform: 'scale(1.4)', color: '#e60' }
                  : {}
              }
              onClick={() =>
                setConditions({
                  ...conditions,
                  category: '',
                  search: '',
                  low_price: undefined,
                  high_price: undefined,
                  page: 1,
                  order_by: '',
                  brand: [],
                  label: [],
                })
              }
            >
              全部商品
            </p>
            <p
              style={
                conditions.category === '帳篷'
                  ? {
                      transform: 'scale(1.4)',
                      color: '#e60',
                    }
                  : {}
              }
              onClick={() =>
                setConditions({
                  ...conditions,
                  category: '帳篷',
                  search: '',
                  low_price: undefined,
                  high_price: undefined,
                  page: 1,
                  order_by: '',
                  brand: [],
                  label: [],
                })
              }
            >
              露營帳篷
            </p>
            <p
              style={
                conditions.category === '露營椅'
                  ? { transform: 'scale(1.4)', color: '#e60' }
                  : {}
              }
              onClick={() =>
                setConditions({ ...conditions, category: '露營椅', page: 1 })
              }
            >
              戶外桌椅
            </p>
            {/* <p
              style={conditions.category === '電風扇' ? { color: 'red' } : {}}
              onClick={() =>
                setConditions({ ...conditions, category: '電風扇', page: 1 })
              }
            >
              戶外電器
            </p> */}
          </div>
          {/* <div className={rentalcss.nameSearch}></div> */}
          <div className={rentalcss.order}>
            <p>一共{count}筆數</p>
            <p
              style={
                conditions.order_by === 'time_DESC' ? { color: '#e60' } : {}
              }
              onClick={() =>
                setConditions({ ...conditions, order_by: 'time_DESC', page: 1 })
              }
            >
              最新上架
            </p>
            {/* <p>最熱銷</p> */}
            <p
              style={
                conditions.order_by === 'price_DESC' ? { color: '#e60' } : {}
              }
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
              style={
                conditions.order_by === 'price_ASC' ? { color: '#e60' } : {}
              }
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
            {/* {conditions.search || conditions.category === '' ? (
              ''
            ) : ( */}
            <i
              onClick={() => {
                setShowFilter(showFilter ? false : true)
              }}
              className="fa-solid fa-filter"
            ></i>
            {/* )} */}
          </div>
        </div>
        {showFilter && conditions.category === '' && (
          <FilterAll conditions={conditions} setConditions={setConditions} />
        )}
        {showFilter && conditions.category === '帳篷' && (
          <Filter1 conditions={conditions} setConditions={setConditions} />
        )}
        {showFilter && conditions.category === '露營椅' && (
          <Filter2 conditions={conditions} setConditions={setConditions} />
        )}
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
