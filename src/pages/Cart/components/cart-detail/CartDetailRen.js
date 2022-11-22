import { useState, useContext } from 'react'
import styled from '../../../../styles/cart-scss/cartDetail.module.scss'
import ProCartContext from '../../../../contexts/ProCartContext'
function CartDetailRen() {
  const { ren, plusOne4, minusOne4, delOne4, moneyFormat } =
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
      {ren && (
        <div className={`${styled.dtWrap} ${styled.ren}`}>
          <div className={styled.outWrap}>
            {ren.map((el, i) => {
              return (
                <div
                  className={
                    del.includes(el.sid)
                      ? `${styled.wrapChange}`
                      : `${styled.wrap}`
                  }
                  key={`${el.sid}+${el.size}`}
                >
                  <input type="checkbox" />
                  <div className={styled.wrapRight} style={{ height: '250px' }}>
                    <div className={styled.roomText}>
                      <h2>{el.name}</h2>
                      <p>尺寸：Ｍ</p>
                      <p>
                        租還日期：{el.start}~{el.end}
                      </p>
                      <p>
                        租借－歸還：{el.out}-{el.back}
                      </p>
                      <p>單價：{moneyFormat(el.price)}</p>
                      <div className={styled.people}>
                        <p>數量：</p>
                        <div className={styled.qty}>
                          {el.qty <= 1 ? (
                            <button
                              onClick={() => {
                                minusOne4(el.sid, el.size, el.price)
                              }}
                              disabled
                            >
                              －
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                minusOne4(el.sid, el.size, el.price)
                              }}
                            >
                              －
                            </button>
                          )}
                          <button>{el.qty}</button>
                          <button
                            onClick={() => {
                              plusOne4(el.sid, el.size, el.price)
                            }}
                          >
                            ＋
                          </button>
                        </div>
                      </div>
                      <p>總金額：{moneyFormat(el.price * el.qty)}</p>
                    </div>
                    <div className={styled.roomImg}>
                      <img
                        src="https://vencedor888.com/upload/1000_86.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <i
                    className="fa-regular fa-trash-can"
                    onClick={() => {
                      const t = el.qty * el.price
                      change(el, i)
                      setTimeout(() => {
                        delOne4(el.sid, el.size, t)
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

export default CartDetailRen
