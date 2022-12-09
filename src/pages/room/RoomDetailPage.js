import style from '../../styles/room-scss/roomDetailPage.module.scss'
import RoomDetail from '../room/components/RoomDetail'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function RoomDetailPage() {
  const { room_sid } = useParams()
  const [detail, setDetail] = useState([])
  const [detailComment, setDetailComment] = useState([])
  async function getData() {
    const response = await axios.get(
      `http://localhost:3001/room/getRoomDetail/${room_sid}`
    )
    // console.log(response.data.rows[0])
    setDetail(response.data.rows[0])
    setDetailComment(response.data.rowsForComment)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className={style.wrap}>
        <div className={style.crumble}>
          <Link to={'/room'}>
            <span>營位/山莊 /</span>
          </Link>

          <span>房型介紹</span>
        </div>
        <RoomDetail detail={detail} detailComment={detailComment} />
      </div>
    </>
  )
}

export default RoomDetailPage
