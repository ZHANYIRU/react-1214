import style from '../../styles/room-scss/roomDetailPage.module.scss'
import RoomDetail from '../room/components/RoomDetail'

function RoomDetailPage() {
  return (
    <>
      <div className={style.wrap}>
        <div className={style.crumble}>
          <span>營位/山莊 /</span>
          <span>房型介紹</span>
        </div>
        <RoomDetail />
      </div>
    </>
  )
}

export default RoomDetailPage
