import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '../../styles/member-scss/Login.module.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRef } from 'react'
import { useContext } from 'react'
import MemberContext from '../../contexts/MemberContext'
import { useEffect } from 'react'

function Login(props) {
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()
  const loginForm = useRef(null)
  const { setAuth, resetData, auth } = useContext(MemberContext)

  useEffect(() => {
    if (auth) {
      navigate('/member')
    }
  }, [auth])

  const login = async function () {
    const formData = new FormData(loginForm.current)

    const result = await axios.post(
      'http://localhost:3001/member/login/api',
      formData
    )
    // console.log(result.data)
    // setData({...data, member_sid: result.data.member_sid})

    if (result.data.success) {
      localStorage.setItem('token', `${result.data.token}`)
      // alert('登入成功')
      setAuth(true)
      navigate('/')
    }

    if (!result.data.success) {
      localStorage.removeItem('token')
      // alert('登入失敗')
      setAuth(false)
      resetData()
      Swal.fire({
        icon: 'error',
        title: '登入失敗, 信箱或密碼錯誤',
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      })
    }
  }

  const forgotPass = async function () {
    const formData = new FormData(loginForm.current)

    if (!formData.get('email')) {
      return Swal.fire({
        icon: 'error',
        title: '請輸入電子信箱',
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      })
    }

    const result = await axios.post(
      'http://localhost:3001/member/forgotPass/api',
      formData
    )

    if (result) {
      if (result.data.message === '密碼重置信已寄出') {
        return Swal.fire({
          icon: 'success',
          title: result.data.message,
          confirmButtonColor: '#216326',
          scrollbarPadding: false,
        })
      }
      return Swal.fire({
        icon: 'error',
        title: result.data.message,
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      })
    }

    // alert(result.data)
    // alert(formData.get('email'))
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
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    forgotPass()
                  }}
                >
                  忘記密碼
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
