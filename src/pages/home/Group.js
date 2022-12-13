// import React, { useEffect, useState } from 'react'
import style from '../../styles/home-scss/Group.module.scss'
import dayjs from 'dayjs'
import FlipClock from 'x-react-flipclock'
import '../../styles/home-scss/flipclock.scss'
import CarouselHome from './CarouselHome'
import { Link } from 'react-router-dom'

function Group({ oneday }) {
  // const calulateTimeLeft = () => {
  //   const dateFormat = 'YYYY-MM-DD HH:mm:ss'
  //   const now = dayjs(new Date()).format(dateFormat)
  //   const deadline = dayjs('2022-12-31 23:59:59').format(dateFormat)

  //   let different
  //   let timeLeft

  //   different = new Date(deadline).getTime() - new Date(now).getTime()

  //   if (different > 0) {
  //     timeLeft = {
  //       days:
  //         Math.floor(different / (1000 * 60 * 60 * 24)) < 10
  //           ? '0' + Math.floor(different / (1000 * 60 * 60 * 24))
  //           : Math.floor(different / (1000 * 60 * 60 * 24)),
  //       hours:
  //         Math.floor((different / (1000 * 60 * 60)) % 24) < 24
  //           ? '0' + Math.floor((different / (1000 * 60 * 60)) % 24)
  //           : Math.floor((different / (1000 * 60 * 60)) % 24),
  //       minutes:
  //         Math.floor((different / (1000 * 60)) % 60) < 10
  //           ? '0' + Math.floor((different / (1000 * 60)) % 60)
  //           : Math.floor((different / (1000 * 60)) % 60),
  //       seconds:
  //         Math.floor((different / 1000) % 60) < 10
  //           ? '0' + Math.floor((different / 1000) % 60)
  //           : Math.floor((different / 1000) % 60),
  //     }
  //   }
  //   return timeLeft
  // }

  //  以 calulateTimeLeft 回傳值
  // const [timeLeft, setTimeLeft] = useState(calulateTimeLeft())

  // useEffect(() => {
  //   let id = setInterval(() => {
  //     setTimeLeft(calulateTimeLeft())
  //   }, 1000)
  //   return function () {
  //     clearInterval(id)
  //   }
  // }, [timeLeft])
  return (
    <>
      <div className={style.left}>
        <h3>{oneday.camp_name}</h3>
        <div className={style.icon}>
          <div className={style.location}>
            <span>
              <i className="fa-solid fa-map-location-dot"></i>
            </span>
            <span>{oneday.name}</span>
          </div>
          <div className={style.mountain}>
            <span>
              <i className="fa-solid fa-mountain"></i>
            </span>
            <span>{oneday.mountain_name}</span>
            <span>{oneday.height}m</span>
          </div>
        </div>
        <div className={style.text}>{oneday.brife_describe}</div>
      </div>
      <div className={style.midddle}>
        <h2>一日單攻報名倒數</h2>
        <div className={style.imgWrap}>
          <CarouselHome oneday={oneday} />
        </div>
      </div>
      <div className={style.right}>
        <div className={style.flipClock}>
          <FlipClock
            type="countdown"
            count_to={`${oneday.camp_joinenddate} 23:59:59`}
            units={[
              {
                sep: ':',
                type: 'days',
                title: 'day',
              },
              {
                sep: ':',
                type: 'hours',
                title: 'hour',
              },
              {
                sep: ':',
                type: 'minutes',
                title: 'minute',
              },
              {
                sep: ':',
                type: 'seconds',
                title: 'second',
              },
            ]}
          />
        </div>
        <div className={style.countDown}>
          {/* <div className={style.one}>
            <span>{timeLeft.days}</span>
            <p>天</p>
            <span>{timeLeft.hours}</span>
            <p>時</p>
            <span>{timeLeft.minutes}</span>
            <p>分</p>
            <span>{timeLeft.seconds}</span>
            <p>秒</p>
          </div> */}
          <div className={style.two}>
            <p>已報名</p>
            <span>{oneday.totalPeople}</span>
            <p>人</p>
          </div>
          <div className={style.three}>
            <p>剩餘</p>
            <span>{oneday.qty - oneday.totalPeople}</span>
            <p>人</p>
          </div>
        </div>
        <div className={style.wrap}>
          <div className={style.text}>
            <h3>活動名稱：{oneday.camp_name}</h3>
            <h3>活動日期：{oneday.camp_startdate}</h3>
            <h3>報名截止日期：{oneday.camp_joinenddate}</h3>
          </div>
          <div className={style.price}>費用：${oneday.price} 元 / 人</div>
          <Link to={`/camp/${oneday.c_sid}`}>
            <div className={style.click}>查看詳情</div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Group
