import styled from '../../styles/member-scss/Member.module.scss'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

function Member(props) {
  const navigate = useNavigate()

  const [profile, setProfile] = useState({
    name: '',
    intro: '',
    avatar: '',
  })

  async function getInfo() {
    const result = await axios.get('http://localhost:3001/member/api?id=666')
    // console.log(result.data.rows[0].name)
    if (result.data.rows[0]) {
      setProfile(result.data.rows[0])
    }
  }

  useEffect(() => {
    getInfo()
  }, [])

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <aside>
            <div
              className={`${styled.avatar} ${styled.social}`}
              onClick={() => {
                navigate('/member')
              }}
            >
              {profile.avatar ? (
                <img
                  src={`http://localhost:3001/uploads/${profile.avatar}`}
                  alt="avatar"
                ></img>
              ) : (
                ''
              )}
            </div>
            <h3
              className={styled.social}
              onClick={() => {
                navigate('/member')
              }}
            >
              {profile.nickname}
            </h3>
            <p className={styled.highlight}>銀級玩家</p>
            <div className={styled.socials}>
              <div
                className={styled.social}
                onClick={() => {
                  navigate('/member/following')
                }}
              >
                <p className={styled.highlight}>關注</p>
                <h3>7</h3>
              </div>
              <div
                className={styled.social}
                onClick={() => {
                  navigate('/member/followers')
                }}
              >
                <p className={styled.highlight}>粉絲</p>
                <h3>43</h3>
              </div>
            </div>
            <pre className={styled.intro} readOnly>
              {profile.intro}
              {/* 喜愛登山與旅遊結合規劃，發掘台灣的歷史與美，熱愛攝影，探索台灣百岳，中級山，郊山的山野旅行者。GoHiking! ! ! */}
            </pre>
            {/* bonus: 處理換行問題 */}
            <button
              onClick={() => {
                navigate('/member/orders')
              }}
            >
              訂單紀錄
            </button>
            <button
              onClick={() => {
                navigate('/member/edit')
              }}
            >
              編輯會員資料
            </button>
            <button
              onClick={() => {
                navigate('/member/password')
              }}
            >
              修改密碼
            </button>
          </aside>
          <article>
            <Outlet profile={profile} setProfile={setProfile} />
          </article>
        </div>
      </div>
    </>
  )
}

export default Member
