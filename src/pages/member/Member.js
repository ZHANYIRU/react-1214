import styled from '../../styles/member-scss/Member.module.scss'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useContext } from 'react'
// import axios from 'axios'
// import { useState } from 'react'
import MemberContext from '../../contexts/MemberContext'

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
              {data.avatar ? (
                <img
                  src={`http://localhost:3001/uploads/avatar_${data.avatar}`}
                  alt="avatar"
                ></img>
              ) : (
                <img
                  src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
                  alt="postImg"
                ></img>
              )}
            </div>
            <h3
              className={styled.social}
              onClick={() => {
                navigate('/member')
              }}
            >
              {data.nickname}
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
            <pre className={styled.intro} readOnly>
              {data.intro}
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
            <Outlet />
          </article>
        </div>
      </div>
    </>
  )
}

export default Member
