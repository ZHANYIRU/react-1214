import React, { useEffect, useState } from 'react'
import style from '../../styles/home-scss/Group.module.scss'
import dayjs from 'dayjs'

function Group() {
  //   const [countDown, setCountDown] = useState({
  //     Day: '',
  //     Min: '',
  //     Sec: '',
  //   })
  function calulateTimeLeft() {
    let year = new Date().getFullYear() // 獲取現在的年份
    let month = new Date().getMonth() //

    let different = null
    let timeLeft = {}

    // 如果現在的月份已經超過10月，則算到下一年 若現在月份沒有超過10月，則用今年的年份來計算
    if (month > 10) {
      different = new Date(`${12}/${31}/${year}`) - new Date()
    } else {
      different = new Date(`${12}/${31}/${year}`) - new Date()
    }

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

  // 以 calulateTimeLeft 回傳值 初始化距離 10/10 剩下的時間
  const [timeLeft, setTimeLeft] = useState(calulateTimeLeft())

  //   const minus = () => {
  //     // const dateFormat = 'YYYY, MM, D, H, m, s'
  //     // const now = dayjs(new Date()).format(dateFormat)
  //     // const deadline = dayjs('2022-12-31 23:59:59').format(dateFormat)
  //     const now = new Date().getTime()
  //     const deadline = new Date(2022, 12, 31, 23, 59, 59).getTime()
  //     // const count = new Date(deadline).getTime() - new Date(now).getTime()
  //     console.log(now)
  //     console.log(deadline)
  //     console.log('...', deadline - now)
  //     const howlong = deadline - now
  //     console.log(howlong)
  //     const DD =

  // const newCountDown = {...countDown}
  //     setCountDown(newCountDown, Day:DDay)
  // return new Date(deadline).getTime() - new Date(now).getTime()
  //   }

  //   const count = setInterval(minus, 1000)
  //     console.log('相減', count)

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
          <div>
            {' '}
            {timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:
            {timeLeft.seconds}
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
