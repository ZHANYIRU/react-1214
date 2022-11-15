import styles from '../../styles/member-scss/Member.module.scss'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function Profile(props) {
  const navigate = useNavigate()
  const location = useLocation()

  console.log(location.search)

  useEffect(() => {
    if (!location.search) {
      navigate('/')
    }
  }, [])

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <aside className={styles.profile}>
            <div
              className={`${styles.avatar} ${styles.social}`}
              onClick={() => {
                navigate(`/profile/?mid=${1}`)
              }}
            >
              <img
                src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
                alt="avatar"
              ></img>
            </div>
            <h3
              className={styles.social}
              onClick={() => {
                navigate(`/profile/?mid=${1}`)
              }}
            >
              和真
            </h3>
            <p className={styles.highlight}>銀級玩家</p>
            <div className={styles.socials}>
              <div
                className={styles.social}
                onClick={() => {
                  navigate(`/profile/following/?mid=${1}`)
                }}
              >
                <p className={styles.highlight}>關注</p>
                <h3>7</h3>
              </div>
              <div
                className={styles.social}
                onClick={() => {
                  navigate('/profile/followers/?mid=1')
                }}
              >
                <p className={styles.highlight}>粉絲</p>
                <h3>43</h3>
              </div>
            </div>
            <button className={styles.follow}>
              <i className="fa-solid fa-user-plus"></i> 關注他
            </button>
            <p className={styles.intro}>
              喜愛登山與旅遊結合規劃，發掘台灣的歷史與美，熱愛攝影，探索台灣百岳，中級山，郊山的山野旅行者。GoHiking
              ! ! !
              {/* 一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十 */}
            </p>
            {/* bonus: 處理換行問題 */}
          </aside>
          <article>
            <Outlet />
          </article>
        </div>
      </div>
    </>
  )
}

export default Profile
