import { useEffect, useState, useRef } from 'react'
import style from '../../../styles/room-scss/roomSelectBar.module.scss'

function RoomSelectBar({ detail }) {
  const roomQTY = detail.room_qty

  const [showBar, setShowBar] = useState(false)

  const barHeight = useRef()

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
      <div
        className={style.bar}
        style={{ visibility: showBar && 'hidden' }}
        ref={barHeight}
      >
        <div className={style.name}>南庄小美家民宿</div>
        <div className={style.select}>
          <select>
            <option>入住日期</option>
          </select>
          <select>
            <option>退房日期</option>
          </select>
          <select>
            <option>床位</option>
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
        <div className={style.price}>共計：$1,300</div>
        <div className={style.add}>加入購物車</div>
      </div>
    </>
  )
}

export default RoomSelectBar
