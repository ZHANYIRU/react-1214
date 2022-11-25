import stylePropObject from 'eslint-plugin-react/lib/rules/style-prop-object'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import style from '../../styles/camp-scss/camphome.module.scss'
import CampSlider from './CampSlider'
import CampHomeList from './CampHomeList'
import axios from 'axios'

function Camp() {
  
  return (
    <>
      <h2 className={style.title}>
        <Link to="/camp/filter">一日單攻報名行程</Link>
      </h2>
      <CampSlider />
      <CampHomeList />
      
    </>
  )
}

export default Camp
