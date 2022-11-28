import styled from '../../styles/member-scss/MemberInfo.module.scss'
import styles from '../../styles/member-scss/SocialWall.module.scss'
import ThumbnailView from './components/ThumbnailView'
import { useContext, useEffect, useState } from 'react'
import ModalView from './components/ModalView'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MemberContext from '../../contexts/MemberContext'

export default function SocialWall() {
  const { data, auth } = useContext(MemberContext)

  const [isView, setIsView] = useState(false)
  const [tabFollow, setTabFollow] = useState(false)
  const [socialList, setSocialList] = useState([])
  const [currentPost, setCurrentPost] = useState(0)

  const navigate = useNavigate()

  async function getSocialList() {
    let fidQuery = ''
    if (data.member_sid && tabFollow) {
      fidQuery = `?fid=${data.member_sid}`
    }

    const rows = await axios.get(
      `http://localhost:3001/member/social/api${fidQuery}`
    )

    setSocialList(rows.data)
    console.log('social wall data length:' + rows.data.length)
  }

  useEffect(() => {
    getSocialList()
  }, [tabFollow])

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
                <h3>最新分享</h3>
              </div>
              <div
                className={
                  tabFollow ? `${styles.tab} ${styles.active}` : `${styles.tab}`
                }
                onClick={() => {
                  if(!data.member_sid){
                    return alert('請先登入會員')
                  }
                  setTabFollow(true)
                }}
              >
                <h3>關注中</h3>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styled.postList}>
                {socialList.map((v, i) => {
                  return (
                    <ThumbnailView
                      setIsView={setIsView}
                      key={i}
                      postData={v}
                      postIndex={i}
                      setCurrentPost={setCurrentPost}
                    />
                  )
                })}
              </div>
            </div>
            <div className={styles.tags}>
              <div
                className={`${styles.tag} ${styles.sel}`}
                onClick={() => {
                  if(!auth) {
                    return alert ('請先登入會員')
                  }
                  navigate('/member')
                }}
              >
                我的分享
                <div className={styles.shade}></div>
              </div>
              <div className={styles.tag}>
                英雄榜<div className={styles.shade}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isView && (
        <ModalView
          setIsView={setIsView}
          showData={socialList[currentPost]}
          setCurrentPost={setCurrentPost}
          currentPost={currentPost}
          listLength={socialList.length}
          getPostList={getSocialList}
        />
      )}
    </>
  )
}
