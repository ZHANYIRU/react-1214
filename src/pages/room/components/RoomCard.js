import React from 'react'
import style from '../../../styles/room-scss/roomCard.module.scss'

function RoomCard({ roomlist }) {
  const { M1rows } = roomlist
  // console.log(M1rows)

  return (
    <>
      <div className={style.titleWrap}>
        <h4 className={style.roomMainTitle}>雪山熱門住宿</h4>
      </div>
      <div className={style.roomCardGroup}>
        {M1rows &&
          M1rows.map((v, i) => {
            return (
              <div className={style.roomCard} key={v.room_sid}>
                <div className={style.cardImg}></div>
                <div className={style.icon}>
                  <div className={style.location}>
                    <span>
                      <i className="fa-solid fa-map-location-dot"></i>
                    </span>
                    <span>{v.name}</span>
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
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <span className={style.commentQTY}>(2)</span>
                </div>
                <div className={style.price}>
                  ＄{v.room_price}
                  <span>人 / 床位</span>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default RoomCard
