import React, { useEffect, useState } from 'react'
import styled from '../styles/sunCloud.module.scss'
import { useLocation } from 'react-router-dom'
export default function SunCloud() {
  const { pathname } = useLocation()
  const location = useLocation()
  const [showAnimate, setShowAnimate] = useState(false)

  const animation = (
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
        <div className={styled.box1}></div>
        <div className={styled.box2}></div>
        <div className={styled.box3}></div>
        <div className={styled.box4}></div>
        <div className={styled.box5}></div>
        <div className={styled.box6}></div>
        <div className={styled.box7}></div>
      </div>
    </div>
  )
  console.log(location)
  const display = showAnimate ? animation : ''

  useEffect(() => {
    if (
      pathname === '/product' ||
      pathname === '/room' ||
      pathname === '/rental' ||
      pathname === '/camp' ||
      pathname === '/member' ||
      pathname === '/profile' ||
      pathname === '/product/custom'
    ) {
      document.body.style.overflow = 'hidden'
      setShowAnimate(!showAnimate)
    }
  }, [pathname])
  useEffect(() => {
    setTimeout(() => {
      document.body.style.overflow = 'visible'
      setShowAnimate(false)
    }, 1000)
  }, [showAnimate])
  return <div>{display}</div>
}
