import styled from '../../../styles/member-scss/MemberInfo.module.scss'

export default function Thumbnail({
  setIsView,
  setIsEdit,
  postData,
  setCurrentPost,
  postIndex,
  setEditTxt,
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
        // src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
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
        <span
          className={styled.postEdit}
          onClick={(e) => {
            // console.log(1);
            e.stopPropagation()
            setCurrentPost(postIndex)
            setIsEdit(true)
            setEditTxt(postData.context)
          }}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
        {/* 輸入用 react-textarea-autosize 套件 */}
      </div>
    </div>
  )
}
