import style from '../../styles/home-scss/post.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import ModalView from '../member/components/ModalView'
import MemberContext from '../../contexts/MemberContext'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

function Post({ postData }) {
  const { data, auth } = useContext(MemberContext)

  const [isView, setIsView] = useState(false)
  const [tabFollow, setTabFollow] = useState(false)
  const [socialList, setSocialList] = useState([])
  const [currentPost, setCurrentPost] = useState(0)

  const navigate = useNavigate()

  async function getSocialList() {
    let fidQuery = ''
    if (data.member_sid && tabFollow) {
      fidQuery = `?fid=${data.member_sid}`
    }

    const rows = await axios.get(
      `http://localhost:3001/member/social/api${fidQuery}`
    )

    setSocialList(rows.data)
    // console.log('social wall data length:' + rows.data.length)
  }

  useEffect(() => {
    getSocialList()
  }, [tabFollow])
  function avatarLevel(height = 0) {
    if (height > 10000) {
      return style.gold
    }
    if (height > 3000) {
      return style.silver
    }
    return style.bronze
  }

  return (
    <>
      <h2 className={style.title}>山友分享</h2>
      <div className={style.wrap}>
        {postData.map((v, i) => {
          return (
            <div
              className={style.cardWrap}
              key={v.post_sid}
              onClick={() => {
                setIsView(true)
                setCurrentPost(i)
              }}
            >
              <div className={style.black}></div>
              <div className={style.imgWrap}>
                <img
                  src={`http://localhost:3001/uploads/${v.image_url}`}
                  alt=""
                />
              </div>
              <div className={style.icon}>
                <div className={style.location}>
                  <span>
                    <i className="fa-solid fa-map-location-dot"></i>
                  </span>
                  <span>{v.location_name}</span>
                </div>
                <div className={style.mountain}>
                  <span>
                    <i className="fa-solid fa-mountain"></i>
                  </span>
                  <span>{v.mountain_name}</span>
                  <span>{v.height}m</span>
                </div>
              </div>
              <div className={style.content}>{v.context}</div>
              <div className={style.bottom}>
                <div className={style.member}>
                  <div
                    className={`${style.memberImg} ${avatarLevel(
                      v.total_height
                    )}`}
                  >
                    {v.avatar ? (
                      <img
                        src={`http://localhost:3001/uploads/avatar_${v.avatar}`}
                        alt="avatar"
                      ></img>
                    ) : (
                      <img src="/img/default_avatar.png" alt="avatar" />
                    )}
                  </div>
                  <span>{v.nickname}</span>
                </div>
                <div className={style.postDate}>
                  {v.created_at.split('T', 10)[0]}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Link to="/social">
        <div className={style.more}>查看更多山友分享</div>
      </Link>
      {isView && (
        <ModalView
          isView={isView}
          setIsView={setIsView}
          showData={socialList[currentPost]}
          setCurrentPost={setCurrentPost}
          currentPost={currentPost}
          listLength={socialList.length}
          getPostList={getSocialList}
        />
      )}
    </>
  )
}

export default Post
