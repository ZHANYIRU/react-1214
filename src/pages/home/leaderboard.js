import React from 'react'
import { useState } from 'react'
import styled from '../../styles/home-scss/Leaderboard.module.scss'
export default function Leaderboard() {
  // 切換按鈕
  const [switchBtn, setSwitchBtn] = useState(false)
  const [fakeDataAll, setFakeDataAll] = useState([
    {
      sid: 1,
      rank: 1,
      img: 'https://pbs.twimg.com/media/FM12Yd3XEAIqM8S.jpg',
      name: 'aka爬山高手',
      height: 8377,
    },
    {
      sid: 2,
      rank: 2,
      img: 'https://pbs.twimg.com/media/FM12Yd3XEAIqM8S.jpg',
      name: 'aka爬山好手',
      height: 8000,
    },
    {
      sid: 3,
      rank: 3,
      img: 'https://pbs.twimg.com/media/FM12Yd3XEAIqM8S.jpg',
      name: 'aka爬山低手',
      height: 7000,
    },
    {
      sid: 4,
      rank: 4,
      img: 'https://pbs.twimg.com/media/FM12Yd3XEAIqM8S.jpg',
      name: 'aka爬山DD手',
      height: 5000,
    },
    {
      sid: 5,
      rank: 5,
      img: 'https://pbs.twimg.com/media/FM12Yd3XEAIqM8S.jpg',
      name: 'aka爬山DD手',
      height: 2300,
    },
  ])
  const [fakeDataFd, setFakeDataFd] = useState([
    {
      sid: 1,
      rank: 1,
      img: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg',
      name: 'aka爬山高手',
      height: 8377,
    },
    {
      sid: 2,
      rank: 2,
      img: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg',
      name: 'aka爬山好手',
      height: 8000,
    },
    {
      sid: 3,
      rank: 3,
      img: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg',
      name: 'aka爬山低手',
      height: 7000,
    },
    {
      sid: 4,
      rank: 4,
      img: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg',
      name: 'aka爬山DD手',
      height: 5000,
    },
    {
      sid: 5,
      rank: 5,
      img: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg',
      name: 'aka爬山DD手',
      height: 2300,
    },
  ])
  const display = switchBtn ? fakeDataAll : fakeDataFd

  const howHeight = (h) => {
    const heightest = 10000
    let present = Math.floor((h / heightest) * 100)
    return (
      <div className={styled.rectangle} style={{ width: `${present}%` }}>
        <p>{h}m</p>
      </div>
    )
  }
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
              <li key={v.sid}>
                <div className={styled.ranking}>{v.rank}</div>
                <div className={styled.nameWrap}>
                  <div className={styled.imgBorder}>
                    <div className={styled.imgWrap}>
                      <img src={v.img} alt="" />
                    </div>
                  </div>
                  <p>{v.name}</p>
                </div>
                <div className={styled.height}>{howHeight(v.height)}</div>
              </li>
            )
          })}
          <div className={styled.switchBtn}>
            <div
              className={styled.btnLeft}
              onClick={() => {
                setSwitchBtn(true)
              }}
            >
              全部排名
            </div>
            <div
              className={styled.btnRight}
              onClick={() => {
                setSwitchBtn(false)
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
