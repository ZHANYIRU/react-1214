import styled from '../../styles/member-scss/Member.module.scss'
import { Outlet, useNavigate, useLocation, useFetcher } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import MemberContext from '../../contexts/MemberContext'

function Profile(props) {
  const navigate = useNavigate()
  const location = useLocation()

  const usp = new URLSearchParams(location.search)
  const mid = usp.get('id')

  let initInfo = {
    member_sid: mid,
    nickname: '',
    avatar: '',
    intro: '',
  }

  const { data } = useContext(MemberContext)

  const [info, setInfo] = useState(initInfo)

  async function getInfo() {
    const result = await axios.get(
      `http://localhost:3001/member/profile/api?mid=${mid}`
    )

    // console.log(result.data)

    if (result.data.rows) {
      setInfo(result.data.rows[0])
    } else {
      navigate('/')
    }
  }

  console.log()

  useEffect(() => {
    if (!location.search) {
      navigate('/')
    }

    if (`${info.member_sid}` === `${data.member_sid}`) {
      navigate('/member')
    }

    getInfo()
  }, [info.member_sid])

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <aside className={styled.profile}>
            <div
              className={`${styled.avatar} ${styled.social}`}
              onClick={() => {
                navigate(`/profile/?mid=${mid}`)
              }}
            >
              {info.avatar ? (
                <img
                  src={`http://localhost:3001/uploads/thumb_${info.avatar}`}
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
                navigate(`/profile/?mid=${mid}`)
              }}
            >
              {info.nickname}
            </h3>
            <p className={styled.highlight}>銀級玩家</p>
            <div className={styled.socials}>
              <div
                className={styled.social}
                onClick={() => {
                  navigate(`/profile/following/?mid=${1}`)
                }}
              >
                <p className={styled.highlight}>關注</p>
                <h3>7</h3>
              </div>
              <div
                className={styled.social}
                onClick={() => {
                  navigate('/profile/followers/?mid=1')
                }}
              >
                <p className={styled.highlight}>粉絲</p>
                <h3>43</h3>
              </div>
            </div>
            <button className={styled.follow}>
              <i className="fa-solid fa-user-plus"></i> 關注他
            </button>
            <pre className={styled.intro}>{info.intro}</pre>
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
