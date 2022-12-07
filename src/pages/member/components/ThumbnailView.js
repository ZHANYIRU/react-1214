import styled from '../../../styles/member-scss/MemberInfo.module.scss'

export default function ThumbnailView({
  setIsView,
  postIndex,
  postData,
  setCurrentPost,
}) {
  return (
    <div
      className={styled.post}
      onClick={() => {
        setIsView(true)
        setCurrentPost(postIndex)
      }}
    >
      <img
        src={`http://localhost:3001/uploads/thumb_${postData.image_url}`}
        alt="post"
        loading="lazy"
      ></img>
      <div className={styled.postInfo}>
        <p>
          <span>
            <i className="fa-solid fa-heart"></i>
            {postData.likes}
          </span>
          <span>
            <i className="fa-solid fa-comment-dots"></i>
            {postData.comments}
          </span>
        </p>
        <p>
          {postData.name} {postData.mountain_name}
        </p>
        <p>海拔高度 {postData.height}m</p>
        {/* 輸入用 react-textarea-autosize 套件 */}
      </div>
    </div>
  )
}
