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
    if (userSelect.length !== 0) {
      mountainRows.length = 0
    }
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
  const [service, setService] = useState([
    '淋浴',
    '沐浴用品',
    '吹風機',
    '毛巾',
    '空調',
    '電風扇',
    '免費wifi',
    '早餐',
    '登山口接駁',
    '登山諮詢',
    '飲水機',
    '插座',
  ])
  const starCount = (e) => {
    if (e > 0 && e === 1) {
      return (
        <>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
        </>
      )
    } else if (e > 0 && e === 2) {
      return (
        <>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
        </>
      )
    } else if (e > 0 && e === 3) {
      return (
        <>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
        </>
      )
    } else if (e > 0 && e === 4) {
      return (
        <>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
        </>
      )
    } else if (e > 0 && e === 5) {
      return (
        <>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </>
      )
    } else if (e <= 0) {
      return (
        <>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
          <i className="fa-solid fa-star" style={{ color: 'gray' }}></i>
        </>
      )
    }
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
              {userSelect.length !== 0 &&
                locationRows.length !== 0 &&
                locationRows.map((v, i) => {
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
              {userSelect.length !== 0 && mountainRows.length !== 0
                ? mountainRows.map((v, i) => {
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
                <div className={style.cardImg}>
                  <img
                    src={`http://localhost:3001/room_img/${v.room_img}`}
                    alt=""
                  />
                </div>
                <div className={style.detail}>
                  <div className={style.title}>
                    <div className={style.roomName}>{v.room_name}</div>
                    <div className={style.star}>
                      {starCount(Math.round(v.Average))}

                      <span className={style.commentQTY}>
                        ({v.commentQty > 0 ? v.commentQty : 0})
                      </span>
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
                    {v.room_service_sid.split(',').map((v, i) => {
                      return (
                        <div key={i}>
                          <img src={`/img/room_service_img/${v}.png`} alt="" />
                          <span>{service[v - 1]}</span>
                        </div>
                      )
                    })}
                  </div>
                  <div className={style.text}>
                    <span>距離登山口：{`${v.room_entry_distance}`}公里</span>
                    <span>地址：{`${v.room_entry_address}`}</span>
                    <span>電話：{`${v.room_telephone}`}</span>
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
