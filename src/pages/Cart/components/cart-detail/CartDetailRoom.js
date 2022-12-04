import { useState, useContext } from 'react'
import ProCartContext from '../../../../contexts/ProCartContext'
import styled from '../../../../styles/cart-scss/cartDetail.module.scss'
function CartDetailRoom() {
  const { room, plusOne2, minusOne2, delOne2, moneyFormat } =
    useContext(ProCartContext)
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
                  <div className={`${styled.wrapRight} ${styled.roomR}`}>
                    <div className={styled.roomText}>
                      <h2>{el.name}</h2>
                      <p>地址：{el.address}</p>
                      <p>預定日期：{el.startDate}</p>
                      <p>離開日期：{el.endDate}</p>
                      <p>天數：{el.day}</p>
                      <p>單價：{moneyFormat(el.price)}</p>
                      <div className={styled.people}>
                        <p>床位：</p>
                        <div className={styled.qty}>
                          {el.quantity <= 1 ? (
                            <button
                              onClick={() => {
                                minusOne2(el.sid, el.price, el.day)
                              }}
                              disabled
                            >
                              －
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                minusOne2(el.sid, el.price, el.day)
                              }}
                            >
                              －
                            </button>
                          )}
                          <button>{el.quantity}</button>
                          <button
                            onClick={() => {
                              plusOne2(el.sid, el.price, el.day)
                            }}
                          >
                            ＋
                          </button>
                        </div>
                        <p>床</p>
                      </div>
                      <p>
                        總金額：{moneyFormat(el.quantity * el.price * el.day)}
                      </p>
                    </div>
                    <div className={styled.roomImg}>
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
                  <i
                    className="fa-regular fa-trash-can"
                    onClick={() => {
                      const t = el.quantity * el.price * el.day
                      change(el, i)
                      setTimeout(() => {
                        delOne2(el.sid, t)
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
