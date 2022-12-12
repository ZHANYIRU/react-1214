import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '../../styles/member-scss/Login.module.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRef } from 'react'
import { useContext } from 'react'
import MemberContext from '../../contexts/MemberContext'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function ResetPass() {
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()
  const resetForm = useRef(null)
  const { setAuth, resetData, auth, getInfo } = useContext(MemberContext)

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm()

  const updateNewPass = async function () {
    const formData = new FormData(resetForm.current)
    const usp = new URLSearchParams(window.location.search)

    const token = usp.get('token')
    const mid = usp.get('mid')

    // return alert(
    //   `token: ${token} | mid: ${mid} | new password: ${formData.get('newPass')}`
    // )

    const result = await axios.post(
      `http://localhost:3001/member//resetPass/api?token=${token}&mid=${mid}`,
      formData
    )
    if (
      result.data &&
      result.data.message === '密碼重置成功' &&
      result.data.token
    ) {
      localStorage.setItem('token', result.data.token)
      getInfo()

      Swal.fire({
        icon: 'success',
        title: result.data.message,
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: result.data.message,
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      })
    }
  }

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <h3>重設密碼</h3>
            <div className={styled.divider}></div>
            <form ref={resetForm} onSubmit={handleSubmit(updateNewPass)}>
              <div className={styled.formRow}>
                <label htmlFor="newPass">新密碼</label>
                <input
                  type={showPass.showNew ? 'text ' : 'password'}
                  {...register('newPass', {
                    required: '*新密碼不得為空白',
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                      message: '*請輸入6-20字元大小寫英文字母和數字',
                    },
                    validate: (value) =>
                      value !== getValues('password') ||
                      '*新密碼不得與舊密碼相同',
                  })}
                  placeholder="6-20字元, 包含大小寫英文字母和數字"
                ></input>
                {errors.newPass && (
                  <p className={styled.errMsg}>{errors.newPass.message}</p>
                )}
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
                <label htmlFor="verPass">確認密碼</label>
                <input
                  type={showPass.showVer ? 'text ' : 'password'}
                  {...register('verPass', {
                    validate: (value) => value === getValues('newPass'),
                  })}
                ></input>
                {errors.verPass && (
                  <p className={styled.errMsg}>*請再次輸入新密碼</p>
                )}
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
              <div className={styled.btnGroup}>
                <button type="submit">更新密碼</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
