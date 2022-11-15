import { useState } from 'react'
import styled from '../../../styles/member-scss/MemberInfo.module.scss'

export default function MemberInfo() {
  const [isNew, SetIsNew] = useState(false)
  const [isEdit, SetIsEdit] = useState(false)

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
                      <span
                        className={styled.postEdit}
                        onClick={() => {
                          // console.log(1);
                          SetIsEdit(true)
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </span>
                      {/* 輸入用 react-textarea-autosize 套件 */}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
      {isEdit && (
        <div
          className={styled.modalBg}
          onClick={() => {
            SetIsEdit(false)
            // z-index over nav bar?
          }}
        >
          <div className={styled.modal}>
            <div
              className={styled.editImg}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <img
                src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
                alt="postImg"
              ></img>
            </div>
            <div
              className={styled.editContent}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <div className={styled.contentTop}>
                <h3>編輯貼文</h3>
                <textarea
                  maxLength="120"
                  defaultValue={'要編輯的內文'}
                ></textarea>
              </div>
              <div className={styled.contentBtm}>
                <div>
                  <p>海拔高度: 1211m</p>
                  <h3>
                    <span>苗栗</span>
                    <span>加里山</span>
                  </h3>
                </div>
                <div className={styled.delete}>
                  <h3>
                    <span>刪除</span>
                    <i className="fa-solid fa-trash-can"></i>
                  </h3>
                </div>
              </div>
            </div>
            <div className={styled.btnGrp}>
              <button
                className={styled.btnDone}
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <p>確認修改</p>
              </button>
              <button
                className={styled.btnCancel}
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <p>取消修改</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
