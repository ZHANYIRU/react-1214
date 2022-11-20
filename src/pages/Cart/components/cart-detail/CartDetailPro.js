import React from 'react'
import { useContext } from 'react'
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
  const { pro, plusOne, minusOne, delOne } = useContext(ProCartContext)
  const moneyFormat = (price) => {
    let a = Number(price)
    let b = a.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })
    let c = b.split('.')
    return c[0]
  }
  return (
    <>
      {pro && (
        <div className={`${styled.dtWrap} ${styled.pro}`}>
          <div className={styled.outWrap}>
            {pro.map((el, i) => {
              return (
                <div className={styled.wrap} key={`${el.sid}+${el.size}`}>
                  <input type="checkbox" />
                  <div className={styled.wrapRight}>
                    <div className={styled.roomText}>
                      <h2>{el.name}</h2>
                      <p>尺寸：{el.size}</p>
                      <p>單價：{moneyFormat(el.price)}</p>
                      <div className={styled.people}>
                        <p>數量：</p>
                        <div className={styled.qty}>
                          {el.qty <= 1 ? (
                            <button
                              onClick={() => {
                                minusOne(el.sid, el.size)
                              }}
                              disabled
                            >
                              －
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                minusOne(el.sid, el.size)
                              }}
                            >
                              －
                            </button>
                          )}
                          <button>{el.qty}</button>
                          <button
                            onClick={() => {
                              plusOne(el.sid, el.size)
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
                        src="https://cdn2.ettoday.net/images/4778/d4778980.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <i
                    className="fa-regular fa-trash-can"
                    onClick={() => {
                      delOne(el.sid, el.size)
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
