import { useContext, useEffect } from 'react'
import { useState } from 'react'
import styled from '../../../styles/member-scss/MemberEdit.module.scss'
import axios from 'axios'
import TextareaAutosize from 'react-textarea-autosize'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import { useRef } from 'react'
import MemberContext from '../../../contexts/MemberContext'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import log from 'eslint-plugin-react/lib/util/log'

//TODO 測試註冊資料格式驗證BUG (date)

export default function MemberEdit() {
  // const [profile, setProfile] = useState({
  //   avatar: '',
  //   name: '',
  //   nickname: '',
  //   mobile: '',
  //   email: '',
  //   birthday: '',
  //   address: '',
  //   intro: '',
  // })

  const { data, setData, getInfo, auth } = useContext(MemberContext)

  const navigate = useNavigate()

  const [preview, setPreview] = useState('')
  const [myBirth, setMyBirth] = useState('')

  const updateForm = useRef(null)

  // console.log('傳入member edit的生日為: '+ data.birthday)

  useEffect(() => {
    let dateBirth = data.birthday ? data.birthday : ''
    // console.log('生日為' + data.birthday)
    setMyBirth(dateBirth)
  }, [data])

  useEffect(() => {
    reset(data)
  }, [])

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({ shouldUnregister: false })

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [auth])

  useEffect(() => {
    // reset form with user data
    reset(data)
  }, [data])

  useEffect(() => {
    reset({ birthday: myBirth })
  }, [myBirth])

  // async function getInfo() {
  //   const result = await axios.get('http://localhost:3001/member/api?id=668')
  //   // console.log(result.data.rows[0].name)
  //   if (result.data.rows[0]) {
  //     setProfile(result.data.rows[0])
  //     let dateBirth = dayjs(data.birthday).format('YYYY-MM-DD')
  //     setMyBirth(dateBirth)
  //   }

  // console.log(result.data.rows[0])
  // }

  const updateInfo = async function () {
    const formData = new FormData(updateForm.current)
    const token = localStorage.getItem('token') || ''

    const result = await axios.put(
      'http://localhost:3001/member/api',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )
    if (result.data && result.data.success) {
      Swal.fire({
        icon: 'success',
        title: '更新資料成功',
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      })
      getInfo()
    }
    if (!result.data.success) {
      Swal.fire({
        icon: 'error',
        title: `更新資料失敗${result.data.error}`,
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      })
    }

    // console.log(result.data)
  }

  function showPreview(e) {
    if (e.target.files.length > 0) {
      setPreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <h3>編輯會員資料</h3>
            <div className={styled.divider}></div>
            <form
              ref={updateForm}
              encType="multipart/form-data"
              onSubmit={handleSubmit(updateInfo)}
            >
              <div className={styled.avatar}>
                {data.avatar || preview ? (
                  <img
                    src={
                      preview
                        ? preview
                        : `http://localhost:3001/uploads/${data.avatar}`
                    }
                    alt="avatar"
                  ></img>
                ) : (
                  ''
                )}
              </div>
              <label htmlFor="avatar" className={styled.avatarLabel}>
                {' '}
                上傳大頭貼
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  name="avatar"
                  id="avatar"
                  onChange={(e) => {
                    showPreview(e)
                  }}
                />
              </label>
              <input
                type="hidden"
                name="prevAvatar"
                defaultValue={data.avatar}
              />

              <p>(打*號為必填欄位)</p>
              <div className={styled.formRow}>
                <label className={styled.required}>姓名</label>
                <input
                  type="text"
                  // defaultValue={data.name}
                  {...register('name', {
                    value: data.name,
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
                  defaultValue={data.nickname}
                  {...register('nickname', { required: '*顯示名稱不得為空白' })}
                ></input>
                {errors.nickname && (
                  <p className={styled.errMsg}>{errors.nickname.message}</p>
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
                  defaultValue={data.mobile}
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
                  type="text"
                  {...register('email', {
                    required: '電子信箱不得為空白',
                    pattern: {
                      value:
                        /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
                      message: '*請輸入正確的電子信箱格式',
                    },
                  })}
                  defaultValue={data.email}
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
                  value={myBirth}
                  onChange={(e) => {
                    setMyBirth(e.target.value)
                  }}
                ></input>
                {errors.birthday && (
                  <p className={styled.errMsg}>'錯誤的生日日期'</p>
                )}
              </div>
              <div className={styled.formRow}>
                <label htmlFor="address" className={styled.forTxtArea}>
                  地址
                </label>
                <textarea
                  rows="4"
                  style={{ resize: 'none' }}
                  maxLength="120"
                  defaultValue={data.address}
                  name="address"
                ></textarea>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="address" className={styled.forTxtArea}>
                  個人簡介
                </label>
                <TextareaAutosize
                  placeholder="(最多120字)"
                  style={{ resize: 'none' }}
                  rows="4"
                  maxRows="8"
                  minRows="4"
                  maxLength="120"
                  defaultValue={data.intro}
                  name="intro"
                />
              </div>
              {/* bonus: 驗證碼API */}
              <button
              // onClick={(e) => {
              //   e.preventDefault()
              //   updateInfo()
              // }}
              >
                更新資料
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
