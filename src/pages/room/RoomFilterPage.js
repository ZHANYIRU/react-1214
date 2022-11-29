import style from '../../styles/room-scss/roomFilterPage.module.scss'
import ProCartContext from '../../contexts/ProCartContext'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
function RoomFilterPage() {
  const { data, userSelect, getMountain, setGetMountain } =
    useContext(ProCartContext)
  const { roomRows } = data
  const { locationRows, mountainRows } = userSelect
  const { mRows } = getMountain

  // console.log('roomRows', roomRows)
  // console.log('contextMountain', userSelect)

  //紀錄下來使用者的選擇
  const [choose, setChoose] = useState({
    mountain: '',
    location: '',
  })
  const [room, setRoom] = useState(0)
  const { selRoomRows } = room
  const [switchClick, setSwitchClick] = useState(true)

  const getLocation = async (location_sid) => {
    const response = await axios.get(
      `http://localhost:3001/room/searchbar/getmountain?location_sid=${location_sid}`
    )
    setGetMountain(response.data)
    console.log('room', getMountain)
  }

  //取得對應的房型
  const getRoom = async (mountain_sid) => {
    const response = await axios.get(
      `http://localhost:3001/room/searchbar/FageGetRoom?mountain_sid=${mountain_sid}`
    )
    setRoom(response.data)
  }

  //新資料or舊資料
  const display = switchClick ? roomRows : selRoomRows
  useEffect(() => {
    // getLocation()
    getUserChoose()
    // getRoom()
  }, [])

  //將前一頁使用者選擇的選項清空
  const resetOption = () => {
    setChoose({ ...choose, location: '地區', mountain: '山區' })
    mountainRows.length = 0
  }
  // const arrayEmpty = () => {
  //   roomRows.length === 0
  // }

  async function getUserChoose() {
    const test = { ...choose }
    test.location = roomRows[0].name
    test.mountain = roomRows[0].mountain_name
    setChoose(test)
  }
  return (
    <>
      <div className={style.warp}>
        <div className={style.filter}>
          <div className={style.location}>
            <select
              onChange={(e) => {
                const location_sid = e.target.value
                // console.log(location_sid)
                getLocation(location_sid)
                resetOption()
              }}
            >
              <option>{choose.location}</option>
              {locationRows.map((v, i) => {
                return (
                  <option key={v.sid} value={v.sid}>
                    {v.name}
                  </option>
                )
              })}
            </select>
          </div>
          <div className={style.mountain}>
            <select
              onChange={(e) => {
                const mountain_sid = e.target.value
                // console.log('mountainsid', mountain_sid)
                getRoom(mountain_sid)
                resetOption()
              }}
            >
              <option>{choose.mountain}</option>
              {mountainRows.length !== 0
                ? mountainRows &&
                  mountainRows.map((v, i) => {
                    return (
                      <option key={v.mountain_sid} value={v.mountain_sid}>
                        {v.mountain_name}
                      </option>
                    )
                  })
                : mRows &&
                  mRows.map((v, i) => {
                    return (
                      <option key={v.mountain_sid} value={v.mountain_sid}>
                        {v.mountain_name}
                      </option>
                    )
                  })}
            </select>
          </div>
          <button
            onClick={() => {
              // console.log('roomRowsTest', roomRows)
              // console.log('roomtest', selRoomRows)
              setSwitchClick(false)
            }}
          >
            查詢
          </button>
          <span>
            查詢結果：{switchClick ? roomRows.length : selRoomRows.length} 間
          </span>
        </div>
        <div className={style.roomCardGroup}>
          {display.map((v, i) => {
            return (
              <div className={style.cardWrap} key={v.room_sid}>
                <div className={style.cardImg}></div>
                <div className={style.detail}>
                  <div className={style.title}>
                    <div className={style.roomName}>{v.room_name}</div>
                    <div className={style.star}>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <span className={style.commentQTY}>(2)</span>
                    </div>
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
                  <div className={style.facility}>
                    <div>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/1664/1664734.png"
                        alt=""
                      />
                      <span>淋浴</span>
                    </div>
                    <div>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/911/911511.png"
                        alt=""
                      />
                      <span>空調</span>
                    </div>
                    <div>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/1664/1664734.png"
                        alt=""
                      />
                      <span>淋浴</span>
                    </div>
                    <div>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/911/911511.png"
                        alt=""
                      />
                      <span>空調</span>
                    </div>
                    <div>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/1664/1664734.png"
                        alt=""
                      />
                      <span>淋浴</span>
                    </div>
                    <div>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/911/911511.png"
                        alt=""
                      />
                      <span>空調</span>
                    </div>
                    <div>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/1664/1664734.png"
                        alt=""
                      />
                      <span>淋浴</span>
                    </div>
                    <div>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/911/911511.png"
                        alt=""
                      />
                      <span>空調</span>
                    </div>
                  </div>
                  <div className={style.text}>
                    <span>距離登山口：{'15'}公里</span>
                    <span>地址：353苗栗縣南庄鄉蓬萊村42份7-6號</span>
                    <span>電話：0919 822 379</span>
                  </div>
                  <div className={style.bottom}>
                    <div className={style.price}>金額：${v.room_price}/人</div>
                    <Link to={`/room/${v.room_sid}`}>
                      <button>查看詳情</button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default RoomFilterPage
