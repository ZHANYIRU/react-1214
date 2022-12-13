import { useEffect, useState, useContext } from 'react'
import style from '../../../styles/room-scss/roomSelectBar.module.scss'
import dayjs from 'dayjs'
import ProCartContext from '../../../contexts/ProCartContext'
import Swal from 'sweetalert2'

function RoomSelectBar({ detail }) {
  const { addRoomCart } = useContext(ProCartContext)
  //房型資料定義
  const roomQTY = detail.room_qty
  const roomPrice = detail.room_price
  const roomEndDate = detail.room_end_date
  const roomEnd = roomEndDate && roomEndDate.split('T', 10)[0]

  //預設入住日期加一天
  const date = Date.parse(new Date())
  const today = dayjs(date).format('YYYY-MM-DD')
  const tomorrow = dayjs(date + 86400000).format('YYYY-MM-DD')

  const [night, setNight] = useState(1)

  const stayNightsI = (e) => {
    const newCheckIn = e.target.value
    // console.log('checkOut', newCheckOut)
    // console.log('checkIn', checkIn)
    const days = (Date.parse(checkOut) - Date.parse(newCheckIn)) / 86400000
    setNight(days)
  }
  const stayNightsII = (e) => {
    const newCheckOut = e.target.value
    // console.log('checkOut', newCheckOut)
    // console.log('checkIn', checkIn)
    const days = (Date.parse(newCheckOut) - Date.parse(checkIn)) / 86400000
    setNight(days)
  }

  //記錄使用者選擇到的房間數
  const [qty, setQty] = useState(1)

  //記錄使用者選擇的入住日期
  const [checkIn, setCheckIn] = useState(today)
  //記錄使用者選擇的入住日期
  const [checkOut, setCheckOut] = useState(tomorrow)

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
  }, [])

  return (
    <>
      <div className={style.bar} style={{ visibility: showBar && 'hidden' }}>
        <div className={style.name}>{detail.room_name}</div>
        <div className={style.select}>
          <label>入住日期</label>
          <input
            type="date"
            min={today}
            max={roomEnd && roomEnd}
            value={checkIn ? checkIn : today}
            onChange={(e) => {
              const selDate = e.target.value
              setCheckIn(selDate)
              stayNightsI(e)

              if (Date.parse(selDate) > Date.parse(checkOut)) {
                Swal.fire({
                  icon: 'error',
                  title: '請重新選擇日期',
                  showConfirmButton: false,
                  timer: 1500,
                })
                setCheckIn(today)
                setCheckOut(tomorrow)
                setNight(1)
              } else {
                console.log('有進來嗎')
                setCheckIn(selDate)
                setCheckOut(checkOut)
                stayNightsI(e)
              }
            }}
          />
          <label>退房日期</label>
          <input
            type="date"
            min={tomorrow}
            max={roomEnd && roomEnd}
            value={checkOut ? checkOut : tomorrow}
            onChange={(e) => {
              const selDate = e.target.value
              setCheckOut(selDate)
              stayNightsII(e)
            }}
          />
          <label>床位</label>
          <select
            onChange={(e) => {
              const selectQty = +e.target.value
              // console.log(typeof selectQty)
              setQty(selectQty)
            }}
          >
            {Array(roomQTY)
              .fill(1)
              .map((v, i) => {
                return (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                )
              })}
          </select>
        </div>
        <div className={style.price}>
          {night >= 1 ? `共計${night && `${night}晚`}` : '1晚'}
          {qty && `${qty}床位`}：
          {qty && qty > 0 ? `${qty * roomPrice * night}` : 0}元
        </div>
        <div
          className={style.add}
          onClick={() => {
            Swal.fire({
              icon: 'success',
              title: '已成功加入購物車',
              showConfirmButton: false,
              timer: 1500,
            })
            addRoomCart(
              detail.room_sid,
              detail.room_name,
              detail.room_address,
              checkIn,
              checkOut,
              night,
              detail.location_name,
              detail.mountain_name + ' ' + detail.height + 'm',
              detail.room_price,
              qty,
              detail.room_img
            )
          }}
        >
          加入購物車
        </div>
      </div>
    </>
  )
}

export default RoomSelectBar
