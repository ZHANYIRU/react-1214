import axios from 'axios'
import React, { useState, useRef, useEffect } from 'react'

export default function Product_filter() {
  const [lowPrice, setLowPrice] = useState(0)
  const [highPrice, setHighPrice] = useState(0)
  const [brand, setBrand] = useState(0)

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

  let allProduct = 'http://localhost:3001/product'
  let price = 'http://localhost:3001/product/price'
  let brands = 'http://localhost:3001/product/brand'
  const getData = async (rotues) => {
    const response = await axios.post()
    const data = response.data
    console.log(data)
  }

  const filterData = () => {
    if (lowPrice && highPrice && brand) {
      getData(allProduct)
    } else if (lowPrice && highPrice) {
      getData(price)
    }
  }
  useEffect(() => {
    filterData()
  }, [])
  return (
    <div>
      <form action="">
        <h2>價格</h2>
        <input
          type="text"
          placeholder="最低價格"
          name="lowPrice"
          value={lowPrice}
          onChange={(e) => {
            setLowPrice(e.target.value)
          }}
        />
        <div className="dash"></div>
        <input
          type="text"
          placeholder="最高價格"
          name="highPrice"
          value={highPrice}
          onChange={(e) => {
            setHighPrice(e.target.value)
          }}
        />
        <h2> 品牌</h2>
        <input
          type="text"
          placeholder="請輸入品牌"
          name="brands"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value)
          }}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            filterData()
          }}
        >
          送出
        </button>
      </form>
    </div>
  )
}
