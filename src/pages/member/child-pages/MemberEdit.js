import { useEffect } from 'react'
import { useState } from 'react'
import styled from '../../../styles/member-scss/MemberEdit.module.scss'
import axios from 'axios'
import TextareaAutosize from 'react-textarea-autosize'
import dayjs from 'dayjs'
import { useRef } from 'react'

export default function MemberEdit() {
  const [profile, setProfile] = useState({
    avatar: '',
    name: '',
    nickname: '',
    mobile: '',
    email: '',
    birthday: '',
    address: '',
    intro: '',
  })

  const [preview, setPreview] = useState('')

  const updateForm = useRef(null)

  const [myBirth, setMyBirth] = useState('')

  async function getInfo() {
    const result = await axios.get('http://localhost:3001/member/api?id=666')
    // console.log(result.data.rows[0].name)
    if (result.data.rows[0]) {
      setProfile(result.data.rows[0])
      let dateBirth = dayjs(result.data.rows[0].birthday).format('YYYY-MM-DD')
      setMyBirth(dateBirth)
    }

    // console.log(result.data.rows[0])
  }

  async function updateInfo() {
    const formData = new FormData(updateForm.current)

    const result = await axios.put(
      'http://localhost:3001/member/api?id=666',
      formData
    )

    console.log(result.data)
  }

  function showPreview(e) {
    if (e.target.files.length > 0) {
      setPreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  useEffect(() => {
    getInfo()
  }, [])

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <h3>編輯會員資料</h3>
            <div className={styled.divider}></div>
            <form ref={updateForm} encType="multipart/form-data">
              <div className={styled.avatar}>
                {profile.avatar ? (
                  <img
                    src={
                      preview
                        ? preview
                        : `http://localhost:3001/uploads/${profile.avatar}`
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
                defaultValue={profile.avatar}
              />

              <p>(打*號為必填欄位)</p>
              <div className={styled.formRow}>
                <label className={styled.required}>姓名</label>
                <input
                  type="text"
                  defaultValue={profile.name}
                  name="name"
                ></input>
              </div>
              <div className={styled.formRow}>
                <label className={styled.required}>顯示名稱</label>
                <input
                  type="text"
                  defaultValue={profile.nickname}
                  name="nickname"
                ></input>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="mobile">手機號碼</label>
                <input
                  type="text"
                  name="mobile"
                  defaultValue={profile.mobile}
                ></input>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="email" className={styled.required}>
                  電子信箱
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={profile.email}
                ></input>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="birthday">生日</label>
                <input type="date" name="birthday" value={myBirth} onChange={(e)=>{
                  setMyBirth(e.target.value)
                }}></input>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="address" className={styled.forTxtArea}>
                  地址
                </label>
                <textarea
                  rows="4"
                  style={{ resize: 'none' }}
                  maxLength="120"
                  defaultValue={profile.address}
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
                  maxLength="120"
                  defaultValue={profile.intro}
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
