import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '../../../styles/product-scss/ProductComment.module.scss'
export default function ProductComment({
  avgStar,
  commentFetch,
  memberData,
  setWhichCom,
  setComLightBox,
}) {
  const navigate = useNavigate()
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
  return (
    <div className={styled.comWrap}>
      <div className={styled.starBox}>
        {/* <StarRating />
         */}

        <p className={styled.write} onClick={() => {}}>
          {[...Array(5)].map((star, index) => {
            const tatalStar = Math.floor(avgStar)
            index += 1
            return (
              <p
                key={index}
                className={
                  index <= tatalStar ? `${styled.on}` : `${styled.off}`
                }
              >
                <span className="star">&#9733;</span>
              </p>
            )
          })}
        </p>
        <p>
          {avgStar} &nbsp; {avgStar ? '顆星' : '目前尚未有評價'}
        </p>
      </div>
      <div className={styled.commonArea}>
        {commentFetch.map((v, i) => {
          return (
            <div className={styled.commonBox}>
              <div className={styled.commonTitle}>
                <div
                  className={`${styled.commonTitle_img_border} ${avatarLevel(
                    v.total_height
                  )}`}
                  onClick={() => {
                    navigate(
                      `${memberData.data.member_sid}` === `${v.member_sid}`
                        ? `/member`
                        : `/profile?id=${v.member_sid}`
                    )
                  }}
                >
                  <div className={styled.commonTitle_img}>
                    {v && v.avatar ? (
                      <img
                        src={`http://localhost:3001/uploads/avatar_${v.avatar}`}
                        alt="avatar"
                      ></img>
                    ) : (
                      <img src="/img/default_avatar.png" alt="avatar" />
                    )}
                  </div>
                </div>

                <div className={styled.memberName}>
                  <p>{v.nickname}</p>
                  <p>{titleLevel(v.total_height)}</p>
                </div>
              </div>
              <div className={styled.commonText}>{v.message}</div>
              <div className={styled.howStar}>
                {[...Array(5)].map((star2, index) => {
                  const totalStars = v.star
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
              <div
                className={styled.readMore}
                onClick={() => {
                  setWhichCom(i)
                  setComLightBox(true)
                }}
              >
                閱讀更多
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
