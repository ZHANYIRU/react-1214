import React from 'react'
import style from '../../../styles/room-scss/roomCard.module.scss'
import { Link } from 'react-router-dom'

function RoomCardSearch({ selectRoom, setSelectRoom }) {
  const { roomRows } = selectRoom

  return (
    <>
      <div className={style.titleWrap}>
        <h4 className={style.roomMainTitle}>
          {roomRows.length !== 0 && roomRows[0].mountain_name}
          {roomRows.length !== 0 && '熱門住宿'}
        </h4>
      </div>
      <div className={style.roomCardGroup}>
        {roomRows &&
          roomRows.map((v, i) => {
            return (
              <Link to={`/room/${v.room_sid}`} key={v.room_sid}>
                <div className={style.roomCard}>
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
              </Link>
            )
          })}
      </div>
    </>
  )
}

export default RoomCardSearch
