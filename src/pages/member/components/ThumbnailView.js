import styled from '../../../styles/member-scss/MemberInfo.module.scss'

export default function ThumbnailView({ setIsView, setIsEdit }) {
  return <div
    className={styled.post}
    onClick={() => {
      setIsView(true)
    }}
  >
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
      {/* 輸入用 react-textarea-autosize 套件 */}
    </div>
  </div>
}
