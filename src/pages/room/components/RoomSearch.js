import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import style from '../../../styles/room-scss/roomSearch.module.scss'
import ProCartContext from '../../../contexts/ProCartContext'
function RoomSearch({
  searchbar,
  setSearchBar,
  selectRoom,
  setSelectRoom,
  keyWord,
  setKeyWord,
}) {
  const Navigate = useNavigate()
  const { locationRows, mountainRows } = searchbar
  const { setData, setUserSelect } = useContext(ProCartContext)

  // 取得選擇到地區的山
  const getLocation = async (location_sid) => {
    const response = await axios.get(
      `http://localhost:3001/room/searchbar/getlocation?location_sid=${location_sid}`
    )
    setSearchBar(response.data)
    setUserSelect(response.data)
  }

  //取得選擇相對應山的房型
  const getRoom = async (mountain_sid) => {
    const response = await axios.get(
      `http://localhost:3001/room/searchbar/getroom?mountain_sid=${mountain_sid}`
    )

    setSelectRoom(response.data)
    console.log('room', selectRoom)
  }

  const [roomSid, setRoomSid] = useState(0)
  //取得符合使用這輸入關鍵字的房型
  const [input, setInput] = useState('')
  const InputHandler = (e) => {
    setInput(e.target.value)
  }
  //點擊查詢時送出資料
  const getKeyWordRoom = async () => {
    const response = await axios.get(
      `http://localhost:3001/room/searchbar/namegetroom?mountain=${roomSid}&roomname=${input}`
    )
    setKeyWord(response.data)
    setData(response.data)
    Navigate('/room/search')
    // console.log('input', response)
  }

  return (
    <div className={style.roomSearch}>
      <select
        className={style.location}
        onChange={(e) => {
          const location_sid = e.target.value
          getLocation(location_sid)
        }}
      >
        <option>地區</option>
        {locationRows &&
          locationRows.map((v, i) => {
            return (
              <option value={v.sid} key={v.sid}>
                {v.name}
              </option>
            )
          })}
      </select>
      <select
        className={style.mountain}
        onChange={(e) => {
          const mountain_sid = e.target.value
          getRoom(mountain_sid)
          setRoomSid(mountain_sid)
        }}
      >
        <option>山區</option>
        {mountainRows &&
          mountainRows.map((v, i) => {
            return (
              <option value={v.mountain_sid} key={v.mountain_sid}>
                {v.mountain_name}
              </option>
            )
          })}
      </select>
      <input
        className={style.input}
        placeholder="請輸入關鍵字"
        onChange={InputHandler}
      />
      <button className={style.button} onClick={getKeyWordRoom}>
        查詢
      </button>
    </div>
  )
}

export default RoomSearch
