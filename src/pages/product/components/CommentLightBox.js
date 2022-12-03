import React from 'react'
import styled from '../../../styles/product-scss/CommentLightBox.module.scss'

export default function CommentLightBox({
  setComLightBox,
  whichCom,
  comFakeData,
}) {
  return (
    <div
      className={styled.comLightBox}
      onClick={() => {
        setComLightBox(false)
      }}
    >
      <div className={styled.comView} onClick={(e) => e.stopPropagation()}>
        <div className={styled.leftArea}>
          <div className={styled.picAndNameWrap}>
            <div className={styled.imgBorder}>
              <div className={styled.imgWrap}>
                <img
                  src="https://cdn2.ettoday.net/images/2253/2253152.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className={styled.Name}>{comFakeData[whichCom].name}</div>
          </div>
          <div className={styled.howStar}>{comFakeData[whichCom].star}顆星</div>
        </div>
        <div className={styled.rightArea}>
          <div className={styled.comDate}>
            評語日期：{comFakeData[whichCom].creatDate}
          </div>
          <div className={styled.comText}>{comFakeData[whichCom].text}</div>
        </div>
      </div>
    </div>
  )
}
