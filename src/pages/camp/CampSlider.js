import { useEffect, useState, useRef } from 'react'
import style from '../../styles/camp-scss/camphome.module.scss'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
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

  //輪播
  // const [render, setRender] = useState([
  //   {
  //     dots: true,
  //     infinite: true,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     autoplay: true,
  //     speed: 1000,
  //     autoplaySpeed: 1000,
  //     cssEase: 'linear',
  //   },
  // ])
  const sliderRef = useRef('')

  useEffect(() => {
    fetchAll('all')
  }, [])
  //以 calulateTimeLeft 回傳值
  //timeleft要改造成{v.camp_joinenddate}-現在的時間
  const [timeLeft, setTimeLeft] = useState(calulateTimeLeft())

  function calulateTimeLeft() {
    // console.log(currentTime.split("-"));
    let timeLeft = {}
    const a = campData.filter((v1, i) => {
      return v1.campaign_type_name === '一日單攻報名行程'
    })
    const b = a.map((v1, i) => {
      let different = new Date(v1.camp_joinenddate) - new Date()
      //let different = null
      if (different > 0) {
        timeLeft = {
          days: Math.floor(different / (1000 * 60 * 60 * 24)),
          hours: Math.floor((different / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((different / (1000 * 60)) % 60),
          seconds: Math.floor((different / 1000) % 60),
        }
      }
      return timeLeft
    })
    return b
  }

  // useEffect 處理 timer
  useEffect(() => {
    let id = setInterval(() => {
      setTimeLeft(calulateTimeLeft())
    }, 1000)
    return function () {
      clearInterval(id)
    }
  }, [timeLeft])

  return (
    <>
      <Slider
        dots={true}
        infinite={true}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        //speed={2000}
        autoplaySpeed={4000}
        cssEase="linear"
      >
        {timeLeft.length !== 0 &&
          campData
            .filter((v, i) => {
              return v.campaign_type_name === '一日單攻報名行程'
            })
            .map((v, i) => {
              // if (i <= 5) {
              return (
                <div key={i}>
                  <div className={style.slider}>
                    <div className={style.dayonepic}>
                      <img
                        src={`http://localhost:3001/n7/campmain/${v.mainImage}`}
                      />
                    </div>
                    <div className={style.dayoneright}>
                      <div className={style.bar}>
                        <div className={style.barlong}>
                          <div className={style.barshort}></div>
                        </div>
                        <div className={style.limit}>
                          <p>報名人數限制：{v.qty}人 , 已報名：39人</p>
                          <p>
                            截止報名：{v.camp_joinenddate}, 報名倒數：距離還有
                            {timeLeft[i].days}天{timeLeft[i].hours}時
                            {timeLeft[i].minutes}分 {timeLeft[i].seconds}秒
                          </p>
                        </div>
                      </div>
                      <div className={style.context}>
                        <div className={style.text}>
                          <h3>{v.camp_name}</h3>
                          <h4>活動日期：{v.camp_startdate} </h4>
                          <p>{v.brife_describe}</p>
                        </div>

                        <button
                          onClick={() => {
                            navigate(`/camp/${v.c_sid}`)
                          }}
                        >
                          我要報名
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* <div className={style.sliderdots}>
                      <div className={style.sliderdot}></div>
                      <div className={style.sliderdot}></div>
                      <div className={style.sliderdot}></div>
                      <div className={style.sliderdot}></div>
                      <div className={style.sliderdot}></div>
                    </div> */}
                </div>
              )
              // }
            })}
      </Slider>
    </>
  )
}

export default CampSlider
