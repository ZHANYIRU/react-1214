import styled from '../../../styles/member-scss/MemberInfo.module.scss'
import TextareaAutosize from 'react-textarea-autosize'

export default function ModalView ({setIsView}) {
    return <>
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
                  <span>123 <i className="fa-regular fa-heart"></i></span>
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
                          <div className={`${styled.contentFlex} ${styled.left}`}>
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
                            {/* <i className="fa-regular fa-heart"></i> */}
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
    </>

}