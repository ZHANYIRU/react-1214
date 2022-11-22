import { useState, useContext } from 'react'
import ProCartContext from '../../../../contexts/ProCartContext'
import styled from '../../../../styles/cart-scss/cartDetail.module.scss'
function CartDetailRoom() {
  const { room, plusOne2, minusOne2, delOne2 } = useContext(ProCartContext)
  const [del, setDel] = useState([])
  const change = (el, i) => {
    if (!del.includes(el.sid)) {
      const newDel = [...del, el.sid]
      setDel(newDel)
    }
  }
  return (
    <>
      {room && (
        <div className={styled.dtWrap}>
          <div className={styled.outWrap}>
            {room.map((el, i) => {
              return (
                <div
                  className={
                    del.includes(el.sid)
                      ? `${styled.wrapChange}`
                      : `${styled.wrap}`
                  }
                  key={el.sid}
                >
                  <input type="checkbox" />
                  <div className={styled.wrapRight} style={{ height: '250px' }}>
                    <div className={styled.roomText}>
                      <h2>{el.name}</h2>
                      <p>地址：{el.address}</p>
                      <p>預定日期：{el.startDate}</p>
                      <p>離開日期：{el.endDate}</p>
                      <p>單價：{el.price}</p>
                      <div className={styled.people}>
                        <p>人數：</p>
                        <div className={styled.qty}>
                          {el.qty <= 1 ? (
                            <button
                              onClick={() => {
                                minusOne2(el.sid, el.price)
                              }}
                              disabled
                            >
                              －
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                minusOne2(el.sid, el.price)
                              }}
                            >
                              －
                            </button>
                          )}
                          <button>{el.qty}</button>
                          <button
                            onClick={() => {
                              plusOne2(el.sid, el.price)
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
                      change(el, i)
                      setTimeout(() => {
                        delOne2(el.sid)
                      }, 500)
                    }}
                  ></i>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default CartDetailRoom
