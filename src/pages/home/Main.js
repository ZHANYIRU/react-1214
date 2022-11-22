import styled from '../../styles/home-scss/Main.module.scss'
import { useRef, useEffect } from 'react'
// import Weather from './Weather'
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
        {/* <Weather /> */}
        <div className={styled.section1}>
          <div className={styled.cube}>
            <div className={styled.front}>有了837，登山很容易！</div>
            <div className={styled.bottom}>輕鬆簡單，就能入門爬山</div>
            <div className={styled.back}>快加入熱門揪團活動！</div>
            <div className={styled.left}></div>
            <div className={styled.right}></div>
            <div className={styled.top}></div>
          </div>
        </div>
        <div className={styled.section2}>
          <div className={styled.pic}>
            <img
              src="https://shoplineimg.com/5e8ca63265b7fe000a2e1c3f/6357c60978d1861b85d5aa3e/800x.webp?source_format=jpg"
              alt=""
            />
          </div>
          <div className={styled.text}>
            寧可做過了回味
            <br />
            也不要錯過了後悔 <br />
            就算是初次進入戶外的世界，
            <br />
            也不用擔心不知道要從哪裡開始準備！ <br />
            台灣837 推薦限定熱門行程
            <br />
            讓新手也能輕鬆擁有安全的登山、野營初體驗！
            <div className={styled.click}>全台店點</div>
          </div>
        </div>
        <div className={styled.section3}></div>
      </div>
    </>
  )
}
export default Main
