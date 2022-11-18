import React from 'react'
import { useState, useEffect } from 'react'
import styled from '../../../../styles/cart-scss/cartDetail.module.scss'
function CartDetailPro() {
  const [proCart, setProCart] = useState([{}])
  const getPro = () => {
    const pro = JSON.parse(localStorage.getItem('proCart'))
    console.log('11111', pro)
    setProCart(pro)
  }
  useEffect(() => {
    getPro()
  }, [])
  return (
    <>
      {proCart.items && (
        <div className={`${styled.dtWrap} ${styled.pro}`}>
          <div className={styled.outWrap}>
            {proCart.items.map((el, i) => {
              return (
                <div className={styled.wrap}>
                  <input type="checkbox" />
                  <div className={styled.wrapRight}>
                    <div className={styled.roomText}>
                      <h2>{el.name}</h2>
                      <p>尺寸：{el.size}</p>
                      <p>單價：{el.price}</p>
                      <div className={styled.qty}>
                        <button>－</button>
                        <input type="text" value={el.qty} />
                        <button>＋</button>
                      </div>
                      <p>總金額：{el.price * el.qty}</p>
                    </div>
                    <div className={styled.roomImg}>
                      <img
                        src="https://cdn2.ettoday.net/images/4778/d4778980.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <i className="fa-regular fa-trash-can"></i>
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
