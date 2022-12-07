import { useState, useContext } from 'react'
import ProCartContext from '../../../../contexts/ProCartContext'
import styled from '../../../../styles/cart-scss/cartDetail.module.scss'
function CartDetailCam() {
  const { camp, plusOne3, minusOne3, delOne3, moneyFormat } =
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
                  <div className={`${styled.wrapRight} ${styled.camR}`}>
                    <div className={styled.roomText}>
                      <h2>{el.name}</h2>
                      <p>預定日期：{el.startDate}</p>
                      <p>天數：{el.dayname}</p>
                      <p>單價：{moneyFormat(el.price)}</p>
                      <div className={styled.people}>
                        <p>人數：</p>
                        <div className={styled.qty}>
                          {el.quantity <= 1 ? (
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
                          <button>{el.quantity}</button>
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
                      <p>總金額：{moneyFormat(el.quantity * el.price)}</p>
                    </div>
                    <div className={`${styled.roomImg} ${styled.campImg}`}>
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
                  <i
                    className="fa-regular fa-trash-can"
                    onClick={() => {
                      const t = el.quantity * el.price
                      change(el, i)
                      setTimeout(() => {
                        delOne3(el.sid, t)
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
