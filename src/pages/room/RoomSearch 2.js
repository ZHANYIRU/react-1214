import style from '../../styles/room-scss/roomSearch.module.scss'

function RoomSearch() {
  return (
    <div className={style.roomSearch}>
      <select className={style.block}>
        <option>
          <i class="fa-solid fa-chevron-down">地區</i>
        </option>
      </select>
      <select className={style.block}>
        <option>
          <i class="fa-solid fa-chevron-down">地區</i>
        </option>
      </select>
      <input className={style.block} placeholder="請輸入關鍵字" />
      <button className={style.block}>查詢</button>
    </div>
  )
}

export default RoomSearch
