import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from '../styles/Outlet.module.scss'
export default function Layout() {
  return (
    <>
      <img src="/img/cloud1.png" alt="" className={styled.cloud1} />
      <img src="/img/cloud2.png" alt="" className={styled.cloud2} />
      {/* <img src="/img/cloud1.png" alt="" className={styled.cloud3} /> */}
      {/* <img src="/img/bigCurvyCloud.png" alt="" className={styled.cloud4} /> */}
      <Outlet />
    </>
  )
}
