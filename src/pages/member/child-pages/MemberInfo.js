import { useContext, useState, useEffect, useRef } from 'react'
import styled from '../../../styles/member-scss/MemberInfo.module.scss'
import TextareaAutosize from 'react-textarea-autosize'
import ModalView from '../components/ModalView'
import Thumbnail from '../components/Thumbnail'
import TotalHeight from '../components/TotalHeight'
import PostMap from '../components/PostMap'
import LeafletMap from '../components/LeafletMap'
import MemberContext from '../../../contexts/MemberContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function MemberInfo() {
  const [isNew, setIsNew] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isView, setIsView] = useState(false)
  const [isDel, setIsDel] = useState(false)
  const [editTxt, setEditTxt] = useState('')
  const [preview, setPreview] = useState('')

  const navigate = useNavigate()

  const { data, auth, getInfo } = useContext(MemberContext)

  const [locations, setLocations] = useState([])
  const [selLocation, setSelLocation] = useState(1)
  const [mountains, setMountains] = useState([])
  const [selMountain, setSelMountain] = useState(1)
  const [selHeight, setSelHeight] = useState(0)
  const [postList, setPostList] = useState([])
  const [currentPost, setCurrentPost] = useState(0)
  const [uniqueLocations, setUniqueLocations] = useState([])
  const [showOverview, setShowOverview] = useState(true)

  const newForm = useRef(null)
  const editForm = useRef(null)

  //get post list
  async function getPostList() {
    const rows = await axios.get(
      `http://localhost:3001/member/post/api?mid=${data.member_sid}`
    )

    // console.log(rows.data)
    setPostList(rows.data)
  }

  //for new post options
  async function getLocation() {
    const result = await axios.get('http://localhost:3001/member/locations/api')

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

    const fileName = formData.get('image_url').name

    if (!fileName) {
      return Swal.fire({
        icon: 'error',
        title: '請先上傳圖片',
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      })
    }

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
    // console.log(result.data)
    Swal.fire({
      title: result.data.success ? '新增成功' : '新增失敗',
      confirmButtonColor: '#216326',
      scrollbarPadding: false,
    })
    setIsNew(false)
    getInfo()
    setPreview('')
  }

  //edit current post
  async function editPost() {
    const formData = new FormData(editForm.current)

    const token = localStorage.getItem('token') || ''

    const result = await axios.put(
      'http://localhost:3001/member/post/api',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )
    // console.log(result.data)
    Swal.fire({
      title: result.data.success ? '修改成功' : '修改失敗',
      confirmButtonColor: '#216326',
      scrollbarPadding: false,
    })
    setIsEdit(false)
    setIsDel(false)
    getPostList()
  }

  async function delPost() {
    const token = localStorage.getItem('token') || ''

    const result = await axios.delete(
      'http://localhost:3001/member/post/api?sid=' +
        postList[currentPost].post_sid +
        '&height=' +
        postList[currentPost].height +
        '&image_url=' +
        postList[currentPost].image_url,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )

    // console.log(result.data)
    Swal.fire({
      title: result.data.success ? '刪除成功' : '刪除失敗',
      confirmButtonColor: '#216326',
      scrollbarPadding: false,
    })
    if (result.data.success) {
      setIsEdit(false)
      getPostList()
      getInfo()
      setIsDel(false)
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
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
  }, [isNew, auth])

  useEffect(() => {
    setUniqueLocations([...new Set(postList.map((item) => item.mountain_sid))])
  }, [postList])


  //show preview
  function showPreview(e) {
    if (e.target.files.length > 0) {
      setPreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  // console.log(data.member_sid)

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={`${styled.card} ${styled.infoCard}`}>
            <div className={styled.postTitle}>
              <h3>分享地圖</h3>
              <button
                onClick={() => {
                  setShowOverview(!showOverview)
                }}
              >
                <span>地圖切換</span>
                <i className="fa-solid fa-map-location-dot"></i>
              </button>
            </div>
            <div className={styled.divider}></div>
            {showOverview ? (
              <div className={styled.overview}>
                <h4 className={styled.heightTag}>
                  累積海拔: {data.total_height}公尺
                </h4>
                <PostMap postList={postList} getPostList={getPostList} />
                <TotalHeight totalHeight={{ height: data.total_height }} />
              </div>
            ) : (
              <LeafletMap
                postList={postList}
                getPostList={getPostList}
                totalHeight={{ height: data.total_height }}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styled.summaryList}>
        <div className={styled.summary}>
          <p>分享貼文</p>
          <h3>{postList.length}</h3>
        </div>
        <div className={styled.summary}>
          <p>總計地點</p>
          <h3>{uniqueLocations.length}</h3>
        </div>
        <div className={styled.summary}>
          <p>累積海拔</p>
          <h3 className={styled.altitude}>{data.total_height}m</h3>
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
                    setEditTxt={setEditTxt}
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
          <form ref={editForm}>
            <div className={styled.modal}>
              <div className={styled.editImg}>
                <img
                  // src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
                  src={
                    'http://localhost:3001/uploads/' +
                    postList[currentPost].image_url
                  }
                  alt="postImg"
                  loading="lazy"
                ></img>
              </div>
              <div className={styled.editContent}>
                <input
                  type="hidden"
                  value={postList[currentPost].post_sid}
                  name="post_sid"
                />
                <div className={styled.contentTop}>
                  <h3>編輯貼文</h3>
                  <TextareaAutosize
                    maxLength="120"
                    maxRows="8"
                    placeholder="輸入敘述文字(最多120字)"
                    value={editTxt}
                    name="context"
                    onChange={(e) => {
                      setEditTxt(e.target.value)
                    }}
                  />
                </div>
                <div className={styled.contentBtm}>
                  <div>
                    <p>海拔高度: {postList[currentPost].height}m</p>
                    <h3>
                      <span>{postList[currentPost].name}</span>
                      <span>{postList[currentPost].mountain_name}</span>
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
                        <div
                          onClick={(e) => {
                            e.preventDefault()
                            delPost()
                          }}
                        >
                          <span>確認刪除?</span>
                          <i className="fa-solid fa-trash-can"></i>
                        </div>
                      ) : (
                        <div>
                          <span>刪除</span>
                          <i className="fa-solid fa-trash-can"></i>
                        </div>
                      )}
                    </h3>
                  </div>
                </div>
              </div>
              <div className={styled.btnGrp}>
                <button
                  className={styled.btnDone}
                  onClick={(e) => {
                    e.preventDefault()
                    editPost()
                  }}
                >
                  <p>確認修改</p>
                </button>
                <button
                  className={styled.btnCancel}
                  onClick={(e) => {
                    setIsEdit(false)
                    setIsDel(false)
                    e.preventDefault()
                  }}
                >
                  <p>取消修改</p>
                </button>
              </div>
            </div>
          </form>
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
                <div
                  className={styled.newImg}
                  style={{
                    backgroundImage: `url(${preview})`,
                    backgroundColor: preview ? '#000' : '#ddd',
                  }}
                >
                  <i
                    className="fa-regular fa-image"
                    style={{ color: preview ? '#fff' : '#666' }}
                  ></i>
                  <label htmlFor="image_url" className={styled.avatarLabel}>
                    上傳照片
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      name="image_url"
                      id="image_url"
                      onChange={(e) => {
                        showPreview(e)
                      }}
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
                    <input type="hidden" value={selHeight} name="height" />
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
                            <option key={i} value={v.sid}>
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
                    setSelLocation(1)
                  }}
                >
                  <p>發表貼文</p>
                </button>
                <button
                  className={styled.btnCancel}
                  onClick={(e) => {
                    e.preventDefault()
                    setIsNew(false)
                    setPreview('')
                    setSelLocation(1)
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
          isView={isView}
          setIsView={setIsView}
          showData={postList[currentPost]}
          setCurrentPost={setCurrentPost}
          currentPost={currentPost}
          listLength={postList.length}
          getPostList={getPostList}
        />
      )}
    </>
  )
}
