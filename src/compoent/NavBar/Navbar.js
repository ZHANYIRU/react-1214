import styled from '../../styles/NAV.module.scss'
import { Link } from 'react-router-dom'
function Navbar() {
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
            <i class="fa-solid fa-cart-shopping"></i>
          </Link>
          <span>9</span>
          <Link to="/member">
            <i class="fa-solid fa-user"></i>
          </Link>
        </div>
      </nav>
    </>
  )
}
export default Navbar
