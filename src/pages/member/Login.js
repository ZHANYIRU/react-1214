import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '../../styles/member-scss/Login.module.scss'

function Login(props) {
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate();

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <h3>會員登入</h3>
            <div className={styled.divider}></div>
            <form>
              <div className={styled.formRow}>
                <label htmlFor='email'>電子信箱</label>
                <input type="email" name='email'></input>
              </div>
              <div className={styled.formRow}>
                <label htmlFor='password'>密碼</label>
                <input type={showPass ? 'text ' : 'password'} name='password'></input>
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
                <button>登入</button>
                <button onClick={(e)=>{
                  e.preventDefault()
                  navigate('/join')
                }}>註冊新會員</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
