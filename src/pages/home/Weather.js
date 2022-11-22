import style from '../../styles/home-scss/weather.module.scss'
import React from 'react'

function Weather() {
  return (
    <>
      <div className={style.WeatherCardWrapper}>
        <div className={style.location}></div>
        <div className={style.currentWeather}>
          <div className={style.temperature}></div>
          <div className={style.weatherIcon}></div>
        </div>
        <div className={style.rain}></div>
      </div>
    </>
  )
}

export default Weather
