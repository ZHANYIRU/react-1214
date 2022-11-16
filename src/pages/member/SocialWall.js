import styled from '../../styles/member-scss/MemberInfo.module.scss'
import styles from '../../styles/member-scss/SocialWall.module.scss'
import ThumbnailView from './components/ThumbnailView'
import { useState } from 'react'
import ModalView from './components/ModalView'

export default function SocialWall() {
  const [isView, setIsView] = useState(false)
  const [tabFollow, setTabFollow] = useState(false)

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <h2>山友分享牆</h2>
          <div className={styles.card}>
            <div className={styles.tabs}>
              <div
                className={
                  tabFollow ? `${styles.tab}` : `${styles.tab} ${styles.active}`
                }
                onClick={() => {
                  setTabFollow(false)
                }}
              >
                <h3>全站山友</h3>
              </div>
              <div
                className={
                  tabFollow ? `${styles.tab} ${styles.active}` : `${styles.tab}`
                }
                onClick={() => {
                  setTabFollow(true)
                }}
              >
                <h3>關注中</h3>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styled.postList}>
                {Array(18)
                  .fill(1)
                  .map((v, i) => {
                    return <ThumbnailView setIsView={setIsView} key={i} />
                  })}
              </div>
            </div>
            <div className={styles.tags}>
              <div className={styles.tag}>我的分享</div>
              <div className={styles.tag}>英雄榜</div>
            </div>
          </div>
        </div>
      </div>
      {isView && <ModalView setIsView={setIsView} />}
    </>
  )
}
