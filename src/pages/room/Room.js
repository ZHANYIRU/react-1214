import style from '../../styles/room-scss/room.module.scss'
import RoomCard from './RoomCard'
import RoomSearch from './RoomSearch'
function Room(props) {
  return (
    <>
      <h2 className={style.title}>
        還在為尋找登山口住宿而煩惱嗎？ <br />
        別擔心！ <br />
        837都為大家整理好了！
      </h2>
      <RoomSearch />
      <RoomCard />
      <RoomCard />
    </>
  )
}

export default Room
