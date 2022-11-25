import { useEffect, useState } from 'react'
import style from '../../../styles/room-scss/roomSelectBar.module.scss'
// import dayjs from 'dayjs'

function RoomSelectBar({ detail }) {
  //房型資料定義
  const roomQTY = detail.room_qty
  const roomPrice = detail.room_price
  const roomStart = detail.room_start_date
  const defaultDate = roomStart && roomStart.split('T', 10)[0]

  //預設入住日期加一天
  const datePlus = Date.parse(defaultDate) + 86400000
  // console.log('time', datePlus)
  // const defaultCheckout = datePlus.getDate()
  // console.log('date', defaultCheckout)

  //記錄使用者選擇到的房間數
  const [qty, setQty] = useState(0)

  //記錄使用者選擇的入住日期
  const [checkIn, setCheckIn] = useState(defaultDate)

  //切換是否顯示selectBar
  const [showBar, setShowBar] = useState(false)

  //切換是否顯示selectCalendar
  // const [showCalendar, setShowCalendar] = useState(false)

  //判斷使用者滑鼠滾輪往上or往下
  let lastScroll = 0
  const show = () => {
    const windowH = window.innerHeight
    const nowscroll = windowH - window.scrollY

    if (nowscroll < lastScroll) {
      setShowBar(true)
    } else if (nowscroll > lastScroll) {
      setShowBar(false)
    }
    lastScroll = nowscroll
  }
  useEffect(() => {
    window.addEventListener('scroll', show)
    return () => {
      window.removeEventListener('scroll', show)
    }
  }, [defaultDate])

  return (
    <>
      <div className={style.bar} style={{ visibility: showBar && 'hidden' }}>
        <div className={style.name}>{detail.room_name}</div>
        <div className={style.select}>
          <label>入住日期</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => {
              const selDate = e.target.value
              setCheckIn(selDate)
            }}
          />
          <label>退房日期</label>
          <input type="date" value="2022-02-11" />
          <label>床位</label>
          <select
            onChange={(e) => {
              const selectQty = e.target.value
              setQty(selectQty)
              console.log(defaultDate)
            }}
          >
            {Array(roomQTY)
              .fill(1)
              .map((v, i) => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                )
              })}
          </select>
        </div>
        <div className={style.price}>
          共計：{qty > 0 ? `${qty * roomPrice}` : 0}元
        </div>
        <div className={style.add}>加入購物車</div>
      </div>
    </>
  )
}

export default RoomSelectBar
