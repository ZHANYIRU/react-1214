import styled from '../../../styles/cart-scss/CheckData.module.scss'

function CheckData() {
  return (
    <>
      <div className={styled.checkCart}>
        <h2>確認商品</h2>
        <div className={styled.checkRoom}>
          <h2>營位/山莊</h2>
          <div className={styled.checkWrap}>
            <div className={styled.checkText}>
              <h2>南庄小美家民宿</h2>
              <p>地址：353苗栗縣南庄鄉蓬萊村42份7-6號</p>
              <p>預定日期：2022/10/31</p>
              <p>離開日期：2022/11/1</p>
              <p>人數：10人</p>
              <p>總金額：6050</p>
            </div>
            <div className={styled.checkImg}>
              <img
                src="https://pix10.agoda.net/hotelImages/793414/-1/97f284bee5c75ff30e2658b179d5c9f1.jpg?ca=9&ce=1&s=1024x768"
                alt=""
              />
            </div>
            <div className={styled.icon}>
              <div>
                <i className="fa-solid fa-map-location-dot"></i>
                <span>苗栗 南庄區</span>
              </div>
              <div>
                <i className="fa-solid fa-mountain"></i>
                <span>加里山</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styled.checkCam}>
          <h2>套裝行程</h2>
          <div className={styled.checkWrap}>
            <div className={styled.checkText}>
              <h2>眠月線-失落的森林</h2>
              <p>集合地址：353苗栗縣南庄鄉蓬萊村42份7-6號</p>
              <p>預定日期：2022/10/31</p>
              <p>3天2夜</p>
              <p>總金額：3450</p>
            </div>
            <div className={styled.checkImg}>
              <img
                src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
                alt=""
              />
            </div>
            <div className={styled.icon}>
              <div>
                <i className="fa-solid fa-map-location-dot"></i>
                <span>苗栗 南庄區</span>
              </div>
              <div>
                <i className="fa-solid fa-mountain"></i>
                <span>加里山</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styled.checkPro}>
          <h2>登山用品</h2>
          <div className={styled.checkWrap}>
            <div className={styled.checkText}>
              <h2>NorthFace外套</h2>
              <p>尺寸：Ｍ</p>
              <p>單價：3299</p>
              <p>數量：2</p>
              <p>總金額：3450</p>
            </div>
            <div className={styled.checkImg}>
              <img
                src="https://cdn2.ettoday.net/images/4778/d4778980.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={styled.checkRen}>
          <h2>租借裝備</h2>
          <div className={styled.checkWrap} style={{ height: '250px' }}>
            <div className={styled.checkText}>
              <h2>NorthFace睡袋</h2>
              <p>尺寸：Ｍ</p>
              <p>租還日期：2022/12/31~2023/1/2</p>
              <p>租借－歸還：大安店-木柵店</p>
              <p>單價：3299</p>
              <p>數量：2</p>
              <p>總金額：3450</p>
            </div>
            <div className={styled.checkImg}>
              <img src="https://vencedor888.com/upload/1000_86.jpg" alt="" />
            </div>
          </div>
          <div className={styled.checkWrap} style={{ height: '250px' }}>
            <div className={styled.checkText}>
              <h2>NorthFace睡袋</h2>
              <p>尺寸：Ｍ</p>
              <p>租還日期：2022/12/31~2023/1/2</p>
              <p>租借－歸還：大安店-木柵店</p>
              <p>單價：3299</p>
              <p>數量：2</p>
              <p>總金額：3450</p>
            </div>
            <div className={styled.checkImg}>
              <img src="https://vencedor888.com/upload/1000_86.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CheckData
