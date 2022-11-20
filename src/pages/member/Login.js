import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '../../styles/member-scss/Login.module.scss'
import axios from 'axios'
import { useRef } from 'react'
import { useContext } from 'react'
import MemberContext from '../../contexts/MemberContext'
import { useEffect } from 'react'

function Login(props) {
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()
  const loginForm = useRef(null)

  const login = async function () {
    const formData = new FormData(loginForm.current)

    const result = await axios.post(
      'http://localhost:3001/member/login/api',
      formData
    )
    console.log(result.data)
    // setData({...data, member_sid: result.data.member_sid})
    localStorage.setItem('token', `${result.data.token}`)

    if (result.data.success) {
      navigate('/')
    }
  }

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <h3>會員登入</h3>
            <div className={styled.divider}></div>
            <form ref={loginForm}>
              <div className={styled.formRow}>
                <label htmlFor="email">電子信箱</label>
                <input type="email" name="email"></input>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="password">密碼</label>
                <input
                  type={showPass ? 'text ' : 'password'}
                  name="password"
                ></input>
                <div
                  className={styled.showPass}
                  onClick={() => {
                    setShowPass(!showPass)
                  }}
                >
                  {showPass ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </div>
              </div>
              <div className={styled.btnGroup}>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    login()
                  }}
                >
                  登入
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/join')
                  }}
                >
                  註冊新會員
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
