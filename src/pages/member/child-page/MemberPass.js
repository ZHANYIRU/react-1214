import { useState } from 'react'
import styled from '../../../styles/member-scss/MemberPass.module.scss'

export default function MemberPass() {
  const [showPass, setShowPass] = useState(false)

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <h3>修改密碼</h3>
            <div className={styled.divider}></div>
            <form>
              <div className={styled.formRow}>
                <label htmlFor="password">目前的密碼</label>
                <input type={showPass ? 'text ' : 'password'}></input>
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
              <div className={styled.formRow}>
                <label htmlFor="password">輸入新密碼</label>
                <input type={showPass ? 'text ' : 'password'}></input>
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
              <div className={styled.formRow}>
                <label htmlFor="password">確認新密碼</label>
                <input type={showPass ? 'text ' : 'password'}></input>
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
              {/* bonus 驗證API */}
              <div className={styled.btnGroup}>
                <button>設定新密碼</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
