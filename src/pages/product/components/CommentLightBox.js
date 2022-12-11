import React, { useContext, useEffect } from 'react'
import styled from '../../../styles/product-scss/CommentLightBox.module.scss'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import MemberContext from '../../../contexts/MemberContext'
export default function CommentLightBox({
  setComLightBox,
  whichCom,
  commentFetch,
}) {
  const memberData = useContext(MemberContext)
  const navigate = useNavigate()
  //頭像邊框
  function avatarLevel(height = 0) {
    if (height > 10000) {
      return styled.gold
    }
    if (height > 3000) {
      return styled.silver
    }
    return styled.bronze
  }
  function titleLevel(height = 0) {
    if (height > 10000) {
      return '金級玩家'
    }
    if (height > 3000) {
      return '銀級玩家'
    }
    return '銅級玩家'
  }

  useEffect(() => {
    if (setComLightBox) {
      document.body.style.overflow = 'hidden'
    }
  }, [setComLightBox])
  return (
    <div
      className={styled.comLightBox}
      onClick={() => {
        setComLightBox(false)
        document.body.style.overflow = 'visible'
      }}
    >
      <div className={styled.comView} onClick={(e) => e.stopPropagation()}>
        <div className={styled.leftArea}>
          <div className={styled.picAndNameWrap}>
            <div className={styled.ggWrap}>
              <div
                className={`${styled.imgBorder} ${avatarLevel(
                  commentFetch[whichCom].total_height
                )}`}
                onClick={() => {
                  navigate(
                    `${memberData.data.member_sid}` ===
                      `${commentFetch[whichCom].member_sid}`
                      ? `/member`
                      : `/profile?id=${commentFetch[whichCom].member_sid}`
                  )
                }}
              >
                <div className={styled.imgWrap}>
                  {commentFetch[whichCom] && commentFetch[whichCom].avatar ? (
                    <img
                      src={`http://localhost:3001/uploads/avatar_${commentFetch[whichCom].avatar}`}
                      alt="avatar"
                    ></img>
                  ) : (
                    <img src="/img/default_avatar.png" alt="avatar" />
                  )}
                </div>
              </div>
            </div>
            <div className={styled.Name}>
              <p>{commentFetch[whichCom].nickname}</p>
              <p>{titleLevel(commentFetch[whichCom].total_height)}</p>
            </div>
          </div>
          <div className={styled.howStar}>
            {[...Array(5)].map((star, index) => {
              const totalStars = commentFetch[whichCom].star
              index += 1
              return (
                <p
                  key={index}
                  className={
                    index <= totalStars ? `${styled.on}` : `${styled.off}`
                  }
                >
                  <span className="star">&#9733;</span>
                </p>
              )
            })}
          </div>
        </div>
        <div className={styled.rightArea}>
          <div className={styled.comDate}>
            評語日期：
            {dayjs(commentFetch[whichCom].messageTime).format('YYYY/MM/DD')}
          </div>
          <div className={styled.comText}>{commentFetch[whichCom].message}</div>
        </div>
      </div>
    </div>
  )
}
