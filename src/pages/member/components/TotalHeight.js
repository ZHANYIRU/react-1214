import styled from '../../../styles/member-scss/MemberInfo.module.scss'

export default function TotalHeight(totalHeight) {
  return (
    <>
      <div className={styled.totalHeight}>
        <img className={styled.sun} src={'./img/sun_face.png'} alt="sun" />
        <img className={styled.cloud1} src={'./img/cloud3.png'} alt="cloud" />
        <img className={styled.cloud2} src={'./img/cloud5.png'} alt="cloud" />
        <div className={styled.AnimationBox}>
          <img
            className={styled.trekker}
            src={'./img/tozan_trekking_man.png'}
            alt="trekker"
          />
          <img
            className={styled.mountain}
            src={'/img/mountain_yama.png'}
            alt="mountain"
          />
        </div>
        <h4>
          累積海拔:
          {totalHeight.totalHeight ? totalHeight.totalHeight.height : 0} 公尺
        </h4>
      </div>
    </>
  )
}
