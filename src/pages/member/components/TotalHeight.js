import styled from '../../../styles/member-scss/MemberInfo.module.scss'

export default function TotalHeight(totalHeight) {

  return (
    <>
      <div className={styled.totalHeight}>
        <h4>
          累積海拔:{' '}
          {totalHeight.totalHeight ? totalHeight.totalHeight.height : 0} 公尺
        </h4>
      </div>
    </>
  )
}
