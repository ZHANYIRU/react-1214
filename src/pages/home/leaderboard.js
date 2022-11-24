import log from 'eslint-plugin-react/lib/util/log'
import React from 'react'
import { useState, useContext, useEffect } from 'react'
import MemberContext from '../../contexts/MemberContext'
import styled from '../../styles/home-scss/Leaderboard.module.scss'
import axios from 'axios'
import { forEach } from 'lodash'
export default function Leaderboard() {
  //從context來的該會員登入資料
  const memberData = useContext(MemberContext)

  // 拿到該會員相關的好友們的PO文高度
  const [yourFdData, setYourFdData] = useState([{}])
  //全部資料
  const [allData, setAllData] = useState([{ d: 1 }])

  const fetchYourFd = async () => {
    const response = await axios.get(
      `http://localhost:3001/product/borad/api?mid=${memberData.data.member_sid}`
    )
    const data = response.data
    // console.log(r)
    setYourFdData(data)
  }

  const fetchAll = async () => {
    const response = await axios.get(`http://localhost:3001/product/borad/api2`)
    const data = response.data
    // console.log(r)
    console.log('我是全部')
    setAllData(data)
  }

  // 切換按鈕
  const [switchBtn, setSwitchBtn] = useState(true)
  // const [fakeDataAll, setFakeDataAll] = useState([
  //   {
  //     member_sid: 1,
  //     rank: 1,
  //     avatar: 'https://pbs.twimg.com/media/FM12Yd3XEAIqM8S.jpg',
  //     name: 'aka爬山高手',
  //     total_height: 8377,
  //   },
  // ])
  const display = switchBtn ? allData : yourFdData

  const howHeight = (h) => {
    const heightest = 10000
    let present = Math.floor((h / heightest) * 100)
    return (
      <div className={styled.rectangle} style={{ width: `${present}%` }}>
        <p>{h}m</p>
      </div>
    )
  }
  useEffect(() => {
    fetchAll()
    fetchYourFd()
  }, [])

  return (
    <div className={styled.LeaderboardWrap}>
      <div className={styled.Leaderboard}>
        <div className={styled.topWrap}>
          <h2>登山英雄排行榜</h2>
          <form action="">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="搜尋山友" />
          </form>
        </div>
        <div className={styled.board}>
          <div className={styled.head}>
            <div className={styled.ranking}>名次</div>
            <div className={styled.name}>名稱</div>
            <div className={styled.height}>累積高度</div>
          </div>
          {display.map((v, i) => {
            return (
              <li key={v.member_sid}>
                <div className={styled.ranking}>{v.rank}</div>
                <div className={styled.nameWrap}>
                  <div className={styled.imgBorder}>
                    <div className={styled.imgWrap}>
                      <img src={v.avatar} alt="" />
                    </div>
                  </div>
                  <p>{v.name}</p>
                </div>
                <div className={styled.height}>{howHeight(v.total_height)}</div>
              </li>
            )
          })}
          <div className={styled.switchBtn}>
            <div
              className={styled.btnLeft}
              onClick={() => {
                setSwitchBtn(true)
                fetchAll()
              }}
            >
              全部排名
            </div>
            <div
              className={styled.btnRight}
              onClick={() => {
                setSwitchBtn(false)
                fetchYourFd()
              }}
            >
              好友排名
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
