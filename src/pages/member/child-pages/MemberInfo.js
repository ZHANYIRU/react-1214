import { useContext, useState, useEffect, useRef } from 'react'
import styled from '../../../styles/member-scss/MemberInfo.module.scss'
import TextareaAutosize from 'react-textarea-autosize'
import ModalView from '../components/ModalView'
import Thumbnail from '../components/Thumbnail'
import TotalHeight from '../components/TotalHeight'
import PostMap from '../components/PostMap'
import MemberContext from '../../../contexts/MemberContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function MemberInfo() {
  const [isNew, setIsNew] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isView, setIsView] = useState(false)
  const [isDel, setIsDel] = useState(false)
  const [editTxt, setEditTxt] = useState('')

  const navigate = useNavigate()

  const { data, auth } = useContext(MemberContext)

  const [locations, setLocations] = useState([])
  const [selLocation, setSelLocation] = useState(1)
  const [mountains, setMountains] = useState([])
  const [selMountain, setSelMountain] = useState(1)
  const [selHeight, setSelHeight] = useState(0)
  const [postList, setPostList] = useState([])
  const [currentPost, setCurrentPost] = useState(0)

  const newForm = useRef(null)

  //get post list
  async function getPostList() {
    const postList = await axios.get(
      `http://localhost:3001/member/post/api?mid=${data.member_sid}`
    )

    console.log(postList.data)
    setPostList(postList.data)
  }

  //for new post options
  async function getLocation() {
    const result = await axios.get(
      'http://localhost:3001/member/locations/api?mid = '
    )

    // console.log(result.data.rows)
    setLocations(result.data.rows)
  }

  //for new post options
  async function getMountains() {
    const result = await axios.get(
      `http://localhost:3001/member/mountains/api?id=${selLocation}`
    )
    setMountains(result.data.rows)
  }

  //send new post
  async function newPost() {
    const formData = new FormData(newForm.current)

    const token = localStorage.getItem('token') || ''

    const result = await axios.post(
      'http://localhost:3001/member/post/api',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )
    console.log(result.data)
    setIsNew(false)
  }

  useEffect(() => {
    if (auth === false) {
      navigate('/login')
    }
  }, [auth])

  useEffect(() => {
    getLocation()
  }, [selLocation])

  useEffect(() => {
    getMountains()
    // console.log(mountains)
  }, [locations])

  useEffect(() => {
    if (mountains[0]) {
      setSelMountain(mountains[0].mountain_sid)
      setSelHeight(mountains[0].height)
    }
  }, [mountains])

  useEffect(() => {
    getPostList()
  }, [isNew])

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
              <h3>分享貼文: {postList.length}</h3>
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
              {postList.map((v, i) => {
                return (
                  <Thumbnail
                    postIndex={i}
                    postData={v}
                    setIsEdit={setIsEdit}
                    setIsView={setIsView}
                    setCurrentPost={setCurrentPost}
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
          <form ref={newForm}>
            <div className={styled.modal}>
              <div className={styled.editImg}>
                <div className={styled.newImg}>
                  <i className="fa-regular fa-image"></i>
                  <label htmlFor="avatar" className={styled.avatarLabel}>
                    上傳照片
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      name="image_url"
                      id="avatar"
                    />
                  </label>
                </div>
              </div>
              <div className={styled.editContent}>
                <div className={styled.contentTop}>
                  <h3>新貼文</h3>
                  <TextareaAutosize
                    name="context"
                    maxLength="120"
                    maxRows="8"
                    placeholder="輸入敘述文字(最多120字)"
                    onChange={(e) => {
                      setEditTxt(e.target.value)
                    }}
                  />
                </div>
                <input
                  type="hidden"
                  value={data.member_sid}
                  name="member_sid"
                />
                <div className={styled.contentBtm}>
                  <div>
                    <p>海拔高度: {selHeight}m</p>
                    <h3>
                      <select
                        value={selLocation}
                        onChange={(e) => {
                          setSelLocation(e.target.value)
                        }}
                      >
                        {/* <option>地區</option> */}
                        {locations.map((v, i) => {
                          return (
                            <option key={10 + i} value={v.sid}>
                              {v.name}
                            </option>
                          )
                        })}
                      </select>
                      <select
                        name="mountain_sid"
                        value={selMountain}
                        onChange={(e) => {
                          setSelMountain(e.target.value)
                          setSelHeight(
                            e.target[e.target.selectedIndex].getAttribute(
                              'data-mh'
                            )
                          )
                          // console.log("height:" + e.target[e.target.selectedIndex].getAttribute('data-mh'))
                        }}
                      >
                        {/* <option>山區</option> */}
                        {mountains.map((v, i) => {
                          return (
                            <option
                              key={i}
                              value={v.mountain_sid}
                              data-mh={v.height}
                            >
                              {v.mountain_name}
                            </option>
                          )
                        })}
                        {/* <option>志佳陽大山基點峰</option> */}
                      </select>
                    </h3>
                  </div>
                </div>
              </div>
              <div className={styled.btnGrp}>
                <button
                  className={styled.btnDone}
                  onClick={(e) => {
                    e.preventDefault()
                    newPost()
                  }}
                >
                  <p>發表貼文</p>
                </button>
                <button
                  className={styled.btnCancel}
                  onClick={(e) => {
                    e.preventDefault()
                    setIsNew(false)
                  }}
                >
                  <p>取消貼文</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {isView && (
        <ModalView
          setIsView={setIsView}
          showData={postList[currentPost]}
          setCurrentPost={setCurrentPost}
          currentPost={currentPost}
          listLength={postList.length}
        />
      )}
    </>
  )
}
