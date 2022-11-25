import styled from '../../styles/home-scss/Background.module.scss'
// import { useState, useRef, useEffect } from 'react'
function Background({ ftr }) {
  return (
    <>
      <div className={styled.bgc}>
        <div className={`${styled.box} ${styled.div1}`}></div>
        <div className={`${styled.box} ${styled.div2}`}></div>
        <div className={`${styled.box} ${styled.div3}`}></div>
      </div>
      <div className={styled.divWrap} style={{ visibility: ftr && 'hidden' }}>
        <div className={`${styled.box2} ${styled.div4}`}>
          <img src="/img/4.png" alt="" />
        </div>
        <div className={`${styled.box2} ${styled.div5}`}>
          <img src="/img/5.png" alt="" />
        </div>
      </div>
    </>
  )
}
export default Background
