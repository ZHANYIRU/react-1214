import axios from 'axios'
import { useContext, useRef, useState, useEffect } from 'react'
import styled from '../../../styles/member-scss/MemberPass.module.scss'
import MemberContext from '../../../contexts/MemberContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

//TODO 密碼格式驗證 確認密碼驗證

export default function MemberPass() {
  const [showPass, setShowPass] = useState({
    showNow: false,
    showNew: false,
    showVer: false,
  })

  const navigate = useNavigate()

  const { data, auth } = useContext(MemberContext)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [auth])

  // console.log(data.member_sid)

  const passForm = useRef(null)

  async function updatePass() {
    const formData = new FormData(passForm.current)

    const token = localStorage.getItem('token') || ''

    const result = await axios.put(
      'http://localhost:3001/member/api/pass',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )

    if (result.data && result.data.success) {
      // alert('密碼更新成功')
      Swal.fire({ icon: 'success', title: '密碼更新成功' })
    }
    if (!result.data.success) {
      // alert('密碼更新失敗')
      Swal.fire({ icon: 'error', title: '密碼更新失敗' })
    }

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
                  type={showPass.showNow ? 'text ' : 'password'}
                  name="password"
                ></input>
                <div
                  className={styled.showPass}
                  onClick={() => {
                    setShowPass({ ...showPass, showNow: !showPass.showNow })
                  }}
                >
                  {showPass.showNow ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </div>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="newPass">輸入新密碼</label>
                <input
                  type={showPass.showNew ? 'text ' : 'password'}
                  name="newPass"
                ></input>
                <div
                  className={styled.showPass}
                  onClick={() => {
                    setShowPass({ ...showPass, showNew: !showPass.showNew })
                  }}
                >
                  {showPass.showNew ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </div>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="verPass">確認新密碼</label>
                <input type={showPass.showVer ? 'text ' : 'password'}></input>
                <div
                  className={styled.showPass}
                  onClick={() => {
                    setShowPass({ ...showPass, showVer: !showPass.showVer })
                  }}
                >
                  {showPass.showVer ? (
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
                    e.preventDefault()
                    updatePass()
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
