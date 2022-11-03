import styled from './RU-NAV.module.css'
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
              <a href="#">首頁</a>
            </li>
            <li>
              <a href="#">登山用品</a>
            </li>
            <li>
              <a href="#">套裝行程</a>
            </li>
            <li>
              <a href="#">營位山莊</a>
            </li>
            <li>
              <a href="#">裝備租借</a>
            </li>
          </ul>
        </div>
        <div className={styled.navRight}>
          <a href="#">
            <i class="fa-solid fa-cart-shopping"></i>
          </a>
          <a href="#">
            <i class="fa-solid fa-user"></i>
          </a>
        </div>
      </nav>
    </>
  )
}
export default Navbar
