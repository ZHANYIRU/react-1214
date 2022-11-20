import styled from '../styles/Footer.module.scss'
import { useLocation } from 'react-router-dom'
function Footer(props) {
  const { pathname } = useLocation()
  return (
    <>
      <footer>
        {pathname !== '/' && pathname !== '/room' ? (
          <div className={styled.img}>
            <img src="../img/footermoun.png" alt="" />
          </div>
        ) : (
          <div className={styled.divWrap}>
            <div className={`${styled.box} ${styled.div4}`}></div>
            <div className={`${styled.box} ${styled.div5}`}></div>
          </div>
        )}

        <div className={styled.footer}>
          <div className={styled.ftrTop}>
            <div className={styled.ftrLeft}>
              <div className={styled.about}>
                <h3>關於我們</h3>
                <div>
                  <p>地址：台北市大安區大安路5號</p>
                  <p>電話：0987654321</p>
                </div>
              </div>
              <div className={styled.media}>
                <h3>社群媒體</h3>
                <div className={styled.icon}>
                  <i className="fa-brands fa-instagram"></i>
                  <i className="fa-brands fa-square-facebook"></i>
                  <i className="fa-brands fa-youtube"></i>
                  <br />
                  <i className="fa-brands fa-twitter"></i>
                  <i className="fa-brands fa-pinterest-p"></i>
                </div>
              </div>
              <div className={styled.like}>
                <h3>訂閱我們</h3>
                <div>
                  <input type="text" placeholder="Email" />
                  <button>訂閱</button>
                </div>
              </div>
            </div>
            <div className={styled.ftrLogo}>
              <img src="../img/Logo1920x1293.png" alt="" />
            </div>
          </div>
          <div className={styled.ftrBottom}>
            <div className={styled.btmLeft}>
              <p>8 3 7 © All Rights Reserved.</p>
              <div className={styled.btmLogo}>
                <img src="../img/Logo1920x1293.png" alt="" />
              </div>
            </div>
            <p>
              About us<span>Account</span>Cookies Privacy
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
