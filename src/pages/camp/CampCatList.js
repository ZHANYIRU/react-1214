import React from 'react'
import { Link } from 'react-router-dom'
import style from '../../styles/camp-scss/campcat.module.scss'
import ListCardBig from './components/ListCardBig'
import ListLeft from './components/ListLeft'

function CampCatList() {
  return (
    <div className={style.cat}>
      <ListLeft />
      <div className={style.catright}>
        <div>
          登山難度<select></select>
          天數<select></select>
          <button>查詢</button>
        </div>
        <div>查詢結果</div>
        <div>麵包屑/麵包屑/麵包屑/麵包屑</div>
        <div className={style.cards}>
          <ListCardBig />
          <ListCardBig />
          <ListCardBig />
          <ListCardBig />
        </div>
      </div>
    </div>
  )
}

export default CampCatList
