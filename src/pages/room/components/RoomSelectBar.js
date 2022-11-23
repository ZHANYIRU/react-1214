import style from '../../../styles/room-scss/roomSelectBar.module.scss'

function RoomSelectBar() {
  return (
    <>
      <div className={style.bar}>
        <div className={style.name}>南庄小美家民宿</div>
        <div className={style.select}>
          <select>
            <option>入住日期</option>
          </select>
          <select>
            <option>退房日期</option>
          </select>
          <select>
            <option>床位</option>
          </select>
        </div>
        <div className={style.price}>共計：$1,300</div>
        <div className={style.add}>加入購物車</div>
      </div>
    </>
  )
}

export default RoomSelectBar
