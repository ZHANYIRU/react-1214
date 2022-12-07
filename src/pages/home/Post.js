import style from '../../styles/home-scss/post.module.scss'
import { Link } from 'react-router-dom'

function Post({ postData }) {
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
            <div className={style.cardWrap}>
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
                    <img
                      src={`http://localhost:3001/uploads/${v.avatar}`}
                      alt=""
                    />
                  </div>
                  <span>{v.name}</span>
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
    </>
  )
}

export default Post
