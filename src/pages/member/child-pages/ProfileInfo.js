import { useState } from 'react'
import styled from '../../../styles/member-scss/MemberInfo.module.scss'
import TextareaAutosize from 'react-textarea-autosize'
import ModalView from '../components/ModalView'
import ThumbnailView from '../components/ThumbnailView'

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
                  return <ThumbnailView setIsView={setIsView} key={i} />
                })}
            </div>
          </div>
        </div>
      </div>
      {isView && <ModalView setIsView={setIsView} />}
    </>
  )
}
