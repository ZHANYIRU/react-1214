import React, { useEffect, useState } from 'react'
import style from '../../styles/camp-scss/camphome.module.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CampSlider() {
  let all = 'all'
  //all活動產品資料
  const [campData, setCampData] = useState([{}])

  const navigate = useNavigate()

  const fetchAll = async (url) => {
    try {
      const response = await axios.get(`http://localhost:3001/camp/${url}`)
      const data = response.data
      setCampData(data)
    } catch (e) {
      console.log(e.message)
    }
  }
  useEffect(() => {
    fetchAll('all')
  }, [])
  return (
    <>
      {campData
        .filter((v, i) => {
          return v.campaign_type_name === '一日單攻報名行程'
        })
        .map((v, i) => {
          if (i < 1){
          return (
            <>
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
                      <div className={style.limit}>
                        <p>報名人數限制：{v.qty}人 , 已報名：39人</p>
                        <p>
                          截止報名：{v.camp_joinenddate} , 報名倒數：29天19分3秒
                        </p>
                      </div>
                    </div>
                    <div className={style.context}>
                      <div className={style.text}>
                        <h3>{v.name}</h3>
                        <h4>活動日期：{v.camp_startdate} </h4>
                        <p>{v.brife_describe}</p>
                      </div>

                      <button onClick={() => {
                          navigate(`/camp/${v.sid}`)
                        }}
                        >我要報名</button>
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
            </>
          )}
        })}
    </>
  )
}

export default CampSlider
