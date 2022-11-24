import React from 'react'
import { Link } from 'react-router-dom'
import style from '../../../styles/camp-scss/campcat.module.scss'

function ListLeft() {
  return (
    <div className={style.list}>
      <Link to="/camp/easy">登山新手行程｜初階體驗</Link>
      <Link to="/camp/medium">百岳入門行程｜中階探索</Link>
      <Link to="/camp/hard">百岳進階行程｜高階冒險</Link>
      <Link to="/camp/oneday">一日單攻報名行程</Link>
      <Link to="/camp/:filter/:camp_product_sid">產品單頁</Link>
    </div>
  )
}

export default ListLeft
