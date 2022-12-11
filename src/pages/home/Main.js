import styled from '../../styles/home-scss/Main.module.scss'
import { useRef, useEffect, useState } from 'react'
// import { Parallax, ParallaxProvider } from 'react-scroll-parallax'
import { Link } from 'react-router-dom'
import Leaderboard from './leaderboard'
import Weather from './Weather'
import Bird from './Bird.js'
import axios from 'axios'
import Group from './Group'
import Post from './Post'

function Main({ setFtr }) {
  const mainHeight = useRef(null)
  const [rotateCube, setRotateCube] = useState(true)
  const [deg, setDeg] = useState(0)
  //bird 開關state
  const [show, setShow] = useState(false)

  //記錄上個scroll
  let lastScroll
  const scroll = () => {
    const windowH = window.innerHeight
    const mainH = mainHeight.current.clientHeight
    const windowScrollY = window.scrollY
    if (windowScrollY + windowH * 0.8 > mainH) {
      setFtr(true)
    } else {
      setFtr(false)
    }
    const cubeHeight = window.innerHeight * 4
    const UserScrollY = window.scrollY
    if (UserScrollY < cubeHeight) {
      lastScroll = window.scrollY / 15
      setDeg(lastScroll)
    }

    if (lastScroll > 180) {
      setRotateCube(!rotateCube)
    } else if (lastScroll < 180) {
      setRotateCube(true)
    }
  }

  //coupon
  const [couponData, setCouponData] = useState({})

  //fetch 折扣券db
  async function getCoupon() {
    const response = await axios.get(`http://localhost:3001/room/coupon`)
    setCouponData(response.data.couponRows)
  }

  //po文data
  const [postData, setPostData] = useState([])

  //fetch Po文的資料
  async function getPost() {
    const response = await axios.get(`http://localhost:3001/room/post`)
    setPostData(response.data.postRows)
  }

  //一日單攻活動data
  const [oneday, setOneday] = useState([])

  //fetch 一日單攻活動資料
  async function getOneday() {
    const response = await axios.get(`http://localhost:3001/room/oneday`)
    setOneday(response.data.onedayRows[0])
  }

  useEffect(() => {
    getCoupon()
    getPost()
    getOneday()
    window.addEventListener('scroll', scroll)
    return () => {
      window.removeEventListener('scroll', scroll)
    }
  }, [])
  return (
    <>
      <div className={styled.main} ref={mainHeight}>
        {/* <ParallaxProvider speed={-10}> */}
        {rotateCube ? <Weather /> : ''}
        <div className={styled.section1}>
          {rotateCube ? (
            <Bird
              show={show}
              setShow={setShow}
              couponData={couponData}
              setCouponData={setCouponData}
            />
          ) : (
            ''
          )}

          <div
            className={styled.visible}
            style={{ visibility: rotateCube && !show ? 'visible' : 'hidden' }}
          >
            <div className={styled.camera}>
              <div
                className={`${styled.cube}`}
                style={{
                  transform: deg <= 180 && `rotateX(${deg}deg) `,
                  visibility: rotateCube && !show ? 'visible' : 'hidden',
                }}
              >
                <div className={styled.bottom}>輕鬆簡單，就能入門爬山</div>
                <div className={styled.front}>有了837，登山很容易！</div>
                <div className={styled.back}>快加入熱門揪團活動！</div>
              </div>
            </div>
          </div>
          {/* <Parallax speed={-5} translateX={[350, -120]}>
              <img src="/img/cloud1.png" alt="" />
            </Parallax> */}
          {/* <Parallax
              speed={-15}
              translateX={[300, -80]}
              translateY={[-150, 80]}
            >
              <img src="/img/cloud1.png" alt="" />
            </Parallax> */}

          {/* <Parallax translateX={[-50, 120]}>
            <img src="/img/cloud1.png" alt="" />
          </Parallax> */}
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
            <Link to="/store">
              <button className={styled.click}>全台店點</button>
            </Link>
          </div>
        </div>
        <div className={styled.section3}>
          <Group oneday={oneday} />
        </div>
        <div className={styled.section4}>
          <Leaderboard />
        </div>
        <div className={styled.section5}>
          <Post postData={postData} />
        </div>
        {/* </ParallaxProvider> */}
      </div>
    </>
  )
}
export default Main
