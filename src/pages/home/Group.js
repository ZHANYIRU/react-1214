import React, { useEffect, useState } from 'react'
import style from '../../styles/home-scss/Group.module.scss'
import dayjs from 'dayjs'

function Group() {
  const calulateTimeLeft = () => {
    const dateFormat = 'YYYY-MM-DD HH:mm:ss'
    const now = dayjs(new Date()).format(dateFormat)
    const deadline = dayjs('2022-12-31 23:59:59').format(dateFormat)

    let different = null
    let timeLeft = {}

    different = new Date(deadline).getTime() - new Date(now).getTime()

    if (different > 0) {
      timeLeft = {
        days: Math.floor(different / (1000 * 60 * 60 * 24)),
        hours: Math.floor((different / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((different / (1000 * 60)) % 60),
        seconds: Math.floor((different / 1000) % 60),
      }
    }
    return timeLeft
  }

  //  以 calulateTimeLeft 回傳值
  const [timeLeft, setTimeLeft] = useState(calulateTimeLeft())

  useEffect(() => {
    let id = setInterval(() => {
      setTimeLeft(calulateTimeLeft())
    }, 1000)
    return function () {
      clearInterval(id)
    }
  }, [timeLeft])
  return (
    <>
      <div className={style.left}>
        <h3>宜蘭抹茶山聖母登山步道</h3>
        <p>
          活動日期：2022-12-11 <br />
          活動時間：05:00-15:00 <br />
          集合地點：台北車站南三門
        </p>
      </div>
      <div className={style.midddle}>
        <h2>一日單攻報名倒數</h2>
        <div className={style.imgWrap}>
          <img src="/img/room.jpg" alt="" />
        </div>
      </div>
      <div className={style.right}>
        <div className={style.countDown}>
          <div className={style.count}>
            <span>{timeLeft.days}</span>
            <span>{timeLeft.hours}</span>
            <span>{timeLeft.minutes}</span>
            <span>{timeLeft.seconds}</span>
          </div>
          <div className={style.one}>
            <span>0</span>
            <span>1</span>
            <p>天</p>
            <span>1</span>
            <span>1</span>
            <p>時</p>
            <span>5</span>
            <span>2</span>
            <p>分</p>
          </div>
          <div className={style.two}>
            <p>已報名</p>
            <span>2</span>
            <span>3</span>
            <p>人</p>
          </div>
          <div className={style.three}>
            <p>剩餘</p>
            <span>0</span>
            <span>7</span>
            <p>人</p>
          </div>
        </div>
        <div className={style.wrap}>
          <div className={style.text}>
            日本攝影師小林賢伍所拍攝的照片曝光後，
            因他將這座山稱為台灣的抹茶冰淇淋山， 讓「抹茶山」這個稱呼一炮而紅，
            這座山也成為了超夯的熱門景點！
          </div>
          <div className={style.price}>費用：600 / 人</div>
          <div className={style.click}>我要報名</div>
        </div>
      </div>
    </>
  )
}

export default Group
