import styled from '../../styles/member-scss/Member.module.scss'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import MemberContext from '../../contexts/MemberContext'
import { avatarLevel } from './components/Avatar'
import { titleLevel } from './components/Avatar'

function Profile(props) {
  const navigate = useNavigate()
  const location = useLocation()
  let usp = new URLSearchParams(location.search)
  let mid = usp.get('id')

  let initInfo = {
    member_sid: mid,
    nickname: '',
    avatar: '',
    intro: '',
    total_height: 0,
  }

  const { data, auth, getFollow, getFollowing } = useContext(MemberContext)

  // console.log('目前登入會員為:' + data.member_sid)

  const [info, setInfo] = useState(initInfo)
  const [follow, setFollow] = useState([])
  const [following, setFollowing] = useState([])
  const [isFollowing, setIsFollowing] = useState(false)

  async function getInfo() {
    usp = new URLSearchParams(location.search)
    mid = usp.get('id')

    const result = await axios.get(
      `http://localhost:3001/member/profile/api?mid=${mid}`
    )

    if (result.data && result.data.rows[0]) {
      setInfo(result.data.rows[0])
    } else {
      navigate('/')
    }
  }

  async function getMyFollow() {
    const rows = await axios.get(
      `http://localhost:3001/member/follow/api?mid=${mid}`
    )
    // console.log('目前登入會員為:' + data.member_sid)
    // console.log('會員的關注者為:'+ JSON.stringify(rows.data))

    setIsFollowing(false)

    rows.data.map((v, i) => {
      if (+v.member_sid === +data.member_sid) {
        setIsFollowing(true)
      }
      return null
    })

    setFollow(rows.data)
    // console.log('followed by:' + rows.data.length)
  }

  async function getMyFollowing() {
    const rows = await axios.get(
      `http://localhost:3001/member/following/api?fid=${mid}`
    )

    setFollowing(rows.data)
    // console.log('following:' + rows.data.length)
  }

  async function addFollow() {
    const token = localStorage.getItem('token') || ''

    if (!token) {
      return Swal.fire({ title: '請先登入會員', confirmButtonColor: '#216326',scrollbarPadding: false, })
    }
    const result = await axios.post(
      `http://localhost:3001/member/follow/api?mid=${mid}`,
      {
        mid: mid,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )

    // console.log(result.data.success)
    if (result.data.success) {
      // alert('關注成功')
      setIsFollowing(true)
      getFollow()
      getFollowing()
      getMyFollow()
      getFollowing()
    }
    if (!result.data.success) {
      Swal.fire({
        logo: 'error',
        title: '關注失敗',
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      })
    }
  }

  async function unfollow() {
    const token = localStorage.getItem('token') || ''

    if (!token) {
      return Swal.fire({ title: '請先登入會員', confirmButtonColor: '#216326',scrollbarPadding: false, })
    }

    const result = await axios.delete(
      `http://localhost:3001/member/follow/api?mid=${mid}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )
    // console.log(result.data)
    if (result.data.success) {
      // alert('取消關注成功')
      setIsFollowing(false)
      getFollow()
      getFollowing()
    }
    if (!result.data.success) {
      Swal.fire({
        logo: 'error',
        title: '取消關注失敗',
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      })
    }
  }

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

  useEffect(() => {
    if (!location.search) {
      navigate('/')
    }

    if (`${mid}` === `${data.member_sid}`) {
      navigate('/member')
    }

    getMyFollow()
    getMyFollowing()
    getInfo()
  }, [mid, data.member_sid, isFollowing])

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <aside className={styled.profile}>
            <div
              className={`${styled.avatar} ${styled.social} ${avatarLevel(
                info && info.total_height
              )}`}
              onClick={() => {
                navigate(`/profile?id=${mid}`)
              }}
            >
              {info && info.avatar ? (
                <img
                  src={`http://localhost:3001/uploads/avatar_${info.avatar}`}
                  alt="avatar"
                ></img>
              ) : (
                <img src="/img/default_avatar.png" alt="avatar" />
              )}
            </div>
            <h3
              className={styled.social}
              onClick={() => {
                navigate(`/profile?id=${mid}`)
              }}
            >
              {info && info.nickname}
            </h3>
            <p className={styled.highlight}>
              {titleLevel(info && info.total_height)}
            </p>
            <div className={styled.socials}>
              <div
                className={styled.social}
                onClick={() => {
                  navigate(`/profile/following?id=${mid}`)
                }}
              >
                <p className={styled.highlight}>關注</p>
                <h3>{following.length}</h3>
              </div>
              <div
                className={styled.social}
                onClick={() => {
                  navigate(`/profile/followers?id=${mid}`)
                }}
              >
                <p className={styled.highlight}>粉絲</p>
                <h3>{follow.length}</h3>
              </div>
            </div>
            {isFollowing ? (
              <button
                className={styled.follow}
                onClick={() => {
                  if (!auth) {
                    Swal.fire({
                      title: '請先登入會員',
                      confirmButtonColor: '#216326',
                      scrollbarPadding: false,
                    })
                  } else {
                    unfollow()
                  }
                }}
              >
                已關注
              </button>
            ) : (
              <button
                className={styled.follow}
                onClick={() => {
                  if (!auth) {
                    Swal.fire({
                      title: '請先登入會員',
                      confirmButtonColor: '#216326',
                      scrollbarPadding: false,
                    })
                  } else {
                    addFollow()
                  }
                }}
              >
                <i className="fa-solid fa-user-plus"></i> 關注他
              </button>
            )}

            <pre className={styled.intro}>{info && info.intro}</pre>
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
