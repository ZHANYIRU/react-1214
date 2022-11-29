import styles from '../../../styles/member-scss/MemberInfo.module.scss'
import styled from 'styled-components'
import { keyframes } from 'styled-components'
import { useEffect } from 'react'

const Trekker = styled.img`
  bottom: 20px;
  animation: ${(props) =>
      props.distance > 0 ? climbAnimation(props.distance) : climbAnimation(0)}
    ${(props) => props.distance / 2000}s linear forwards;
  ${'' /* animation-iteration-count: infinite; */}
`

function climbAnimation(distance) {
  console.log('距離為:' + distance)
  let myDistance = distance
  if (myDistance > 10000) {
    myDistance = 10000
  }
  let str = ''
  let j = 15
  let k = 0
  let l = 5
  if (distance < 5000) {
    l = 10
  }
  if (distance < 2500) {
    l = 20
  }

  if (distance < 2000) {
    l = 25
  }

  for (let i = 0; i <= 100; i = i + l) {
    if (k % 2 === 0) {
      str += `${i}% {
                  transform: translate(${
                    (k * 12 * myDistance * l) / 5 / 10000
                  }px, ${(k * -12 * myDistance * l) / 5 / 10000 + j}px);
              }`
    } else {
      str += `${i}% {
                  transform: translate(${
                    (k * 12 * myDistance * l) / 5 / 10000
                  }px, ${(k * -12 * myDistance * l) / 5 / 10000}px);
              }`
    }
    k++
  }
  const climb = keyframes`
  ${str} 
`
  return climb
}

function showMotto(height) {
  let str = '新增一個貼文, 開始攻頂！'
  if(height > 0){
    str = '踏出第一步了, 加油！'
  }
  if(height > 5000){
    str = '超過半山腰, 再接再厲！'
  }
  if(height > 7500){
    str = '山頂就在眼前, 再加把勁！'
  }

  return <h3>{str}</h3>
}

export default function TotalHeight(totalHeight) {
  return (
    <>
      <div className={styles.totalHeight}>
        <img className={styles.sun} src={'./img/sun_face.png'} alt="sun" />
        <img className={styles.cloud1} src={'./img/cloud3.png'} alt="cloud" />
        <img className={styles.cloud2} src={'./img/cloud5.png'} alt="cloud" />
        {showMotto(totalHeight.totalHeight.height)}
        <div className={styles.AnimationBox}>
          <Trekker
            className={styles.trekker}
            src={'./img/tozan_trekking_man.png'}
            alt="trekker"
            distance={totalHeight.totalHeight.height}
          ></Trekker>
          <img
            className={styles.mountain}
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
