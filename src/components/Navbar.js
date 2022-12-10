import styled from '../styles/NAV.module.scss'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import ProCartContext from '../contexts/ProCartContext'
import { useMediaQuery } from 'react-responsive'
import MemberContext from '../contexts/MemberContext'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  //定義Navbar 手機板
  const mobile = useMediaQuery({ query: '(max-width:837px)' })
  const { cartItem } = useContext(ProCartContext)

  const { data, auth, setAuth, resetData } = useContext(MemberContext)

  const [loginBox, setLoginBox] = useState({
    top: '-20px',
  })
  const [loginBoxMob, setLoginBoxMob] = useState({
    top: '-50px',
    zIndex: '-1',
    visibility: 'hidden',
    opacity: 0,
  })
  const loginBtn = (e) => {
    e.preventDefault()
    if (loginBox.top === '-20px') {
      setLoginBox({ ...loginBox, top: '70px' })
    } else {
      setLoginBox({ ...loginBox, top: '-20px' })
    }
  }
  const loginBtnMMob = (e) => {
    e.preventDefault()
    if (loginBoxMob.top === '-50px') {
      setLoginBoxMob({
        ...loginBoxMob,
        top: '64px',
        zIndex: '1',
        visibility: 'visible',
        opacity: 1,
      })
    } else {
      setLoginBoxMob({
        ...loginBoxMob,
        top: '-50px',
        zIndex: '-1',
        visibility: 'hidden',
        opacity: 0,
      })
    }
  }

  const loginArea = (
    <>
      <div className={styled.loginBefore} style={loginBoxMob}>
        {auth ? (
          <span
            className={styled.logOut}
            onClick={(e) => {
              loginBtnMMob(e)
              navigate('/member')
            }}
          >
            <span>會員中心</span>
          </span>
        ) : (
          <span className={styled.logOut}>
            {/* 切換會員中心 */}
            <span
              onClick={(e) => {
                loginBtnMMob(e)
                navigate('/login')
              }}
            >
              會員登入
            </span>
          </span>
        )}
        {auth ? (
          <span className={styled.logOut}>
            <span
              onClick={(e) => {
                resetData()
                localStorage.removeItem('token')
                setAuth(false)
                loginBtnMMob(e)
              }}
            >
              會員登出
            </span>
          </span>
        ) : (
          <span className={styled.logOut}>
            {/* 切換會員登出 */}
            <span
              onClick={(e) => {
                loginBtnMMob(e)
                navigate('/join')
              }}
            >
              會員註冊
            </span>
          </span>
        )}
      </div>
    </>
  )
  const webNav = (
    <>
      <nav className={styled.nav}>
        <div className={styled.navLeft}>
          <div className={styled.logo}>
            <img src="../img/Logo1920x1293.png" alt="" />
            {/* <img src="../img/Logo-black.png" alt="" /> */}
          </div>
          <ul>
            <li>
              <Link to="/">首頁</Link>
            </li>
            <li>
              <Link to="/product">登山用品</Link>
            </li>
            <li>
              <Link to="/product/custom">客製衣服</Link>
            </li>
            <li>
              <Link to="/camp">套裝行程</Link>
            </li>
            <li>
              <Link to="/room">營位山莊</Link>
            </li>
            <li>
              <Link to="/rental">裝備租借</Link>
            </li>
            <li>
              <Link to="/social">山友分享</Link>
            </li>
          </ul>
        </div>
        <div className={styled.navRight}>
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
            <span className={styled.cartItem}>
              <p>{cartItem ? cartItem : 0}</p>
            </span>
          </Link>

          <Link to="/member" onClick={loginBtn}>
            <i className="fa-solid fa-user"></i>
            <i className="fa-solid" style={{ paddingLeft: '10px'}}>
            <span>{data.nickname ? data.nickname : ''}</span>
            </i>
          </Link>
        </div>
      </nav>
      <div className={styled.loginBefore} style={loginBox}>
        {auth ? (
          <span className={styled.logOut}>
            <span
              onClick={(e) => {
                loginBtn(e)
                navigate('/member')
              }}
            >
              會員中心
            </span>
          </span>
        ) : (
          <span className={styled.logOut}>
            {/* 切換會員中心 */}
            <span
              onClick={(e) => {
                loginBtn(e)
                navigate('/login')
              }}
            >
              會員登入
            </span>
          </span>
        )}
        {auth ? (
          <span className={styled.logOut}>
            <span
              onClick={(e) => {
                resetData()
                loginBtn(e)
                localStorage.removeItem('token')
                setAuth(false)
              }}
            >
              會員登出
            </span>
          </span>
        ) : (
          <span className={styled.logOut}>
            {/* 切換會員登出 */}
            <span
              onClick={(e) => {
                loginBtn(e)
                navigate('/join')
              }}
            >
              會員註冊
            </span>
          </span>
        )}
      </div>
    </>
  )
  const mobNav = (
    <div className={styled.navBarBigWrap}>
      <div className={styled.mobTopWrap}>
        <div className={styled.logoWrap}>
          <Link to="/">
            <div className={styled.logo}>
              <img src="../img/Logo1920x1293.png" alt="" />
              {/* <img src="../img/Logo-black.png" alt="" /> */}
            </div>
          </Link>
        </div>
        <div className={styled.navRight}>
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
            <span className={styled.cartItem}>
              <p>{cartItem ? cartItem : 0}</p>
            </span>
          </Link>
          <Link to="/member" onClick={loginBtnMMob}>
            <i className="fa-solid fa-user"></i>
          </Link>
        </div>
        {loginArea}
      </div>

      <nav className={styled.mobNavWrap}>
        <ul>
          <li>
            <Link to="/product">登山用品</Link>
          </li>
          <li>
            <Link to="/camp">套裝行程</Link>
          </li>
          <li>
            <Link to="/room">營位山莊</Link>
          </li>
          <li>
            <Link to="/rental">裝備租借</Link>
          </li>
        </ul>
      </nav>
    </div>
  )

  return <>{mobile ? mobNav : webNav}</>
}
export default Navbar
