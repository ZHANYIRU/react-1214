import React from 'react'
import style from '../../../styles/camp-scss/camphome.module.scss'

function ListCard() {
  return (
    <div className={style.listcard}>
      <div>
        <img src="https://s3.amazonaws.com/imagescloud/images/medias/annexes/annexe-camping-2022.jpg" />
      </div>
      <div className={style.listcardtext}>
        <p>四崁水生態導覽 - 新北近郊親民步道，親子賞鳥聖地</p>
        <p>金額：$1,960</p>
        <div> 評價：stars</div>
      </div>
    </div>
  )
}

export default ListCard
