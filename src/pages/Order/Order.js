import styled from '../../styles/order-scss/Order.module.scss'
import { MY_HOST } from './myConfig'
import OrderTime from './components/OrderTime'
import OrderNum from './components/OrderNum'
import axios from 'axios'
import { useState, useEffect } from 'react'
function Order() {
  //打開子訂單+時間線增長的狀態
  const [open, setOpen] = useState([])
  const [momOrder, setMomOrder] = useState([
    {
      rows: [],
      proRows: [],
      roomRows: [],
      renRows: [],
      camRows: [],
    },
  ])
  const getList = async () => {
    const { data } = await axios.get(MY_HOST + '/order/api')
    setMomOrder(data)
  }
  useEffect(() => {
    getList()
  }, [])
  return (
    <div className={styled.orderRight}>
      <div className={styled.search}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="可以透過訂單編號、商品名稱搜尋" />
      </div>
      <div className={styled.orderBottom}>
        <OrderTime rows={momOrder.rows} open={open} />
        <OrderNum momOrder={momOrder} open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}

export default Order
