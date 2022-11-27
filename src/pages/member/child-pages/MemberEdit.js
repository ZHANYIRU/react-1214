import { useContext, useEffect } from 'react'
import { useState } from 'react'
import styled from '../../../styles/member-scss/MemberEdit.module.scss'
import axios from 'axios'
import TextareaAutosize from 'react-textarea-autosize'
import dayjs from 'dayjs'
import { useRef } from 'react'
import MemberContext from '../../../contexts/MemberContext'
import { useNavigate } from 'react-router-dom'

//TODO 資料格式驗證

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

  const navigate = useNavigate()

  const { data, setData, getInfo, auth } = useContext(MemberContext)

  // console.log(data)

  const [preview, setPreview] = useState('')
  const [myBirth, setMyBirth] = useState('')

  useEffect(() => {
    let dateBirth = data.birthday
      ? dayjs(data.birthday).format('YYYY-MM-DD')
      : ''
    setMyBirth(dateBirth)
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [auth])

  const updateForm = useRef(null)

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

  async function updateInfo() {
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
      alert('更新資料成功')
      getInfo()
    }
    if (!result.data.success) {
      alert('更新資料失敗')
    }

    console.log(result.data)
  }

  function showPreview(e) {
    if (e.target.files.length > 0) {
      setPreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  // useEffect(() => {
  //   getInfo()
  // }, [])

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <h3>編輯會員資料</h3>
            <div className={styled.divider}></div>
            <form ref={updateForm} encType="multipart/form-data">
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
                <input type="text" defaultValue={data.name} name="name"></input>
              </div>
              <div className={styled.formRow}>
                <label className={styled.required}>顯示名稱</label>
                <input
                  type="text"
                  defaultValue={data.nickname}
                  name="nickname"
                ></input>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="mobile">手機號碼</label>
                <input
                  type="text"
                  name="mobile"
                  defaultValue={data.mobile}
                ></input>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="email" className={styled.required}>
                  電子信箱
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={data.email}
                ></input>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="birthday">生日</label>
                <input
                  type="date"
                  name="birthday"
                  value={myBirth}
                  onChange={(e) => {
                    setMyBirth(e.target.value)
                  }}
                ></input>
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
                onClick={(e) => {
                  e.preventDefault()
                  updateInfo()
                }}
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
