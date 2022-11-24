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
      {/* <div className={styled.divWrap} style={{ visibility: ftr && 'hidden' }}>
        <div className={`${styled.box} ${styled.div4}`}></div>
        <div className={`${styled.box} ${styled.div5}`}></div>
      </div> */}
    </>
  )
}
export default Background
