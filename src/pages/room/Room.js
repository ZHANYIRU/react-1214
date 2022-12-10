import axios from 'axios'
import { useRef, useState, useEffect } from 'react'
import style from '../../styles/room-scss/room.module.scss'
import RoomCard from './components/RoomCard'
import RoomCard2 from './components/RoomCard2'
import RoomCard3 from './components/RoomCard3'
import RoomCardSearch from './components/RoomCardSearch'
import RoomSearch from './components/RoomSearch'
function Room({ data, setData }) {
  // fetch db檔案
  const [roomlist, setRoomList] = useState([])
  async function getList() {
    const { data } = await axios.get('http://localhost:3001/room/list')
    setRoomList(data)
  }
  //fetch searchbar內容
  const [searchbar, setSearchBar] = useState([])
  async function getSearchList() {
    const { data } = await axios.get('http://localhost:3001/room/searchbar')
    // console.log('searchlist', data)
    setSearchBar(data)
  }

  // 保存SearchBar選擇狀態
  const [selectRoom, setSelectRoom] = useState([])

  // 紀錄使用者輸入的關鍵字
  const [keyWord, setKeyWord] = useState('')

  //監控內容高度
  const [ftrRoom, setFtrRoom] = useState(false)
  const roomHeight = useRef()
  const scroll = () => {
    const windowH = window.innerHeight - 250
    const roomH = roomHeight.current.clientHeight
    const windowScrollY = window.scrollY
    if (windowScrollY + windowH * 0.8 > roomH) {
      console.log('windowH', windowH)
      console.log('roomH', roomH)
      console.log('windowScrollY', windowScrollY)
      console.log('111')
      setFtrRoom(true)
    } else {
      console.log('222')

      setFtrRoom(false)
    }
  }

  useEffect(() => {
    getSearchList()
    getList()
    setFtrRoom(false)
    window.addEventListener('scroll', scroll)
    return () => {
      window.removeEventListener('scroll', scroll)
    }
  }, [])
  return (
    <>
      <div className={style.bgc}>
        <div className={`${style.box} ${style.div1}`}></div>
        <div className={`${style.box} ${style.div2}`}></div>
        <div className={`${style.box} ${style.div3}`}></div>
      </div>
      <div
        className={style.divWrap}
        style={{ visibility: ftrRoom && 'hidden' }}
      >
        <div className={`${style.box2} ${style.div4}`}>
          <img src="/img/4.png" alt="" />
        </div>
        <div className={`${style.box2} ${style.div5}`}>
          <img src="/img/5.png" alt="" />
        </div>
      </div>

      <div className={style.container} ref={roomHeight}>
        <h2
          className={style.title}
          onClick={(e) => {
            setData(e.target.value)
          }}
        >
          還在為尋找登山口住宿而煩惱嗎？ <br />
          別擔心！ <br />
          837都為大家整理好了！
        </h2>
        <RoomSearch
          searchbar={searchbar}
          setSearchBar={setSearchBar}
          selectRoom={selectRoom}
          setSelectRoom={setSelectRoom}
          keyWord={keyWord}
          setKeyWord={setKeyWord}
          data={data}
          setData={setData}
        />
        {selectRoom.length !== 0 && (
          <RoomCardSearch
            selectRoom={selectRoom}
            setSelectRoom={setSelectRoom}
          />
        )}

        <RoomCard roomlist={roomlist} />
        <RoomCard2 roomlist={roomlist} />
        <RoomCard3 roomlist={roomlist} />
      </div>
    </>
  )
}

export default Room
