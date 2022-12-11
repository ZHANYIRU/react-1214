import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from '../../../styles/member-scss/MemberInfo.module.scss'
// import TextareaAutosize from 'react-textarea-autosize'
import ModalView from '../components/ModalView'
import ThumbnailView from '../components/ThumbnailView'
import TotalHeight from '../components/TotalHeight'
import PostMap from '../components/PostMap'
import LeafletMap from '../components/LeafletMap'
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

  const { data } = useContext(MemberContext)

  const [info, setInfo] = useState(initInfo)
  const [isView, setIsView] = useState(false)
  const [postList, setPostList] = useState([])
  const [currentPost, setCurrentPost] = useState(0)
  const [uniqueLocations, setUniqueLocations] = useState([])
  const [showOverview, setShowOverview] = useState(true)

  async function getPostList() {
    const rows = await axios.get(
      `http://localhost:3001/member/post/api?mid=${mid}`
    )

    // console.log(rows.data)
    setPostList(rows.data)
  }

  async function getInfo() {
    const result = await axios.get(
      `http://localhost:3001/member/profile/api?mid=${mid}`
    )

    // console.log(result.data)

    if (result.data && result.data.rows[0]) {
      setInfo(result.data.rows[0])
    } else {
      navigate('/')
    }
  }

  useEffect(() => {
    setUniqueLocations([...new Set(postList.map((item) => item.mountain_sid))])
  }, [postList])

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
                  累積海拔: {info.total_height}公尺
                </h4>
                <PostMap postList={postList} getPostList={getPostList} />
                <TotalHeight
                  totalHeight={
                    info && info.total_height
                      ? { height: info.total_height }
                      : 0
                  }
                />
              </div>
            ) : (
              <LeafletMap
                postList={postList}
                getPostList={getPostList}
                totalHeight={
                  info && info.total_height ? { height: info.total_height } : 0
                }
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
          <h3 className={styled.altitude}>{info.total_height}m</h3>
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
