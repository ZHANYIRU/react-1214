import styled from '../styles/NAV.module.scss'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import ProCartContext from '../contexts/ProCartContext'
import MemberContext from '../contexts/MemberContext'

function Navbar() {
  const { cartItem } = useContext(ProCartContext)

  const { data, auth, setAuth, resetData } = useContext(MemberContext)

  const [loginBox, setLoginBox] = useState({
    top: '-20px',
  })
  const loginBtn = (e) => {
    e.preventDefault()
    if (loginBox.top === '-20px') {
      setLoginBox({ ...loginBox, top: '70px' })
    } else {
      setLoginBox({ ...loginBox, top: '-20px' })
    }
  }
  return (
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
          </Link>
          <span>{cartItem}</span>
          <Link to="/member" onClick={loginBtn}>
            <i className="fa-solid fa-user">{data.nickname}</i>
          </Link>
        </div>
      </nav>
      <div className={styled.loginBefore} style={loginBox}>
        {auth ? (
          <Link to="/member">
            <span>會員中心</span>
          </Link>
        ) : (
          <Link to="/login">
            {/* 切換會員中心 */}
            <span>會員登入</span>
          </Link>
        )}
        {auth ? (
          <Link>
            <span
              onClick={() => {
                resetData()
                localStorage.removeItem('token')
                setAuth(false)
              }}
            >
              會員登出
            </span>
          </Link>
        ) : (
          <Link to="/join">
            {/* 切換會員登出 */}
            <span>會員註冊</span>
          </Link>
        )}
      </div>
    </>
  )
}
export default Navbar
