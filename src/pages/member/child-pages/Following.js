import styled from '../../../styles/member-scss/Follow.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import MemberContext from '../../../contexts/MemberContext'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Following() {
  const navigate = useNavigate()
  const location = useLocation()
  const usp = new URLSearchParams(location.search)
  const { data, auth, following, getFollowing } = useContext(MemberContext)
  const [profileFollowing, setProfileFollowing] = useState([])

  const token = localStorage.getItem('token')

  const mid = usp.get('id') || data.member_sid || ''

  // console.log('關注列表ID:' + mid)

  async function getFollowingInfo() {
    const rows = await axios.get(
      `http://localhost:3001/member/following/api?fid=${mid}`
    )
    setProfileFollowing(rows.data)
    // console.log('關注中對象:' + JSON.stringify(rows.data))
  }

  async function unfollow(member_sid) {
    const token = localStorage.getItem('token') || ''

    if (!token) {
      return Swal.fire({ title: '請先登入會員', confirmButtonColor: '#216326',scrollbarPadding: false, })
    }

    const result = await axios.delete(
      `http://localhost:3001/member/follow/api?mid=${member_sid}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )
    // console.log(result.data)
    if (result.data.success) {
      // alert('取消關注成功')
      getFollowingInfo()
      getFollowing()
    }
    if (!result.data.success) {
      Swal.fire({
        icon: 'error',
        title: '取消關注失敗',
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      })
    }
  }

  async function addFollow(member_sid) {
    const token = localStorage.getItem('token') || ''

    if (!token) {
      return Swal.fire({ title: '請先登入會員', confirmButtonColor: '#216326',scrollbarPadding: false, })
    }

    if (member_sid === data.member_sid) {
      return Swal.fire({
        icon: 'error',
        title: '無法將自己加入關注',
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      })
    }

    const result = await axios.post(
      `http://localhost:3001/member/follow/api?mid=${member_sid}`,
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
      getFollowingInfo()
      getFollowing()
    }
    if (!result.data.success) {
      Swal.fire({
        icon: 'error',
        title: '關注失敗',
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      })
    }
  }

  useEffect(() => {
    getFollowingInfo()
  }, [mid])

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <div className={styled.flexbox}>
              <h3>關注中</h3>
              <h3>{profileFollowing.length}人</h3>
            </div>
            <div className={styled.divider}></div>
            <div className={styled.userList}>
              {profileFollowing.map((v, i) => {
                return (
                  <div className={styled.user} key={i}>
                    <div
                      className={styled.portrait}
                      onClick={() => {
                        navigate(
                          `${v.member_sid}` === `${data.member_sid}`
                            ? `/member`
                            : `/profile?id=${v.member_sid}`
                        )
                      }}
                    >
                      {v.avatar ? (
                        <img
                          src={`http://localhost:3001/uploads/avatar_${v.avatar}`}
                          alt="avatar"
                        ></img>
                      ) : (
                        <img src="/img/default_avatar.png" alt="avatar" />
                      )}
                    </div>
                    <h4>{v.nickname}</h4>
                    {following &&
                    following.find((e) => v.member_sid === e.member_sid) ? (
                      <button
                        className={styled.following}
                        onClick={() => {
                          unfollow(v.member_sid)
                        }}
                      >
                        關注中
                      </button>
                    ) : (
                      <button
                        className={styled.follow}
                        onClick={() => {
                          if (!token && !auth) {
                            return Swal.fire({
                              title: '請先登入會員',
                              confirmButtonColor: '#216326',
                              scrollbarPadding: false,
                            })
                          }
                          addFollow(v.member_sid)
                        }}
                      >
                        關注他
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
