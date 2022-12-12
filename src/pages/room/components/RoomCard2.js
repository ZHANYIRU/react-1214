import React from 'react'
import style from '../../../styles/room-scss/roomCard.module.scss'
import { Link } from 'react-router-dom'

function RoomCard({ roomlist }) {
  const { M2rows } = roomlist
  // console.log(M2rows)
  const starCount = (e) => {
    if (e > 0 && e === 1) {
      return (
        <>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
        </>
      )
    } else if (e > 0 && e === 2) {
      return (
        <>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
        </>
      )
    } else if (e > 0 && e === 3) {
      return (
        <>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
        </>
      )
    } else if (e > 0 && e === 4) {
      return (
        <>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
        </>
      )
    } else if (e > 0 && e === 5) {
      return (
        <>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </>
      )
    } else if (e <= 0) {
      return (
        <>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
        </>
      )
    }
  }

  return (
    <>
      <div className={style.titleWrap}>
        <h4 className={style.roomMainTitle}>馬武霸山熱門住宿</h4>
      </div>
      <div className={style.roomCardGroup}>
        {M2rows &&
          M2rows.map((v, i) => {
            return (
              <Link to={`/room/${v.room_sid}`} key={v.room_sid}>
                <div className={style.roomCard} >
                  <div className={style.cardImg}>
                    <img
                      src={`http://localhost:3001/room_img/${v.room_img}`}
                      alt=""
                    />
                  </div>
                  <div className={style.icon}>
                    <div className={style.location}>
                      <span>
                        <i className="fa-solid fa-map-location-dot"></i>
                      </span>
                      <span>苗栗</span>
                    </div>
                    <div className={style.mountain}>
                      <span>
                        <i className="fa-solid fa-mountain"></i>
                      </span>
                      <span>{v.mountain_name}</span>
                      <span>{v.height}m</span>
                    </div>
                  </div>
                  <h4 className={style.roomName}>{v.room_name}</h4>
                  <div className={style.star}>
                  {starCount(Math.round(v.Average))}
                    <span className={style.commentQTY}>
                    ({v.commentQty > 0 ? v.commentQty : 0})
                    </span>
                  </div>
                  <div className={style.price}>
                    ＄{v.room_price}
                    <span> 人 / 床位</span>
                  </div>
                </div>
              </Link>
            )
          })}
      </div>
    </>
  )
}

export default RoomCard
