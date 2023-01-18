import { useRef } from 'react'
import { useState, useEffect, useContext } from 'react'
import styled from '../../styles/member-scss/Join.module.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import TextareaAutosize from 'react-textarea-autosize'
import MemberContext from '../../contexts/MemberContext'
import { useForm } from 'react-hook-form'

//TODO 測試註冊資料格式驗證BUG (date)

export default function Join(props) {
  const [showPass, setShowPass] = useState({
    myPass: false,
    verPass: false,
  })

  const { auth, setAuth, getInfo } = useContext(MemberContext)

  useEffect(() => {
    if (auth) {
      navigate('/member')
    }
  }, [auth])

  const navigate = useNavigate()

  // const [showSuccess, setShowSuccess] = useState(false)

  const joinForm = useRef(null)

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({ shouldUnregister: false })

  async function submitForm() {
    // e.preventDefault()

    const formData = new FormData(joinForm.current)

    let result = await axios.post(
      'http://localhost:3001/member/join/api',
      formData
    )

    if (result.data.success) {
      localStorage.setItem('token', `${result.data.token}`)
      Swal.fire({ title: '註冊成功', confirmButtonColor: '#216326', scrollbarPadding: false, }).then(
        function (isComfirm) {
          if (isComfirm) {
            getInfo()
            navigate('/member')
          }
        }
      )
      // setShowSuccess(true)
    }
    if (!result.data.success) {
      Swal.fire({
        icon: 'error',
        title: `註冊失敗${result.data.error}`,
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      })
    }

    // console.log(result.data)
  }

  function autofill() {
    // console.log('autofill')

    reset({
      name: '小墨',
      nickname: 'MOMO',
      password: 'Hiking1214',
      verPass: 'Hiking1214',
      email: 'momo@hiking.com',
    })

    joinForm.current.intro.value =
      '熱愛大自然, 喜歡登山, 希望在這邊認識更多的同好\n\nGo Hiking!!'
  }

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <h3
              onClick={() => {
                autofill()
              }}
            >
              會員註冊
            </h3>
            <div className={styled.divider}></div>
            <form
              ref={joinForm}
              encType="multipart/form-data"
              onSubmit={handleSubmit(submitForm)}
            >
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
                <input
                  type="text"
                  {...register('name', {
                    required: '*姓名不得為空白',
                  })}
                ></input>
                {errors.name && (
                  <p className={styled.errMsg}>{errors.name.message}</p>
                )}
              </div>
              <div className={styled.formRow}>
                <label className={styled.required}>顯示名稱</label>
                <input
                  type="text"
                  {...register('nickname', { required: '*顯示名稱不得為空白' })}
                ></input>
                {errors.nickname && (
                  <p className={styled.errMsg}>{errors.nickname.message}</p>
                )}
              </div>
              <div className={styled.formRow}>
                <label htmlFor="password" className={styled.required}>
                  密碼
                </label>
                <input
                  type={showPass.myPass ? 'text ' : 'password'}
                  {...register('password', {
                    required: '*密碼不得為空白',
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                      message: '*請輸入6-20字元大小寫英文字母和數字',
                    },
                  })}
                  placeholder="6-20字元, 包含大小寫英文字母和數字"
                ></input>
                {errors.password && (
                  <p className={styled.errMsg}>{errors.password.message}</p>
                )}
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
                {errors.password && (
                  <p className={styled.errMsg}>{errors.password.message}</p>
                )}
              </div>
              <div className={styled.formRow}>
                <label className={styled.required}>確認密碼 </label>
                <input
                  type={showPass.verPass ? 'text ' : 'password'}
                  {...register('verPass', {
                    validate: (value) => value === getValues('password'),
                  })}
                ></input>
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
                {errors.verPass && (
                  <p className={styled.errMsg}>*請再次輸入新密碼</p>
                )}
              </div>
              <div className={styled.formRow}>
                <label htmlFor="mobile">手機號碼</label>
                <input
                  type="text"
                  {...register('mobile', {
                    pattern: {
                      value: /^09\d{2}-?\d{3}-?\d{3}$/,
                      message: '*請輸入正確的手機號碼格式',
                    },
                  })}
                ></input>
                {errors.mobile && (
                  <p className={styled.errMsg}>{errors.mobile.message}</p>
                )}
              </div>
              <div className={styled.formRow}>
                <label htmlFor="email" className={styled.required}>
                  電子信箱
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: '電子信箱不得為空白',
                    pattern: {
                      value:
                        /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
                      message: '*請輸入正確的電子信箱格式',
                    },
                  })}
                ></input>
                {errors.email && (
                  <p className={styled.errMsg}>{errors.email.message}</p>
                )}
              </div>
              <div className={styled.formRow}>
                <label htmlFor="birthday">生日</label>
                <input
                  type="date"
                  {...register('birthday', {
                    valueAsDate: true,
                    max: Date.now(),
                  })}
                ></input>
                {errors.birthday && (
                  <p className={styled.errMsg}>錯誤的生日日期</p>
                )}
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
              <button onClick={handleSubmit}>註冊會員</button>
            </form>
          </div>
        </div>
      </div>
      {/* {showSuccess && (
        <div className={styled.alertBg}>
          <div className={styled.alert}>
            <h3>註冊成功！</h3>
            <button
              onClick={() => {
                navigate('/')
                setAuth(true)
                setShowSuccess(false)
              }}
            >
              前往首頁
            </button>
          </div>
        </div>
      )} */}
    </>
  )
}
