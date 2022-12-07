import React from 'react'
import styled from '../styles/sunCloud.module.scss'
export default function SunCloud() {
  return (
    <div>
      <div className={styled.bgc}>
        {/* <div className={styled.cloud}></div> */}
        <div className={styled.center}>
          <div className={styled.cloud}></div>
          <ul className={styled.sun}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className={styled.loader}>
            <span>8</span>
            <span>3</span>
            <span>7</span>
          </div>
        </div>
        <div className={styled.wrap}>
          <div className={styled.box}></div>
        </div>
      </div>
    </div>
  )
}
