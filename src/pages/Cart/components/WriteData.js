import React from 'react'
import { useState, useContext, useEffect } from 'react'
import MemberContext from '../../../contexts/MemberContext'
import ProCartContext from '../../../contexts/ProCartContext'
import styled from '../../../styles/cart-scss/writeData.module.scss'
function WriteData({
  familySelect,
  setFamilySelect,
  paySelect,
  setPaySelect,
  useCoupon,
  setUseCoupon,
  same,
  setSame,
  writeUser,
  setWriteUser,
}) {
  const { data } = useContext(MemberContext)
  const { cartPrice, moneyFormat } = useContext(ProCartContext)
  //(訂購人)
  const [memberUser, setMemberUser] = useState({
    name: '',
    mobile: 0,
    address: '',
    email: '',
    text: '',
  })
  const family = ['宅配', '郵寄']
  const pay = ['ATM匯款', 'LINE PAY', '信用卡']
  const handleM = (e) => {
    setMemberUser({ ...memberUser, [e.target.name]: e.target.value })
  }
  const handleW = (e) => {
    setWriteUser({ ...writeUser, [e.target.name]: e.target.value })
  }
  //自動帶入會員資料(訂購人)
  const getUserInfo = () => {
    setMemberUser({
      ...memberUser,
      name: data.name,
      mobile: data.mobile,
      address: data.address,
      email: data.email,
    })
  }
  //優惠卷的金額
  let coupon = 0
  if (useCoupon === 'Hiking837') {
    coupon = 100
  }
  if (useCoupon === 'Hero837') {
    coupon = 80
  }
  if (useCoupon === 'Happy837') {
    coupon = 50
  }
  useEffect(() => {
    getUserInfo()
  }, [])
  return (
    <>
      <div className={styled.writeWrap}>
        <h2>填寫資料</h2>
        <div className={styled.buyPeople}>
          <h2>訂購人資料</h2>
          <div className={styled.buyInput}>
            <div>
              <label htmlFor="">姓名</label>
              <input
                type="text"
                name="name"
                value={memberUser.name}
                onChange={(e) => {
                  handleM(e)
                }}
              />
            </div>
            <div>
              <label htmlFor="">手機號碼</label>
              <input
                type="text"
                name="mobile"
                value={memberUser.mobile}
                onChange={(e) => {
                  handleM(e)
                }}
              />
            </div>
            <div>
              <label htmlFor="">地址</label>
              <input
                type="text"
                name="address"
                value={memberUser.address}
                onChange={(e) => {
                  handleM(e)
                }}
              />
            </div>
            <div>
              <label htmlFor="">電子郵件</label>
              <input
                type="text"
                name="email"
                value={memberUser.email}
                onChange={(e) => {
                  handleM(e)
                }}
              />
            </div>
            <div>
              <label htmlFor="">備註</label>
              <textarea
                rows="5"
                name="text"
                value={memberUser.text}
                onChange={(e) => {
                  handleM(e)
                }}
              />
            </div>
          </div>
        </div>
        <div className={styled.receive}>
          <div className={styled.text}>
            <h2>收件人資料</h2>
            <input
              type="checkbox"
              id="receive"
              checked={same}
              onChange={() => {
                if (!same) {
                  setWriteUser(memberUser)
                  setSame(!same)
                } else {
                  setWriteUser({
                    ...writeUser,
                    name: '',
                    mobile: 0,
                    address: '',
                    email: '',
                    text: '',
                  })
                  setSame(!same)
                }
              }}
            />
            <label htmlFor="receive">同訂購人</label>
          </div>
          <div className={styled.receiveInput}>
            <div>
              <label
                htmlFor=""
                onClick={() =>
                  setWriteUser({
                    ...writeUser,
                    name: '詹姆士',
                    mobile: '0987164777',
                    address: '台北市大安區復興南路一段',
                    email: 'buy1214@gmail.com',
                    text: '我要爬山！！',
                  })
                }
              >
                姓名
              </label>
              <input
                value={writeUser.name}
                type="text"
                name="name"
                onChange={(e) => {
                  handleW(e)
                }}
              />
            </div>
            <div>
              <label htmlFor="">手機號碼</label>
              <input
                value={writeUser.mobile ? writeUser.mobile : ''}
                type="text"
                name="mobile"
                onChange={(e) => {
                  handleW(e)
                }}
              />
            </div>
            <div>
              <label htmlFor="">地址</label>
              <input
                value={writeUser.address}
                type="text"
                name="address"
                onChange={(e) => {
                  handleW(e)
                }}
              />
            </div>
            <div>
              <label htmlFor="">電子郵件</label>
              <input
                value={writeUser.email}
                type="text"
                name="email"
                onChange={(e) => {
                  handleW(e)
                }}
              />
            </div>
            <div>
              <label htmlFor="">備註</label>
              <textarea
                value={writeUser.text}
                id=""
                rows="5"
                name="text"
                onChange={(e) => {
                  handleW(e)
                }}
              />
            </div>
          </div>
        </div>
        <div className={styled.catchPay}>
          <div className={styled.catch}>
            <span>取件方式</span>
            <select
              value={familySelect}
              onChange={(e) => {
                setFamilySelect(e.target.value)
              }}
            >
              <option value="">----請選擇----</option>
              {family.map((v, i) => {
                return (
                  <option value={v} key={i}>
                    {v}
                  </option>
                )
              })}
            </select>
          </div>
          <div className={styled.pay}>
            <span>付款方式</span>
            <select
              value={paySelect}
              onChange={(e) => {
                setPaySelect(e.target.value)
              }}
            >
              <option value="">----請選擇----</option>
              {pay.map((v, i) => {
                return (
                  <option value={v} key={i}>
                    {v}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
        <div className={styled.useCoupon}>
          <span>使用優惠卷：</span>
          <input
            value={useCoupon}
            type="text"
            name="coupon"
            onChange={(e) => setUseCoupon(e.target.value)}
          />
          <h4>
            總金額：
            <span
              style={{
                textDecoration: coupon !== 0 && 'line-through',
                color: coupon !== 0 && '#777777',
              }}
            >
              {moneyFormat(cartPrice)}
            </span>
            <span>{coupon !== 0 && moneyFormat(cartPrice - coupon)}</span>
          </h4>
        </div>
      </div>
    </>
  )
}

export default WriteData
