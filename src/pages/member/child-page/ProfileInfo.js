import { useState } from 'react'
import styled from '../../../styles/member-scss/MemberInfo.module.scss'
import TextareaAutosize from 'react-textarea-autosize'

export default function ProfileInfo() {
  const [isView, setIsView] = useState(false)

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <h3>分享地圖</h3>
            <div className={styled.divider}></div>
            <div className={styled.overview}>
              <div className={styled.postMap}>
                <h4>總計地點: 8</h4>
              </div>
              <div className={styled.totalHeight}>
                <h4>累積海拔: 3786 公尺</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <div className={styled.postTitle}>
              <h3>分享貼文: 17</h3>
            </div>
            <div className={styled.divider}></div>
            <div className={styled.postList}>
              {Array(17)
                .fill(1)
                .map((v, i) => {
                  return (
                    <div
                      className={styled.post}
                      key={i}
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
                  )
                })}
            </div>
          </div>
        </div>
      </div>
      {isView && (
        <div
          className={styled.modalBg}
          // z-index over nav bar?
          onClick={() => {
            setIsView(false)
          }}
        >
          <div
            className={styled.modal}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className={styled.editImg}>
              <img
                src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
                alt="postImg"
              ></img>
            </div>
            <div className={styled.editContent}>
              <div className={styled.contentTop}>
                <div className={styled.contentFlex}>
                  <div className={styled.avatar}>
                    <img
                      src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
                      alt="postImg"
                    ></img>
                  </div>
                  <h4>Kekeke123</h4>
                  <i className="fa-regular fa-heart"></i>
                </div>
                <TextareaAutosize
                  className={styled.contentTxt}
                  readOnly
                  value="喜愛登山與旅遊結合規劃，發掘台灣的歷史與美，熱愛攝影，探索台灣百岳，中級山，郊山的山野旅行者。GoHiking ! ! !"
                />
                <div className={styled.contentFlex}>
                  <p style={{ marginLeft: '72px' }}>2022-08-12</p>
                  <p>苗栗 南庄區</p>
                  <p>加里山 1211m</p>
                </div>
                <hr />
                <div className={styled.reply}>
                  {/* <div className={styled.contentFlex}>
                    <div className={styled.replyAvatar}>
                      <img
                        src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
                        alt="postImg"
                      ></img>
                    </div>
                    <div>
                      <h4>勞淑</h4>
                      <TextareaAutosize
                        readOnly
                        value="喜愛登山與旅遊結合規劃，發掘台灣的歷史與美，熱愛攝影，探索台灣百岳，中級山，郊山的山野旅行者。GoHiking ! ! !"
                      />
                    </div>
                    <i className="fa-regular fa-heart"></i>
                  </div> */}
                  {Array(10)
                    .fill(1)
                    .map((v, i) => {
                      return (
                        <div key={i} className={styled.replyPost}>
                          <div className={styled.contentFlex}>
                            <div className={styled.replyAvatar}>
                              <img
                                src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
                                alt="postImg"
                              ></img>
                            </div>
                            <div>
                              <h4>勞淑</h4>
                              <TextareaAutosize
                                readOnly
                                value="喜愛登山與旅遊結合規劃，發掘台灣的歷史與美!"
                              />
                            </div>
                            <i className="fa-regular fa-heart"></i>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
              <hr />
              <div className={styled.contentFlex}>
                <span>
                  <TextareaAutosize
                    className={styled.replyInput}
                    maxRows="1"
                    maxLength="120"
                    placeholder="留言...(30字以內)"
                  />
                </span>
                <button className={styled.replySend}>送出</button>
              </div>
            </div>
            <div className={`${styled.goTo} ${styled.prev}`}>
              <i className="fa-solid fa-chevron-left"></i>
            </div>
            <div className={`${styled.goTo} ${styled.next}`}>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
