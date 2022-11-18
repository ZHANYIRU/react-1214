import axios from 'axios'
import { useRef, useState } from 'react'
import styled from '../../../styles/member-scss/MemberPass.module.scss'

export default function MemberPass() {
  const [showPass, setShowPass] = useState(false)

  const passForm = useRef(null)

  async function updatePass(e) {
    e.preventDefault()

    const formData = new FormData(passForm.current)

    const result = await axios.put(
      'http://localhost:3001/member/api/pass?id=668',
      formData
    )

    console.log(result.data)
  }

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <h3>修改密碼</h3>
            <div className={styled.divider}></div>
            <form ref={passForm}>
              <div className={styled.formRow}>
                <label htmlFor="password">目前的密碼</label>
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
              <div className={styled.formRow}>
                <label htmlFor="newPass">輸入新密碼</label>
                <input
                  type={showPass ? 'text ' : 'password'}
                  name="newPass"
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
              <div className={styled.formRow}>
                <label htmlFor="verPass">確認新密碼</label>
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
                <button
                  onClick={(e) => {
                    updatePass(e)
                  }}
                >
                  設定新密碼
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
