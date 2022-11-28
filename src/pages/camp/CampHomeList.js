import React, { useEffect, useState } from 'react'
import style from '../../styles/camp-scss/camphome.module.scss'
import ListCard from './components/ListCard'
import { Link } from 'react-router-dom'
import axios from 'axios'

function CampHomeList() {
  //title資料
  const [campTitle, setCampTitle] = useState([{}])
  //all活動產品資料
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
    <div className={style.list}>
      <h2 className={style.title}>
        {campTitle
          .filter((v, i) => {
            return v.campaign_type_name !== '一日單攻報名行程'
          })
          .map((v, i) => {
            return (
              <>
                <Link to={`/camp/${v.camp_url}`}>{v.campaign_type_name}</Link>
                <div className={style.listbox}>
                  {campData.map((v, i) => {
                    if (i < 4) {
                      return (
                        <>
                          <div className={style.listcard}>
                            <div>
                              <img src="https://s3.amazonaws.com/imagescloud/images/medias/annexes/annexe-camping-2022.jpg" />
                            </div>
                            <div className={style.listcardtext}>
                              <p>{v.name}</p>
                              <p>金額：{v.price}</p>
                              <div> 評價：stars</div>
                            </div>
                          </div>
                        </>
                      )
                    } else {
                      return
                    }
                  })}
                </div>
                <div className={style.listpage}></div>
              </>
            )
          })}
      </h2>

      
    </div>
  )
}

export default CampHomeList
