import React from 'react'
import style from '../../styles/camp-scss/camphome.module.scss'
import ListCard from './components/ListCard'
import { Link } from 'react-router-dom'

function CampHomeList() {
  return (
    <div className={style.list}>
      <h2 className={style.title}>
        <Link to="/camp/easy">登山新手行程｜初階體驗</Link>
      </h2>
      <div className={style.listbox}>
        <ListCard />
        <ListCard />
        <ListCard />
        <ListCard />
      </div>
      <div className={style.listpage}></div>
    </div>
  )
}

export default CampHomeList
