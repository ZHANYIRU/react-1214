import { useRef } from 'react'
import { useState } from 'react'
import styled from '../../styles/member-scss/Join.module.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import TextareaAutosize from 'react-textarea-autosize'

export default function Join(props) {
  const [showPass, setShowPass] = useState({
    myPass: false,
    verPass: false,
  })

  const navigate = useNavigate()

  const [showSuccess, setShowSuccess] = useState(false)

  const joinForm = useRef(null)

  async function handleSumbit(e) {
    e.preventDefault()

    const formData = new FormData(joinForm.current)

    let result = await axios.post('http://localhost:3001/member/api', formData)

    // console.log(result.data)
    setShowSuccess(true)
  }

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <h3>會員註冊</h3>
            <div className={styled.divider}></div>
            <form ref={joinForm} encType="multipart/form-data">
              {/* <div className={styled.avatar}> */}
              {/* <img src="" alt="avatar"></img> */}
              {/* </div>
              <label htmlFor="avatar" className={styled.avatarLabel}> 上傳大頭貼
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  name="avatar"
                  id='avatar'
                />
              </label> */}

              <p>(打*號為必填欄位)</p>
              <div className={styled.formRow}>
                <label className={styled.required}>姓名</label>
                <input type="text" name="name"></input>
              </div>
              <div className={styled.formRow}>
                <label className={styled.required}>顯示名稱</label>
                <input type="text" name="nickname"></input>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="password" className={styled.required}>
                  密碼
                </label>
                <input
                  type={showPass.myPass ? 'text ' : 'password'}
                  name="password"
                ></input>
                <div
                  className={styled.showPass}
                  onClick={() => {
                    setShowPass({ ...showPass, myPass: !showPass.myPass })
                  }}
                >
                  {showPass.myPass ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </div>
              </div>
              <div className={styled.formRow}>
                <label className={styled.required}>確認密碼 </label>
                <input type={showPass.verPass ? 'text ' : 'password'}></input>
                <div
                  className={styled.showPass}
                  onClick={() => {
                    setShowPass({ ...showPass, verPass: !showPass.verPass })
                  }}
                >
                  {showPass.verPass ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </div>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="mobile">手機號碼</label>
                <input type="text" name="mobile"></input>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="email" className={styled.required}>
                  電子信箱
                </label>
                <input type="email" name="email"></input>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="birthday">生日</label>
                <input type="date" name="birthday"></input>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="address" className={styled.forTxtArea}>
                  地址
                </label>
                <textarea
                  name="address"
                  rows="4"
                  style={{ resize: 'none' }}
                  maxLength="120"
                ></textarea>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="intro" className={styled.forTxtArea}>
                  個人簡介
                </label>
                <TextareaAutosize
                  name="intro"
                  placeholder="(最多120字)"
                  style={{ resize: 'none' }}
                  maxRows="8"
                  minRows="4"
                  maxLength="120"
                 />
              </div>
              {/* bonus: 驗證碼API */}
              <button onClick={handleSumbit}>註冊會員</button>
            </form>
          </div>
        </div>
      </div>
      {showSuccess && (
        <div className={styled.alertBg}>
          <div className={styled.alert}>
            <h3>註冊成功！</h3>
            <button
              onClick={() => {
                navigate('/login')
                setShowSuccess(false)
              }}
            >
              前往登入
            </button>
          </div>
        </div>
      )}
    </>
  )
}
