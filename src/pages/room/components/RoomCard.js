import React from 'react'
import RoomMainTitle from './RoomMainTitle'
import style from '../../../styles/room-scss/roomCard.module.scss'

function RoomCard() {
  return (
    <>
      <RoomMainTitle />
      <div className={style.roomCardGroup}>
        <div className={style.roomCard}>
          <div className={style.cardImg}></div>
          <div className={style.icon}>
            <div className={style.location}>
              <span>
                <i className="fa-solid fa-map-location-dot"></i>
              </span>
              <span>苗栗</span>
              <span>南庄區</span>
            </div>
            <div className={style.mountain}>
              <span>
                <i className="fa-solid fa-mountain"></i>
              </span>
              <span>加里山</span>
            </div>
          </div>
          <h4 className={style.roomName}>南莊小美家民宿</h4>
          <div className={style.star}>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <span className={style.commentQTY}>(2)</span>
          </div>
          <div className={style.price}>
            $1,500 /<span>床位</span>{' '}
          </div>
        </div>
        <div className={style.roomCard}>
          <div className={style.cardImg}></div>
          <div className={style.icon}>
            <div className={style.location}>
              <span>
                <i className="fa-solid fa-map-location-dot"></i>
              </span>
              <span>苗栗</span>
              <span>南庄區</span>
            </div>
            <div className={style.mountain}>
              <span>
                <i className="fa-solid fa-mountain"></i>
              </span>
              <span>加里山</span>
            </div>
          </div>
          <h4 className={style.roomName}>南莊小美家民宿</h4>
          <div className={style.star}>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <span className={style.commentQTY}>(2)</span>
          </div>
          <div className={style.price}>
            $1,500 /<span>床位</span>{' '}
          </div>
        </div>
        <div className={style.roomCard}>
          <div className={style.cardImg}></div>
          <div className={style.icon}>
            <div className={style.location}>
              <span>
                <i className="fa-solid fa-map-location-dot"></i>
              </span>
              <span>苗栗</span>
              <span>南庄區</span>
            </div>
            <div className={style.mountain}>
              <span>
                <i className="fa-solid fa-mountain"></i>
              </span>
              <span>加里山</span>
            </div>
          </div>
          <h4 className={style.roomName}>南莊小美家民宿</h4>
          <div className={style.star}>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <span className={style.commentQTY}>(2)</span>
          </div>
          <div className={style.price}>
            $1,500 /<span>床位</span>{' '}
          </div>
        </div>
        <div className={style.roomCard}>
          <div className={style.cardImg}></div>
          <div className={style.icon}>
            <div className={style.location}>
              <span>
                <i className="fa-solid fa-map-location-dot"></i>
              </span>
              <span>苗栗</span>
              <span>南庄區</span>
            </div>
            <div className={style.mountain}>
              <span>
                <i className="fa-solid fa-mountain"></i>
              </span>
              <span>加里山</span>
            </div>
          </div>
          <h4 className={style.roomName}>南莊小美家民宿</h4>
          <div className={style.star}>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <span className={style.commentQTY}>(2)</span>
          </div>
          <div className={style.price}>
            $1,500 /<span>床位</span>{' '}
          </div>
        </div>
      </div>
    </>
  )
}

export default RoomCard
