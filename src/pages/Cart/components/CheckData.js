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
                <div
                  className={styled.checkWrap}
                  key={el.sid}
                  style={{ height: '250px' }}
                >
                  <div className={styled.checkText}>
                    <h2>{el.name}</h2>
                    <p>地址：{el.address}</p>
                    <p>預定日期：{el.startDate}</p>
                    <p>離開日期：{el.endDate}</p>
                    <p>天數：{el.day}</p>
                    <p>床位：{el.quantity}人</p>
                    <p>
                      總金額：{moneyFormat(el.price * el.quantity * el.day)}
                    </p>
                  </div>
                  <div className={styled.checkImg}>
                    <img
                      src={`http://localhost:3001/room_img/${el.img}`}
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
                    <p>預定日期：{el.startDate}</p>
                    <p>天數：{el.dayname}</p>
                    <p>人數：{el.quantity}人</p>
                    <p>總金額：{moneyFormat(el.price * el.quantity)}</p>
                  </div>
                  <div className={styled.checkImg}>
                    <img
                      src={`http://localhost:3001/n7/campmain/${el.img}`}
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
                    <h2>{el.name}</h2>
                    {el.size && <p>尺寸：{el.size && el.size}</p>}
                    <p>單價：{moneyFormat(el.price)}</p>
                    <p>數量：{el.quantity}</p>
                    <p>總金額：{moneyFormat(el.price * el.quantity)}</p>
                  </div>
                  <div className={styled.checkImg}>
                    {el.sid === 719 ||
                    el.sid === 720 ||
                    el.sid === 721 ||
                    el.sid === 722 ? (
                      <img
                        src={`http://localhost:3001/uploads/${el.img}`}
                        alt=""
                      />
                    ) : (
                      <img
                        src={`http://localhost:3001/imgs/zx/${el.img}`}
                        alt=""
                      />
                    )}
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
                  style={{ height: '280px' }}
                  key={`${el.size}+${el.sid}`}
                >
                  <div className={styled.checkText}>
                    <h2>{el.name}</h2>
                    <p>
                      租還日期：{el.start}~{el.end}
                    </p>
                    <p>
                      租借－歸還：{el.out}-{el.back}
                    </p>
                    <p>單價：{moneyFormat(el.price)}</p>
                    <p>租借天數：{el.day}</p>
                    <p>跨店費用：{moneyFormat(el.deliveryFee)}</p>
                    <p>數量：{el.quantity}</p>
                    <p>
                      總金額：
                      {moneyFormat(
                        el.price * el.quantity * el.day + el.deliveryFee
                      )}
                    </p>
                  </div>
                  <div className={styled.checkImg}>
                    <img
                      src={`http://localhost:3001/rental_img/${el.img}`}
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
