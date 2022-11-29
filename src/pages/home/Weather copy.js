import style from '../../styles/home-scss/weather.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
function Weather() {
  //所有地區天氣資料
  const [locationWeather, setLocationWeather] = useState([
    {
      locationName: '',
      weatherElement: [],
    },
  ])
  //新北市天氣資料
  const [newTaipei, setNewTaipei] = useState([])

  //使用者切換到地區天氣詳情
  const [selectLocation, setSelectLocation] = useState([])

  const getWeatherDate = async () => {
    const response = await axios.get(
      'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-85001E30-AF93-4B7B-AEEF-C98453EAAED6&format=JSON&locationName=&elementName=Wx,MinT,MaxT'
    )
    console.log(response.data.records.location)
    setLocationWeather(response.data.records.location)
    setNewTaipei(response.data.records.location[1].weatherElement)
  }

  const getLocationWeather = async (e) => {
    const selLocation = e.target.value
    const response = await axios.get(
      'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-85001E30-AF93-4B7B-AEEF-C98453EAAED6&format=JSON&locationName=&elementName=Wx,MinT,MaxT'
    )
    setSelectLocation(
      response.data.records.location[selLocation].weatherElement
    )
  }
  useEffect(() => {
    getWeatherDate()
  }, [])
  return (
    <>
      <div className={style.WeatherCardWrapper}>
        <div className={style.date}>
          <span>2022-11-28</span>
          <span>星期一</span>
        </div>
        <div className={style.icon}>
          <img src="/img/sun.png" alt="" />
        </div>
        <div className={style.tempareature}>
          <div>
            <span>6:00</span>
            {selectLocation.length === 0 ? (
              <span>
                {newTaipei.length !== 0 &&
                  newTaipei[1].time[1].parameter.parameterName}
                -
                {newTaipei.length !== 0 &&
                  newTaipei[2].time[1].parameter.parameterName}
                °C
              </span>
            ) : (
              <span>
                {selectLocation.length !== 0 &&
                  selectLocation[1].time[1].parameter.parameterName}
                -
                {selectLocation.length !== 0 &&
                  selectLocation[2].time[1].parameter.parameterName}
                °C
              </span>
            )}
          </div>
          <div>
            <span>18:00</span>
            {selectLocation.length === 0 ? (
              <span>
                {newTaipei.length !== 0 &&
                  newTaipei[1].time[2].parameter.parameterName}
                -
                {newTaipei.length !== 0 &&
                  newTaipei[2].time[2].parameter.parameterName}
                °C
              </span>
            ) : (
              <span>
                {selectLocation.length !== 0 &&
                  selectLocation[1].time[2].parameter.parameterName}
                -
                {selectLocation.length !== 0 &&
                  selectLocation[2].time[2].parameter.parameterName}
                °C
              </span>
            )}
          </div>
        </div>
        <div className={style.weatherStatus}>
          {selectLocation.length === 0 ? (
            <span>
              {newTaipei.length !== 0 &&
                newTaipei[0].time[1].parameter.parameterName}
            </span>
          ) : (
            <span>
              {selectLocation.length !== 0 &&
                selectLocation[0].time[2].parameter.parameterName}
            </span>
          )}
        </div>
        <div className={style.locationSelect}>
          <select onChange={getLocationWeather}>
            <option>{newTaipei.length !== 0 && '新北市'}</option>
            {locationWeather.map((v, i) => {
              return (
                <option key={i} value={i}>
                  {v.locationName}
                </option>
              )
            })}
          </select>
        </div>
      </div>
    </>
  )
}

export default Weather
