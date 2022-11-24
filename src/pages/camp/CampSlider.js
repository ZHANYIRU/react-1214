import React from 'react'
import style from '../../styles/camp-scss/camphome.module.scss'

function CampSlider() {
  return (
    <div>
      <div className={style.slider}>
        <div className={style.dayonepic}>
          <img src="https://s3.amazonaws.com/imagescloud/images/medias/annexes/annexe-camping-2022.jpg" />
        </div>
        <div className={style.dayoneright}>
          <div className={style.bar}>
            <div className={style.barlong}>
              <div className={style.barshort}></div>
            </div>

            <p>已報名：39人 </p>
            <p>截止報名：2022/11/11</p>
          </div>
          <div className={style.context}>
            <div className={style.text}>
              <h3>宜蘭抹茶山一日遊揪團</h3>
              <h4>活動日期：2022/12/31 </h4>
              <h4>報名人數限制：50人</h4>
              <p>
                日本攝影師小林賢伍所拍攝的照片曝光後，
                因他將這座山稱為台灣的抹茶冰淇淋山，
                讓「抹茶山」這個稱呼一炮而紅， 這座山也成為了超夯的熱門景點！
              </p>
            </div>
            <button>我要報名</button>
          </div>
        </div>
      </div>

      <div className={style.sliderdots}>
        <div className={style.sliderdot}></div>
        <div className={style.sliderdot}></div>
        <div className={style.sliderdot}></div>
        <div className={style.sliderdot}></div>
      </div>
    </div>
  )
}

export default CampSlider
