import styled from '../../styles/member-scss/Member.module.scss'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useContext } from 'react'
// import axios from 'axios'
// import { useState } from 'react'
import MemberContext from '../../contexts/MemberContext'
import { avatarLevel } from './components/Avatar'
import { titleLevel } from './components/Avatar'

function Member(props) {
  const navigate = useNavigate()

  const { data, auth, follow, following, getFollow, getFollowing } =
    useContext(MemberContext)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }

    getFollow()
    getFollowing()
  }, [auth, data])

  // function avatarLevel(height = 0) {
  //   if (height > 3000) {
  //     return styled.silver
  //   }
  //   return styled.bronze
  // }

  // function titleLevel(height = 0) {
  //   if (height > 3000) {
  //     return '銀級玩家'
  //   }
  //   return '銅級玩家'
  // }

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <aside>
            <div className={styled.nameMobile}>
              <h3
                className={styled.social}
                onClick={() => {
                  navigate('/member')
                }}
              >
                {data.nickname}
              </h3>
              <p className={styled.highlight}>
                {titleLevel(data.total_height)}
              </p>
            </div>
            <div className={styled.memberStats}>
              <div
                className={`${styled.avatar} ${styled.social} ${avatarLevel(
                  data.total_height
                )}`}
                onClick={() => {
                  navigate('/member')
                }}
              >
                {data.avatar ? (
                  <img
                    src={`http://localhost:3001/uploads/avatar_${data.avatar}`}
                    alt="avatar"
                    loading="lazy"
                  ></img>
                ) : (
                  <img src="/img/default_avatar.png" alt="avatar" />
                )}
              </div>
              <div className={styled.nameWeb}>
                <h3
                  className={styled.social}
                  onClick={() => {
                    navigate('/member')
                  }}
                >
                  {data.nickname}
                </h3>
                <p className={styled.highlight}>
                  {titleLevel(data.total_height)}
                </p>
              </div>
              <div className={styled.socials}>
                <div
                  className={styled.social}
                  onClick={() => {
                    navigate('/member/following')
                  }}
                >
                  <p className={styled.highlight}>關注</p>
                  <h3>{following.length}</h3>
                </div>
                <div
                  className={styled.social}
                  onClick={() => {
                    navigate('/member/followers')
                  }}
                >
                  <p className={styled.highlight}>粉絲</p>
                  <h3>{follow.length}</h3>
                </div>
              </div>
            </div>
            <pre className={styled.intro} readOnly>
              {data.intro}
              {/* 喜愛登山與旅遊結合規劃，發掘台灣的歷史與美，熱愛攝影，探索台灣百岳，中級山，郊山的山野旅行者。GoHiking! ! ! */}
            </pre>
            {/* bonus: 處理換行問題 */}
            <div className={styled.btnGrp}>
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
            </div>
          </aside>
          <article>
            <Outlet />
          </article>
        </div>
      </div>
    </>
  )
}

export default Member
