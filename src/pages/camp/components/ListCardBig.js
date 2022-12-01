import React from 'react'

import style from '../../../styles/camp-scss/campcat.module.scss'

function ListCardBig() {
  
  return (
    <div className={style.listcardbig}>
      <div className={style.listcardimg}>
        <img src="https://s3.amazonaws.com/imagescloud/images/medias/annexes/annexe-camping-2022.jpg" />
      </div>
      <div className={style.listcardbigtext}>
        <p>四崁水生態導覽 - 新北近郊親民步道，親子賞鳥聖地</p>
        <p>金額：$1,960</p>
        <div> 評價：stars</div>
        <button >查看更多</button>
      </div>
    </div>
  )
}

export default ListCardBig
