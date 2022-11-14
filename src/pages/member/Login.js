import { useState } from 'react'
import styled from '../../styles/member-scss/Login.module.scss'

function Login(props) {
  const [showPass, setShowPass] = useState(false)

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <h3>會員登入</h3>
            <div className={styled.divider}></div>
            <form>
              <div className={styled.formRow}>
                <label>電子郵件</label>
                <input type="email"></input>
              </div>
              <div className={styled.formRow}>
                <label>密碼</label>
                <input type={showPass ? 'text ' : 'password'}></input>
                <div
                  className={styled.showPass}
                  onClick={()=>{setShowPass(!showPass)}}
                >
                  {showPass ? (
                    <i class="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i class="fa-solid fa-eye"></i>
                  )}
                </div>
              </div>
              <div className={styled.btnGroup}>
                <button>登入</button>
                <button>註冊新會員</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
