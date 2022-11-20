import { useRef, useState, useEffect } from 'react'
import style from '../../styles/room-scss/room.module.scss'
import RoomCard from './components/RoomCard'
import RoomSearch from './components/RoomSearch'
function Room(props) {
  const [ftr, setFtr] = useState(false)
  const mainHeight = useRef()
  const scroll = () => {
    const windowH = window.innerHeight
    const mainH = mainHeight.current.clientHeight
    const windowScrollY = window.scrollY
    if (windowScrollY + windowH * 0.8 > mainH) {
      setFtr(true)
    } else {
      setFtr(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', scroll)
    return () => {
      window.removeEventListener('scroll', scroll)
    }
  }, [])
  return (
    <>
      <div className={style.bgc}>
        <div className={`${style.box} ${style.div1}`}></div>
        <div className={`${style.box} ${style.div2}`}></div>
        <div className={`${style.box} ${style.div3}`}></div>
      </div>
      <div className={style.divWrap} style={{ visibility: ftr && 'hidden' }}>
        <div className={`${style.box} ${style.div4}`}></div>
        <div className={`${style.box} ${style.div5}`}></div>
      </div>

      <div className={style.container} ref={mainHeight}>
        <h2 className={style.title}>
          還在為尋找登山口住宿而煩惱嗎？ <br />
          別擔心！ <br />
          837都為大家整理好了！
        </h2>
        <RoomSearch />
        <RoomCard />
        <RoomCard />
      </div>
    </>
  )
}

export default Room
