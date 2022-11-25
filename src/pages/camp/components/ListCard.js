import React, { useEffect, useState } from 'react'
import style from '../../../styles/camp-scss/camphome.module.scss'
import axios from 'axios'

function ListCard() {
  //title資料
  const [campTitle, setCampTitle] = useState([{}])
  //活動產品資料
  const [campData, setCampData] = useState([{}])

  let title = 'title'
  let all = 'all'
  const fetchAll = async (url) => {
    try {
      const response = await axios.get(`http://localhost:3001/camp/${url}`)
      const data = response.data
      console.log('all')
      if (url === 'title') {
        setCampTitle(data)
      } else if (url === 'all') {
        setCampData(data)
      }
    } catch (e) {
      console.log(e.message)
    }
  }
  useEffect(() => {
    fetchAll('title')
    fetchAll('all')
  }, [])
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
