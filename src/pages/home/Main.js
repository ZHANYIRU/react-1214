import styled from '../../styles/home-scss/Main.module.scss'
import { useRef, useEffect } from 'react'
function Main({ setFtr }) {
  const mainHeight = useRef(null)

  const scroll = () => {
    const windowH = window.innerHeight
    const mainH = mainHeight.current.clientHeight
    const windowScrollY = window.scrollY
    if (windowScrollY + windowH * 0.8 > mainH) {
      setFtr(true)
    } else {
      setFtr(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', scroll)
    return () => {
      window.removeEventListener('scroll', scroll)
    }
  }, [])
  return (
    <>
      <div className={styled.main} ref={mainHeight}>
        <div className={styled.text}>
          <h1>837837837837837</h1>
        </div>
        <div className={styled.autobg}>
          <div className={styled.section1}></div>
        </div>
        <div className={styled.autobg}>
          <div className={styled.section1}></div>
        </div>
        <div className={styled.autobg}>
          <div className={styled.section1}></div>
        </div>
        <div className={styled.autobg}>
          <div className={styled.section1}></div>
        </div>
        <div className={styled.autobg}>
          <div className={styled.section1}></div>
        </div>
        <div className={styled.autobg}>
          <div className={styled.section1}></div>
        </div>
        <div className={styled.autobg}>
          <div className={styled.section1}></div>
        </div>
      </div>
    </>
  )
}
export default Main
