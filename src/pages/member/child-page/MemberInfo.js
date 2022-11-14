import styled from '../../../styles/member-scss/MemberInfo.module.scss'

export default function MemberInfo() {
  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <h3>分享地圖</h3>
          <div className={styled.overview}>
            <div className={styled.postMap}>
              <h4>總計地點: 8</h4>
            </div>
            <div className={styled.totalHeight}>
              <h4>累積海拔: 3786 公尺</h4>
            </div>
          </div>
          <div className={styled.postTitle}>
            <h3>分享貼文: 17</h3>
            <button>
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
                  <>
                    <div className={styled.post} key={i}>
                      <img
                        src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
                        alt="post"
                      ></img>
                      <div className={styled.postInfo}>
                        <p>
                          <span>
                            <i className="fa-solid fa-heart"></i>32
                          </span>
                          <span>
                            <i className="fa-solid fa-comment-dots"></i>9
                          </span>
                        </p>
                        <p>苗栗 加里山</p>
                        <p>海拔高度 1211m</p>
                        <span className={styled.postEdit}><i className="fa-solid fa-pen-to-square"></i></span>
                      </div>
                    </div>
                  </>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}
