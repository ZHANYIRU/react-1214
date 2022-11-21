import { useContext } from 'react'
import ProCartContext from '../../../../contexts/ProCartContext'
import styled from '../../../../styles/cart-scss/cartDetail.module.scss'
function CartDetailRoom() {
  const { room, plusOne2, minusOne2, delOne2 } = useContext(ProCartContext)
  return (
    <>
      {room && (
        <div className={styled.dtWrap}>
          <div className={styled.outWrap}>
            {room.map((el, v) => {
              return (
                <div className={styled.wrap} key={el.sid}>
                  <input type="checkbox" />
                  <div className={styled.wrapRight} style={{ height: '250px' }}>
                    <div className={styled.roomText}>
                      <h2>{el.name}</h2>
                      <p>地址：{el.address}</p>
                      <p>預定日期：{el.starDate}</p>
                      <p>離開日期：{el.endDate}</p>
                      <p>單價：{el.price}</p>
                      <div className={styled.people}>
                        <p>人數：</p>
                        <div className={styled.qty}>
                          {el.qty <= 1 ? (
                            <button
                              onClick={() => {
                                minusOne2(el.sid)
                              }}
                              disabled
                            >
                              －
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                minusOne2(el.sid)
                              }}
                            >
                              －
                            </button>
                          )}
                          <button>{el.qty}</button>
                          <button
                            onClick={() => {
                              plusOne2(el.sid)
                            }}
                          >
                            ＋
                          </button>
                        </div>
                        <p>人</p>
                      </div>
                      <p>總金額：{el.qty * el.price}</p>
                    </div>
                    <div className={styled.roomImg}>
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
                  <i
                    className="fa-regular fa-trash-can"
                    onClick={() => {
                      delOne2(el.sid)
                    }}
                  ></i>
                </div>
              )
            })}

            {/* <div className={styled.wrap}>
              <input type="checkbox" />
              <div className={styled.wrapRight}>
                <div className={styled.roomText}>
                  <h2>南庄小美家民宿</h2>
                  <p>地址：353苗栗縣南庄鄉蓬萊村42份7-6號</p>
                  <p>預定日期：2022/10/31</p>
                  <p>離開日期：2022/11/1</p>
                  <div className={styled.people}>
                    <p>人數：</p>
                    <div className={styled.qty}>
                      <button>－</button>
                      <button>2</button>
                      <button>＋</button>
                    </div>
                    <p>人</p>
                  </div>
                  <p>總金額：6050</p>
                </div>
                <div className={styled.roomImg}>
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
              <i className="fa-regular fa-trash-can"></i>
            </div> */}
          </div>
        </div>
      )}
    </>
  )
}

export default CartDetailRoom
