import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

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

  async function getInfo() {
    const token = localStorage.getItem('token')

    const result = await axios.get(`http://localhost:3001/member/api`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (result.data.rows) {
      setData(result.data.rows[0])
      console.log(result.data.rows[0])
    } else {
      setData(resetInfo)
      console.log(result.data)
    }
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

  //  const getUpdateInfo = function () {
  //     getInfo()
  //  }

  return (
    <MemberContext.Provider value={{ data, setData, auth, setAuth, resetData }}>
      {children}
    </MemberContext.Provider>
  )
}
