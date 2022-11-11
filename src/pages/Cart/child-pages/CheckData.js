import styled from '../../../styles/cart-scss/CheckData.module.scss'
import WriteData from '../components/WriteData'
import { useEffect, useState } from 'react'
function CheckData({ step, setStep }) {
  //旋轉狀態
  const [rotate, setRotate] = useState({
    transform: 'rotateY(180deg)',
  })
  //write,確認按鍵狀態
  const [check, setCheck] = useState('填寫資料')
  //結帳按鈕出現與否
  const [buy, setBuy] = useState(false)
  //進這元件的時候，滾動到視窗最上面
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div className={styled.btnGroup}>
        <button
          onClick={() => {
            setStep(step - 1)
          }}
        >
          上一步
        </button>
        <button
          onClick={() => {
            if (rotate.transform === 'rotateY(180deg)') {
              setRotate({ ...rotate, transform: 'rotateY(360deg)' })
            } else {
              setRotate({ ...rotate, transform: 'rotateY(180deg)' })
            }
            if (check === '填寫資料') {
              setCheck('確認商品')
              setBuy(true)
            } else {
              setCheck('填寫資料')
              setBuy(false)
            }
          }}
        >
          {check}
        </button>
        {buy && (
          <button
            onClick={() => {
              setStep(step + 1)
            }}
          >
            結帳去
          </button>
        )}
      </div>
      <div className={styled.camera}>
        <div className={styled.threeD} style={rotate}>
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
                  <img
                    src="https://vencedor888.com/upload/1000_86.jpg"
                    alt=""
                  />
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
                  <img
                    src="https://vencedor888.com/upload/1000_86.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <WriteData />
        </div>
      </div>
    </>
  )
}

export default CheckData
