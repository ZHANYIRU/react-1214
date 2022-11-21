import { useContext, useState, useEffect } from 'react'
import styled from '../../../styles/member-scss/MemberInfo.module.scss'
import TextareaAutosize from 'react-textarea-autosize'
import ModalView from '../components/ModalView'
import Thumbnail from '../components/Thumbnail'
import TotalHeight from '../components/TotalHeight'
import PostMap from '../components/PostMap'
import MemberContext from '../../../contexts/MemberContext'
import { useNavigate } from 'react-router-dom'

export default function MemberInfo() {
  const [isNew, setIsNew] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isView, setIsView] = useState(false)
  const [isDel, setIsDel] = useState(false)
  const [editTxt, setEditTxt] = useState('')

  const navigate = useNavigate()

  const { data, auth } = useContext(MemberContext)

  useEffect(() => {
    if (auth === false) {
      navigate('/login')
    }
  }, [auth])

  // console.log(data.member_sid)

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <h3>分享地圖</h3>
            <div className={styled.divider}></div>
            <div className={styled.overview}>
              <PostMap />
              <TotalHeight />
            </div>
          </div>
        </div>
      </div>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <div className={styled.postTitle}>
              <h3>分享貼文: 17</h3>
              <button
                onClick={() => {
                  setIsNew(true)
                }}
              >
                <span>新增貼文</span>
                <i className="fa-solid fa-circle-plus"></i>
              </button>
            </div>
            <div className={styled.divider}></div>
            <div className={styled.postList}>
              {Array(17)
                .fill(1)
                .map((v, i) => {
                  return (
                    <Thumbnail
                      setIsEdit={setIsEdit}
                      setIsView={setIsView}
                      key={i}
                    />
                  )
                })}
            </div>
          </div>
        </div>
      </div>
      {isEdit && (
        <div
          className={styled.modalBg}
          // z-index over nav bar?
        >
          <div className={styled.modal}>
            <div className={styled.editImg}>
              <img
                src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
                alt="postImg"
              ></img>
            </div>
            <div className={styled.editContent}>
              <div className={styled.contentTop}>
                <h3>編輯貼文</h3>
                <TextareaAutosize
                  maxLength="120"
                  maxRows="8"
                  placeholder="輸入敘述文字(最多120字)"
                  onChange={(e) => {
                    setEditTxt(e.target.value)
                  }}
                />
              </div>
              <div className={styled.contentBtm}>
                <div>
                  <p>海拔高度: 1211m</p>
                  <h3>
                    <span>苗栗</span>
                    <span>加里山</span>
                  </h3>
                </div>
                <div className={styled.delete}>
                  <h3
                    onClick={() => {
                      setIsDel(true)
                    }}
                  >
                    {' '}
                    {isDel ? (
                      <>
                        <span>確認刪除?</span>
                        <i className="fa-solid fa-trash-can"></i>
                      </>
                    ) : (
                      <>
                        <span>刪除</span>
                        <i className="fa-solid fa-trash-can"></i>
                      </>
                    )}
                  </h3>
                </div>
              </div>
            </div>
            <div className={styled.btnGrp}>
              <button className={styled.btnDone}>
                <p>確認修改</p>
              </button>
              <button
                className={styled.btnCancel}
                onClick={() => {
                  setIsEdit(false)
                  setIsDel(false)
                }}
              >
                <p>取消修改</p>
              </button>
            </div>
          </div>
        </div>
      )}
      {isNew && (
        <div
          className={styled.modalBg}
          // z-index over nav bar?
        >
          <div className={styled.modal}>
            <div className={styled.editImg}>
              <div className={styled.newImg}>
                <i className="fa-regular fa-image"></i>
                <label htmlFor="avatar" className={styled.avatarLabel}>
                  {' '}
                  上傳大頭貼
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    name="avatar"
                    id="avatar"
                  />
                </label>
              </div>
            </div>
            <div className={styled.editContent}>
              <div className={styled.contentTop}>
                <h3>新貼文</h3>
                <TextareaAutosize
                  maxLength="120"
                  maxRows="8"
                  placeholder="輸入敘述文字(最多120字)"
                  onChange={(e) => {
                    setEditTxt(e.target.value)
                  }}
                />
              </div>
              <div className={styled.contentBtm}>
                <div>
                  <p>海拔高度: 1211m</p>
                  <h3>
                    <select>
                      <option>地區</option>
                      <option>苗栗</option>
                    </select>
                    <select>
                      <option>山區</option>
                      <option>志佳陽大山基點峰</option>
                    </select>
                  </h3>
                </div>
              </div>
            </div>
            <div className={styled.btnGrp}>
              <button className={styled.btnDone}>
                <p>發表貼文</p>
              </button>
              <button
                className={styled.btnCancel}
                onClick={() => {
                  setIsNew(false)
                }}
              >
                <p>取消貼文</p>
              </button>
            </div>
          </div>
        </div>
      )}
      {isView && <ModalView setIsView={setIsView} />}
    </>
  )
}
