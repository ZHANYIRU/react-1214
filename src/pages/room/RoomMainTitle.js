import style from '../../styles/room-scss/roomMainTitle.module.scss'
import React from 'react'

function RoomMainTitle() {
  return (
    <>
      <div className={style.titleWrap}>
        <h4 className={style.roomMainTitle}>加里山熱門住宿</h4>
      </div>
    </>
  )
}

export default RoomMainTitle
