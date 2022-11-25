import React from 'react'
import { Link } from 'react-router-dom'
import style from '../../../styles/camp-scss/campcat.module.scss'

function ListLeft() {
  const easy = {}
  return (
    <div className={style.list}>
      <div>登山新手行程｜初階體驗</div>
      <div>百岳入門行程｜中階探索</div>
      <div>百岳進階行程｜高階冒險</div>
      <div>一日單攻報名行程</div>
      <Link to="/camp/:camp_product_sid">產品單頁</Link>
    </div>
  )
}

export default ListLeft
