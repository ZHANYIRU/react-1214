import { useState } from 'react'
import axios from 'axios'
import style from '../../../styles/room-scss/roomSearch.module.scss'

function RoomSearch({ searchbar, setSearchBar }) {
  const { locationRows, mountainRows } = searchbar
  // const [selLocation, setSelLocation] = useState()
  const getLocation = async (location_sid) => {
    const response = await axios.get(
      `http://localhost:3001/room/searchbar/getlocation?location_sid=${location_sid}`
    )
    setSearchBar(response.data)
    console.log('aaa', response.data)
  }
  return (
    <div className={style.roomSearch}>
      <select
        className={style.location}
        onChange={(e) => {
          const location_sid = e.target.value
          // console.log('111', )
          getLocation(location_sid)
        }}
      >
        <option>地區</option>
        {locationRows &&
          locationRows.map((v, i) => {
            return (
              <option value={v.sid} key={v.location_sid}>
                {v.name}
              </option>
            )
          })}
      </select>
      <select className={style.mountain}>
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
      <input className={style.input} placeholder="請輸入關鍵字" />
      <button className={style.button}>查詢</button>
    </div>
  )
}

export default RoomSearch
