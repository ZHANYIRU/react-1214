import { useEffect, useRef, useState } from 'react'
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

  const  { data } = useContext(MemberContext)

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

  useEffect(() => {

    if (mid === data.member_sid) {
      navigate('/member')
    }

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
