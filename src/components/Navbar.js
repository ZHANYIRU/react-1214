import styled from '../styles/NAV.module.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
function Navbar() {
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
          </ul>
        </div>
        <div className={styled.navRight}>
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
          <span>9</span>
          <Link to="/member" onClick={loginBtn}>
            <i className="fa-solid fa-user"></i>
          </Link>
        </div>
      </nav>
      <div className={styled.loginBefore} style={loginBox}>
        <Link to="/login">
          <span>會員登入</span>
        </Link>
        <Link>
          <span>會員註冊</span>
        </Link>
      </div>
    </>
  )
}
export default Navbar
