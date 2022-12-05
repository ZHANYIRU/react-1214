import { useState, useContext } from 'react'
import ProCartContext from '../../../../contexts/ProCartContext'
import styled from '../../../../styles/cart-scss/cartDetail.module.scss'
function CartDetailPro() {
  // pro:[{
  //  sid: 50,
  //  name: "+9拐杖",
  //  size: "S",
  //  price: 2000,
  //  qty: 1
  // }]
  const { pro, plusOne, minusOne, delOne, moneyFormat } =
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
      {pro && (
        <div className={`${styled.dtWrap} ${styled.pro}`}>
          <div className={styled.outWrap}>
            {pro.map((el, i) => {
              return (
                <div
                  className={
                    del.includes(el.sid)
                      ? `${styled.wrapChange}`
                      : `${styled.wrap}`
                  }
                  key={`${el.sid}+${el.size}`}
                >
                  <div className={styled.wrapRight}>
                    <div className={styled.roomText}>
                      <h2>{el.name}</h2>
                      {el.size && (
                        <p>
                          尺寸：
                          {el.size}
                        </p>
                      )}

                      <p>單價：{moneyFormat(el.price)}</p>
                      <div className={styled.people}>
                        <p>數量：</p>
                        <div className={styled.qty}>
                          {el.quantity <= 1 ? (
                            <button
                              onClick={() => {
                                minusOne(el.sid, el.size, el.price)
                              }}
                              disabled
                            >
                              －
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                minusOne(el.sid, el.size, el.price)
                              }}
                            >
                              －
                            </button>
                          )}
                          <button>{el.quantity}</button>
                          <button
                            onClick={() => {
                              plusOne(el.sid, el.size, el.price)
                            }}
                          >
                            ＋
                          </button>
                        </div>
                      </div>
                      <p>總金額：{moneyFormat(el.price * el.quantity)}</p>
                    </div>
                    <div className={styled.roomImg}>
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
                  <i
                    className="fa-regular fa-trash-can"
                    onClick={() => {
                      const t = el.quantity * el.price
                      change(el, i)
                      setTimeout(() => {
                        delOne(el.sid, el.size, t)
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

export default CartDetailPro
