import styled from '../../../styles/member-scss/MemberInfo.module.scss'
import TextareaAutosize from 'react-textarea-autosize'
import dayjs from 'dayjs'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useContext, useEffect, useState, useRef } from 'react'
import MemberContext from '../../../contexts/MemberContext'
import { Link, useNavigate } from 'react-router-dom'
import { modalAvatarLevel } from '../components/Avatar'

export default function ModalView({
  getPostList,
  setIsView,
  showData,
  setCurrentPost,
  currentPost,
  listLength,
}) {
  // console.log(showData.member_sid)
  const navigate = useNavigate()

  const { data } = useContext(MemberContext)

  // const initPlaceholder = '留言...(30字以內)'
  const initPlaceholder = ''

  const [user, setUser] = useState({
    member_sid: 0,
    avatar: '',
    nickname: '',
    total_height: 0,
  })
  const [liked, setLiked] = useState(false)
  const [liking, setLiking] = useState(false)
  const [replies, setReplies] = useState([])
  const [replyTxt, setReplyTxt] = useState('')
  const [replyPlaceholder, setReplyPlaceholder] = useState('')
  const [replyPostId, setReplyPostId] = useState(0)
  const [isReplying, setIsReplying] = useState(false)
  const [target, setTarget] = useState(null)

  const replyForm = useRef(null)

  async function getInfo() {
    const rows = await axios.get(
      `http://localhost:3001/member/modal/api?mid=${showData.member_sid}`
    )
    // console.log(rows.data)
    setUser(rows.data[0])
  }

  async function getLike() {
    const mid = data.member_sid || ''

    const rows = await axios.get(
      `http://localhost:3001/member/like/api?mid=${mid}&pid=${showData.post_sid}`
    )
    // console.log(rows.data[0])
    if (rows.data[0]) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }

  async function addLike() {
    const token = localStorage.getItem('token') || ''

    if (!token) {
      return Swal.fire({ title: '請先登入會員', confirmButtonColor: '#216326' })
    }

    const result = await axios.post(
      `http://localhost:3001/member/like/api`,
      { mid: data.member_sid, pid: showData.post_sid },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )

    getPostList()
    setLiked(true)

    // console.log(result.data)
  }

  async function removeLike() {
    const token = localStorage.getItem('token') || ''

    if (!token) {
      return Swal.fire({ title: '請先登入會員', confirmButtonColor: '#216326' })
    }

    const result = await axios.delete(
      `http://localhost:3001/member/like/api?mid=${data.member_sid}&pid=${showData.post_sid}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )
    // console.log(result.data)
    getPostList()
    setLiked(false)
  }

  async function addReply() {
    const token = localStorage.getItem('token') || ''

    const formData = new FormData(replyForm.current)

    // console.log('是否有留言內容: ' + !!formData.get('context').trim());

    if (!token) {
      return Swal.fire({ title: '請先登入會員', confirmButtonColor: '#216326' })
    }

    if (!formData.get('context').trim()) {
      return Swal.fire({
        title: '請輸入留言內容',
        confirmButtonColor: '#216326',
      })
    }

    formData.set('context', `${replyPlaceholder}${formData.get('context')}`)

    formData.append('sid', replyPostId)

    const result = await axios.post(
      'http://localhost:3001/member/reply/api',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )
    if (result.data.success) {
      // alert('成功回覆')
      getReply()
      getPostList()
      setReplyTxt('')
      setReplyPlaceholder(initPlaceholder)
      setReplyPostId(0)
      setIsReplying(false)
      target.style.color = '#000'
    }

    // console.log(result.data)
  }

  async function getReply() {
    const rows = await axios.get(
      `http://localhost:3001/member/reply/api?pid=${showData.post_sid}`
    )

    setReplies(rows.data)
    // console.log(rows.data)
  }

  async function deleteReply(mid, sid, pid) {
    const token = localStorage.getItem('token') || ''

    // return alert(
    //   `要刪除的回覆sid為${sid}, 發表者mid為${mid}, 回覆的貼文pid為${pid}`
    // )

    if (!token) {
      return Swal.fire({ title: '請先登入會員', confirmButtonColor: '#216326' })
    }

    const result = await axios.delete(
      `http://localhost:3001/member/reply/api?sid=${sid}&pid=${pid}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )

    if (result.data.success) {
      // alert('成功回覆')
      getReply()
      getPostList()
      setReplyTxt('')
      // alert(
      //   `刪除成功: 要刪除的回覆sid為${sid}, 發表者mid為${mid}, 回覆的貼文pid為${pid}`
      // )
    }

    if (!result || !result.data || !result.data.success) {
      return Swal.fire({
        icon: 'error',
        title: '刪除留言失敗',
        confirmButtonColor: '#216326',
      })
    }
  }

  async function replyToReply(nickname, rid) {
    setReplyPlaceholder(`@${nickname}: `)
    setReplyPostId(rid)
  }

  // function avatarLevel(height = 0) {
  //   if (height > 3000) {
  //     return styled.silver
  //   }
  //   return styled.bronze
  // }

  useEffect(() => {
    getInfo()
    getLike()
    getReply()
  }, [currentPost])

  return (
    <>
      <div
        className={styled.modalBg}
        // z-index over nav bar?
        onClick={() => {
          setIsView(false)
          setCurrentPost(0)
          setReplyPostId(null)
          setReplyPlaceholder(initPlaceholder)
          // setLocationList(0)
        }}
      >
        <div
          className={styled.modal}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className={styled.editImg}>
            <img
              src={`http://localhost:3001/uploads/${showData.image_url}`}
              alt="postImg"
              loading="lazy"
            ></img>
          </div>
          <div className={styled.editContent}>
            <div className={styled.contentTop}>
              <div className={styled.contentFlex}>
                <div
                  className={`${styled.avatar} ${modalAvatarLevel(
                    user.total_height
                  )}`}
                  onClick={() => {
                    setIsView(false)
                    setCurrentPost(0)
                    navigate(
                      `${showData.member_sid}` === `${data.member_sid}`
                        ? `/member`
                        : `/profile?id=${showData.member_sid}`
                    )
                  }}
                >
                  <img
                    src={
                      user.avatar
                        ? `http://localhost:3001/uploads/avatar_${user.avatar}`
                        : '/img/default_avatar.png'
                    }
                    alt="postImg"
                    loading="lazy"
                  ></img>
                </div>
                <h4>{user.nickname}</h4>
                {liked ? (
                  <span
                    onClick={() => {
                      removeLike()
                      setLiking(false)
                    }}
                  >
                    {showData.likes}{' '}
                    <i
                      className={`fa-solid fa-heart ${styled.liked} ${
                        liking && styled.liking
                      }`}
                    ></i>
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      addLike()
                      setLiking(true)
                    }}
                  >
                    {showData.likes} <i className="fa-regular fa-heart"></i>
                  </span>
                )}
              </div>
              <TextareaAutosize
                maxRows="3"
                className={styled.contentTxt}
                readOnly
                value={showData.context}
                style={{ overflow: 'auto' }}
              />
              <div className={styled.contentFlex}>
                <p style={{ marginLeft: '72px' }}>
                  {dayjs(showData.created_at).format('YYYY-MM-DD')}
                </p>
                <p>{showData.name}</p>
                <p>
                  {showData.mountain_name} {showData.height}m
                </p>
              </div>
              <hr />
              <div className={styled.reply}>
                {replies.map((v, i) => {
                  return (
                    !v.parent_sid && (
                      <div key={`${v.sid}`} style={{ paddingBottom: '10px' }}>
                        <div className={styled.replyPost}>
                          <div
                            className={`${styled.contentFlex} ${styled.left}`}
                          >
                            <div
                              className={`${
                                styled.replyAvatar
                              } ${modalAvatarLevel(v.total_height)}`}
                              onClick={() => {
                                setIsView(false)
                                setCurrentPost(0)
                                navigate(
                                  `${v.member_sid}` === `${data.member_sid}`
                                    ? `/member`
                                    : `/profile?id=${v.member_sid}`
                                )
                              }}
                            >
                              <img
                                src={
                                  v.avatar
                                    ? `http://localhost:3001/uploads/avatar_${v.avatar}`
                                    : '/img/default_avatar.png'
                                }
                                alt="postImg"
                                loading="lazy"
                              ></img>
                            </div>

                            <div>
                              <h4
                                onClick={(e) => {
                                  if (!isReplying) {
                                    setIsReplying(true)
                                    replyToReply(v.nickname, v.sid)
                                    setTarget(e.target)
                                  }
                                  if (isReplying && target === e.target) {
                                    setReplyPlaceholder(initPlaceholder)
                                    setReplyPostId(0)
                                    setIsReplying(false)
                                  }
                                  if (isReplying && target !== e.target) {
                                    replyToReply(v.nickname, v.sid)
                                    setTarget(e.target)
                                  }
                                }}
                              >
                                {v.nickname}
                              </h4>
                              <TextareaAutosize
                                readOnly
                                value={v.context}
                                style={{ color: 'black' }}
                              />
                              <p className={styled.replyDate}>
                                {dayjs(v.datetime).format('YYYY-MM-DD')}
                                <br></br>
                                <span
                                  style={{ color: '#E00' }}
                                  onClick={(e) => {
                                    deleteReply(v.member_sid, v.sid, v.post_sid)
                                  }}
                                >
                                  {v.member_sid === data.member_sid
                                    ? '刪除'
                                    : ''}
                                </span>
                              </p>
                            </div>
                            {/* <i className="fa-regular fa-heart"></i> */}
                          </div>
                        </div>
                        {replies.map((el, index) => {
                          if (`${el.parent_sid}` === `${v.sid}`) {
                            return (
                              <div key={`${el.sid}`}>
                                <div
                                  className={styled.replyPost}
                                  style={{ marginLeft: '14px' }}
                                >
                                  <div
                                    className={`${styled.contentFlex} ${styled.left}`}
                                  >
                                    <span
                                      style={{
                                        transform:
                                          'scale(-1) rotate(-90deg) translateY(-20%) translateX(15%)',
                                      }}
                                      onClick={(e) => {
                                        if (!isReplying) {
                                          setIsReplying(true)
                                          replyToReply(el.nickname, v.sid)
                                          setTarget(e.target)
                                        }
                                        if (isReplying && target === e.target) {
                                          setReplyPlaceholder(initPlaceholder)
                                          setIsReplying(false)
                                        }
                                        if (isReplying && target !== e.target) {
                                          replyToReply(el.nickname, v.sid)
                                          setTarget(e.target)
                                        }
                                      }}
                                    >
                                      <i className="fa-solid fa-arrow-turn-up"></i>
                                    </span>
                                    <div
                                      className={`${
                                        styled.replyAvatar
                                      } ${modalAvatarLevel(el.total_height)}`}
                                      onClick={() => {
                                        setIsView(false)
                                        setCurrentPost(0)
                                        navigate(
                                          `${el.member_sid}` ===
                                            `${data.member_sid}`
                                            ? `/member`
                                            : `/profile?id=${el.member_sid}`
                                        )
                                      }}
                                    >
                                      <img
                                        src={
                                          el.avatar
                                            ? `http://localhost:3001/uploads/avatar_${el.avatar}`
                                            : '/img/default_avatar.png'
                                        }
                                        alt="postImg"
                                        loading="lazy"
                                      ></img>
                                    </div>

                                    <div>
                                      <h4
                                        onClick={(e) => {
                                          if (!isReplying) {
                                            setIsReplying(true)
                                            replyToReply(el.nickname, v.sid)
                                            setTarget(e.target)
                                          }
                                          if (
                                            isReplying &&
                                            target === e.target
                                          ) {
                                            setReplyPlaceholder(initPlaceholder)
                                            setIsReplying(false)
                                          }
                                          if (
                                            isReplying &&
                                            target !== e.target
                                          ) {
                                            replyToReply(el.nickname, v.sid)
                                            setTarget(e.target)
                                          }
                                        }}
                                      >
                                        {el.nickname}
                                      </h4>
                                      <pre>
                                        <span style={{ color: '#E50' }}>
                                          {el.context.indexOf('@') !== -1
                                            ? el.context.split(' ')[0]
                                            : el.context}
                                        </span>
                                        <span>{el.context.split(':')[1]}</span>
                                      </pre>
                                      <p className={styled.replyDate}>
                                        {dayjs(el.datetime).format(
                                          'YYYY-MM-DD'
                                        )}
                                        <br></br>
                                        <span
                                          style={{ color: '#E00' }}
                                          onClick={(e) => {
                                            deleteReply(
                                              el.member_sid,
                                              el.sid,
                                              el.post_sid
                                            )
                                          }}
                                        >
                                          {el.member_sid === data.member_sid
                                            ? '刪除'
                                            : ''}
                                        </span>
                                      </p>
                                    </div>
                                    {/* <i className="fa-regular fa-heart"></i> */}
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          return null
                        })}
                      </div>
                    )
                  )
                })}
              </div>
            </div>
            <hr />
            <div className={styled.contentFlex}>
              <form ref={replyForm}>
                <input
                  type="hidden"
                  value={data.member_sid}
                  name="member_sid"
                />
                <input
                  type="hidden"
                  value={showData.post_sid}
                  name="post_sid"
                />
                <span>
                  <input
                    className={styled.replyInput}
                    maxLength="30"
                    placeholder={`${replyPlaceholder} 留言...(30字以內)`}
                    value={replyTxt}
                    onChange={(e) => {
                      setReplyTxt(e.target.value)
                    }}
                    onKeyDown={(e) => {
                      console.log(e.key)
                      if (e.key === 'Backspace' && replyTxt === '') {
                        setReplyPlaceholder(initPlaceholder)
                        setReplyPostId(0)
                      }
                    }}
                    name="context"
                  />
                </span>
                <button
                  className={styled.replySend}
                  onClick={(e) => {
                    e.preventDefault()
                    addReply()
                  }}
                >
                  送出
                </button>
              </form>
            </div>
          </div>
          <div
            className={`${styled.goTo} ${styled.prev}`}
            onClick={() => {
              if (currentPost > 0) {
                setLiking(false)
                setCurrentPost(currentPost - 1)
                setReplyPostId(0)
                setReplyPlaceholder(initPlaceholder)
              }
            }}
            style={
              currentPost === 0 ? { display: 'none' } : { display: 'flex' }
            }
          >
            <i className="fa-solid fa-chevron-left"></i>
          </div>
          <div
            className={`${styled.goTo} ${styled.next}`}
            onClick={() => {
              if (currentPost < listLength - 1) {
                setLiking(false)
                setCurrentPost(currentPost + 1)
                setReplyPostId(0)
                setReplyPlaceholder(initPlaceholder)
              }
              // if(currentPost === listLength -1) {
              //   setCurrentPost(0)
              // }
            }}
            style={
              currentPost === listLength - 1
                ? { display: 'none' }
                : { display: 'flex' }
            }
          >
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      </div>
    </>
  )
}
