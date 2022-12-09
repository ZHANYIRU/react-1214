import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

const MemberContext = createContext({})

export default MemberContext

export const MemberContextProvider = function ({ children }) {
  let initInfo = {
    member_sid: '',
    name: '',
    password: '',
    email: '',
    mobile: '',
    address: '',
    birthday: '',
    nickname: '',
    member_level: 1,
    total_height: 0,
    avatar: '',
    created_at: '',
    intro: '',
    token: '',
  }

  const resetInfo = initInfo

  const [data, setData] = useState(initInfo)
  const [auth, setAuth] = useState(false)
  const [follow, setFollow] = useState([])
  const [following, setFollowing] = useState([])

  async function getInfo() {
    const token = localStorage.getItem('token')

    const result = await axios.get(`http://localhost:3001/member/api`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (result.data.rows) {
      setData({
        ...result.data.rows[0],
        birthday: result.data.rows[0].birthday ? dayjs(result.data.rows[0].birthday).format('YYYY-MM-DD') : "",
      })
      // console.log(result.data.rows[0])
      setAuth(true)
    } else {
      setData(resetInfo)
      // console.log(result.data)
    }
  }

  async function getFollow() {
    const rows = await axios.get(
      `http://localhost:3001/member/follow/api?mid=${data.member_sid}`
    )
    setFollow(rows.data)
    // console.log('followed by:' + rows.data.length)
  }

  async function getFollowing() {
    const rows = await axios.get(
      `http://localhost:3001/member/following/api?fid=${data.member_sid}`
    )
    setFollowing(rows.data)
    // console.log('following:' + rows.data.length)
  }

  function resetData() {
    if (!auth) {
      setData(resetInfo)
    }
  }

  // const token = localStorage.getItem('token')
  // if (token) {
  //   setAuth(true)
  // }

  useEffect(() => {
    getInfo()
    resetData()
  }, [auth])

  useEffect(() => {
    if (data.member_sid === '') {
      setAuth(false)
      setFollow([])
      setFollowing([])
    }
    getFollow()
    getFollowing()
  }, [data])

  //  const getUpdateInfo = function () {
  //     getInfo()
  //  }

  return (
    <MemberContext.Provider
      value={{
        data,
        setData,
        auth,
        setAuth,
        resetData,
        getInfo,
        follow,
        following,
        setFollowing,
        getFollowing,
        getFollow,
      }}
    >
      {children}
    </MemberContext.Provider>
  )
}
