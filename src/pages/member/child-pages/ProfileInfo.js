import { useState } from 'react'
import styled from '../../../styles/member-scss/MemberInfo.module.scss'
// import TextareaAutosize from 'react-textarea-autosize'
import ModalView from '../components/ModalView'
import ThumbnailView from '../components/ThumbnailView'
import TotalHeight from '../components/TotalHeight'
import PostMap from '../components/PostMap'

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
              <PostMap />
              <TotalHeight />
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
