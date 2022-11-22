import { useState, useContext } from 'react'
import ProCartContext from '../../../../contexts/ProCartContext'
import styled from '../../../../styles/cart-scss/cartDetail.module.scss'
function CartDetailCam() {
  const { camp, plusOne3, minusOne3, delOne3 } = useContext(ProCartContext)
  const [del, setDel] = useState([])
  const change = (el, i) => {
    if (!del.includes(el.sid)) {
      const newDel = [...del, el.sid]
      setDel(newDel)
    }
  }
  return (
    <>
      {camp && (
        <div className={`${styled.dtWrap} ${styled.cam}`}>
          <div className={styled.outWrap}>
            {camp.map((el, i) => {
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
                  <div className={styled.wrapRight}>
                    <div className={styled.roomText}>
                      <h2>{el.name}</h2>
                      <p>集合地址：{el.address}</p>
                      <p>預定日期：{el.startDate}</p>
                      <p>單價：{el.price}</p>
                      <div className={styled.people}>
                        <p>人數：</p>
                        <div className={styled.qty}>
                          {el.qty <= 1 ? (
                            <button
                              onClick={() => {
                                minusOne3(el.sid, el.price)
                              }}
                              disabled
                            >
                              －
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                minusOne3(el.sid, el.price)
                              }}
                            >
                              －
                            </button>
                          )}
                          <button>{el.qty}</button>
                          <button
                            onClick={() => {
                              plusOne3(el.sid, el.price)
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
                  <i
                    className="fa-regular fa-trash-can"
                    onClick={() => {
                      change(el, i)
                      setTimeout(() => {
                        delOne3(el.sid)
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

export default CartDetailCam
