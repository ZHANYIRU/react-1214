import styles from '../../styles/member-scss/Member.module.scss'
import { Outlet, useNavigate } from 'react-router-dom'

function Member(props) {
  const navigate = useNavigate()

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <aside>
            <div
              className={`${styles.avatar} ${styles.social}`}
              onClick={() => {
                navigate('/member')
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
                navigate('/member')
              }}
            >
              阿克婭
            </h3>
            <p className={styles.highlight}>銀級玩家</p>
            <div className={styles.socials}>
              <div
                className={styles.social}
                onClick={() => {
                  navigate('/member/following')
                }}
              >
                <p className={styles.highlight}>關注</p>
                <h3>7</h3>
              </div>
              <div
                className={styles.social}
                onClick={() => {
                  navigate('/member/followers')
                }}
              >
                <p className={styles.highlight}>粉絲</p>
                <h3>43</h3>
              </div>
            </div>
            <p className={styles.intro}>
              喜愛登山與旅遊結合規劃，發掘台灣的歷史與美，熱愛攝影，探索台灣百岳，中級山，郊山的山野旅行者。GoHiking ! ! !
              {/* 一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十 */}
            </p>
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
