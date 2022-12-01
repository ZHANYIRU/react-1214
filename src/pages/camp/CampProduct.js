import React, { useEffect, useState } from 'react'
import ListLeft from './components/ListLeft'
import style from '../../styles/camp-scss/campproduct.module.scss'
import { useSearchParams, useParams } from 'react-router-dom'
import axios from 'axios'

function CampProduct() {
  const { camp_sid } = useParams()
  //sid活動產品資料
  const [campSid, setCampSid] = useState([{}])
  let sid = 'sid'

  //抓url的/?camp_sid=多少
  const [usp] = useSearchParams()
  console.log(camp_sid)

  const fetchAll = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/camp/${camp_sid}`)
      const data = response.data
      console.log('sid')

      setCampSid(data)
    } catch (e) {
      console.log(e.message)
    }
  }
  useEffect(() => {
    fetchAll('sid')
  }, [])

  return (
    <>
      <div className={style.product}>
        <ListLeft />
        <div className={style.pright}>
          <div>麵包屑/麵包屑/麵包屑/麵包屑</div>
          {campSid.map((v, i) => {
            if (i < 1) {
              return (
                <>
                  <div className={style.card}>
                    <div className={style.cardtop}>
                      <h2>{v.name}</h2>
                      <div>
                        <div className={style.location}>
                          <span>
                            <i className="fa-solid fa-map-location-dot"></i>
                          </span>
                          <p>{v.location_name}</p>
                        </div>
                        <div className={style.mountain}>
                          <span>
                            <i className="fa-solid fa-mountain"></i>
                          </span>
                          <span>{v.mountain_name}</span>
                        </div>
                        <div>人數區</div>
                        <div>金額：{v.price}</div>
                        <div>評價：stars</div>
                      </div>
                      <div>
                        train
                        <img src="https://s3.amazonaws.com/imagescloud/images/medias/annexes/annexe-camping-2022.jpg" />
                      </div>
                      <div>火車左右按鈕</div>
                    </div>
                    <div className={style.switch}>
                      <div>介紹</div>
                      <div>評論(12)</div>
                    </div>
                    <div className={style.cardcontext}>
                      <div id="introduction">
                        <h4>活動介紹</h4>
                        <p>{v.brife_describe}</p>

                        <h4>行程規劃</h4>
                        <div className={style.schedule}>
                          <p>{v.schedule_day1}</p>
                          <p>{v.schedule_day2}</p>
                          <p>{v.schedule_day3}</p>
                        </div>

                        <h4>注意事項</h4>
                        <p>
                          出發前請留意氣象資訊，山區天氣變化多端，早晚以及越往山上溫差越大，穿著建議以洋蔥式穿法。不管是在夏季或冬季氣候，高山氣溫還是明顯偏低，切記要做好保暖才不會容易引發高山症。
                          另外，每個人對於溫度的感受不盡相同，請務必根據自己的身體條件，做好穿著和攜帶衣物的責任。
                          如所攜帶之裝備不足以完成行程的人，以及對個人或團隊安全有所危害者，領隊嚮導有權要求撤退並陪同之。
                          行進間，除領隊或嚮導有特別安排，請勿超前隊伍自行脫隊，或刻意落後，為了各位夥伴安全，讓領隊及嚮導好好待在身旁。
                          行程中有任何問題如擔心、害怕、心生疑慮，或遇到不敢通過的地形等，請務必告知領隊或嚮導，我們將盡最大的努力提供最好的服務。
                          初學者如尚不適應登山行程、或裝備不熟悉者，切記量力而為。建議將背包總重量（含背包本身、行動水、午餐、行動糧）控制在八公斤以下。
                          請在出發前就多加進行自主訓練，訓練方向請針對心肺和肌力，跑步、游泳、重訓、深蹲等多方加強。
                          請審慎評估自身能力再進行報名。
                          此次行程安全為第一考量，落實無痕山林，一起當個友愛大自然的孩子吧！
                          爬山過程中，如遇身體不適，或有任何情況發生，請盡快告知領隊或嚮導，請勿硬撐而讓自己陷入危險當中。
                        </p>
                        <h5>【報名前請務必詳閱 條款及細則 ＆ 裝備說明】 </h5>
                      </div>
                      <div id="comment">
                        <h4>評論數量</h4>
                        <h5>【報名前請務必詳閱 條款及細則 ＆ 裝備說明】 </h5>
                      </div>
                    </div>
                  </div>
                </>
              )
            }
          })}
        </div>
      </div>
    </>
  )
}

export default CampProduct
