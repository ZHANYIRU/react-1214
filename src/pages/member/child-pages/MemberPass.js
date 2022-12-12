import axios from 'axios'
import { useContext, useRef, useState, useEffect } from 'react'
import styled from '../../../styles/member-scss/MemberPass.module.scss'
import MemberContext from '../../../contexts/MemberContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
// import { ErrorMessage } from '@hookform/error-message'

export default function MemberPass() {
  const [showPass, setShowPass] = useState({
    showNow: false,
    showNew: false,
    showVer: false,
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm()

  const navigate = useNavigate()

  const { data, auth } = useContext(MemberContext)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [auth])

  // console.log(data.member_sid)

  const passForm = useRef(null)

  const updatePass = async function () {
    // e.preventDefault()

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
      Swal.fire({
        icon: 'success',
        title: '密碼更新成功',
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      }).then((result) => {
        navigate('/member')
      })
    }
    if (!result.data.success) {
      // alert('密碼更新失敗')
      Swal.fire({
        icon: 'error',
        title: '密碼更新失敗',
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      })
    }

    // console.log(result.data)
  }

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <h3>修改密碼</h3>
            <div className={styled.divider}></div>
            <form ref={passForm} onSubmit={handleSubmit(updatePass)}>
              <div className={styled.formRow}>
                <label htmlFor="password">目前的密碼</label>
                <input
                  type={showPass.showNow ? 'text ' : 'password'}
                  placeholder="請輸入目前的密碼"
                  // name="password"
                  {...register('password', {
                    required: '*請輸入目前的密碼',
                  })}
                ></input>
                {errors.password && (
                  <p className={styled.errMsg}>{errors.password.message}</p>
                )}
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
                <label htmlFor="verPass">確認新密碼</label>
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
              {/* bonus 驗證API */}
              <div className={styled.btnGroup}>
                <button
                  type="submit"
                  // onClick={(e) => {
                  //   updatePass(e)
                  // }}
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
