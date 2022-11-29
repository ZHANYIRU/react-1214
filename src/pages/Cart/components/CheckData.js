import { useContext } from 'react'
import styled from '../../../styles/cart-scss/CheckData.module.scss'
import ProCartContext from '../../../contexts/ProCartContext'
function CheckData() {
  const { pro, room, ren, camp, moneyFormat } = useContext(ProCartContext)
  return (
    <>
      <div className={styled.checkCart}>
        <h2>確認商品</h2>
        {room && (
          <div className={styled.checkRoom}>
            <h2>營位/山莊</h2>
            {room.map((el, i) => {
              return (
                <div className={styled.checkWrap} key={el.sid}>
                  <div className={styled.checkText}>
                    <h2>{el.name}</h2>
                    <p>地址：{el.address}</p>
                    <p>預定日期：{el.startDate}</p>
                    <p>離開日期：{el.endDate}</p>
                    <p>人數：{el.quantity}人</p>
                    <p>總金額：{moneyFormat(el.price * el.quantity)}</p>
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
                      <span>{el.area}</span>
                    </div>
                    <div>
                      <i className="fa-solid fa-mountain"></i>
                      <span>{el.moun}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {camp && (
          <div className={styled.checkCam}>
            <h2>套裝行程</h2>
            {camp.map((el, i) => {
              return (
                <div className={styled.checkWrap} key={el.sid}>
                  <div className={styled.checkText}>
                    <h2>{el.name}</h2>
                    <p>集合地址：{el.address}</p>
                    <p>預定日期：{el.startDate}</p>
                    <p>人數：{el.quantity}人</p>
                    <p>總金額：{moneyFormat(el.price * el.quantity)}</p>
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
                      <span>{el.area}</span>
                    </div>
                    <div>
                      <i className="fa-solid fa-mountain"></i>
                      <span>{el.moun}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {pro && (
          <div className={styled.checkPro}>
            <h2>登山用品</h2>
            {pro.map((el, i) => {
              return (
                <div className={styled.checkWrap} key={`${el.size}+${el.sid}`}>
                  <div className={styled.checkText}>
                    <h2>NorthFace外套</h2>
                    <p>尺寸：{el.size}</p>
                    <p>單價：{moneyFormat(el.price)}</p>
                    <p>數量：{el.quantity}</p>
                    <p>總金額：{moneyFormat(el.price * el.quantity)}</p>
                  </div>
                  <div className={styled.checkImg}>
                    <img
                      src="https://cdn2.ettoday.net/images/4778/d4778980.jpg"
                      alt=""
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {ren && (
          <div className={styled.checkRen}>
            <h2>租借裝備</h2>
            {ren.map((el, i) => {
              return (
                <div
                  className={styled.checkWrap}
                  style={{ height: '250px' }}
                  key={`${el.size}+${el.sid}`}
                >
                  <div className={styled.checkText}>
                    <h2>NorthFace睡袋</h2>
                    <p>
                      租還日期：{el.startDate}~{el.endDate}
                    </p>
                    <p>
                      租借－歸還：{el.out}-{el.back}
                    </p>
                    <p>運費：{el.deliveryFee}</p>
                    <p>單價：{moneyFormat(el.price)}</p>
                    <p>數量：{el.quantity}</p>
                    <p>
                      總金額：
                      {moneyFormat(el.price * el.quantity + el.deliveryFee)}
                    </p>
                  </div>
                  <div className={styled.checkImg}>
                    <img
                      src="https://vencedor888.com/upload/1000_86.jpg"
                      alt=""
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default CheckData
