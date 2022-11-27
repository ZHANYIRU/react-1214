import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from '../../../styles/member-scss/MemberInfo.module.scss'
// import TextareaAutosize from 'react-textarea-autosize'
import ModalView from '../components/ModalView'
import ThumbnailView from '../components/ThumbnailView'
import TotalHeight from '../components/TotalHeight'
import PostMap from '../components/PostMap'
import axios from 'axios'
import MemberContext from '../../../contexts/MemberContext'
import { useContext } from 'react'

export default function ProfileInfo() {
  const location = useLocation()
  const usp = new URLSearchParams(location.search)
  const mid = usp.get('id')
  const navigate = useNavigate()

  let initInfo = {
    member_sid: mid,
    nickname: '',
    avatar: '',
    intro: '',
    total_height: 0,
  }

  const  { data } = useContext(MemberContext)

  const [info, setInfo] = useState(initInfo)
  const [isView, setIsView] = useState(false)
  const [postList, setPostList] = useState([])
  const [currentPost, setCurrentPost] = useState(0)

  async function getPostList() {
    const rows = await axios.get(
      `http://localhost:3001/member/post/api?mid=${mid}`
    )

    console.log(rows.data)
    setPostList(rows.data)
  }

  async function getInfo() {
    const result = await axios.get(
      `http://localhost:3001/member/profile/api?mid=${mid}`
    )

    // console.log(result.data)

    if (result.data.rows) {
      setInfo(result.data.rows[0])
    } else {
      navigate('/')
    }
  }

  useEffect(() => {

    if (mid === data.member_sid) {
      navigate('/member')
    }
    getInfo()
    getPostList()
  }, [mid])

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <h3>分享地圖</h3>
            <div className={styled.divider}></div>
            <div className={styled.overview}>
              <PostMap postList={postList}/>
              <TotalHeight totalHeight={{height: info.total_height}}/>
            </div>
          </div>
        </div>
      </div>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <div className={styled.postTitle}>
              <h3>分享貼文: {postList.length}</h3>
            </div>
            <div className={styled.divider}></div>
            <div className={styled.postList}>
              {postList.map((v, i) => {
                return (
                  <ThumbnailView
                    postIndex={i}
                    postData={v}
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
      {isView && (
        <ModalView
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
