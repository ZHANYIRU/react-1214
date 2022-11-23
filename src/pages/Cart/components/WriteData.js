import React from 'react'
import { useState, useContext, useEffect } from 'react'
import MemberContext from '../../../contexts/MemberContext'
import styled from '../../../styles/cart-scss/writeData.module.scss'
function WriteData() {
  const { data } = useContext(MemberContext)
  const [familySelect, setFamilySelect] = useState('')
  const [paySelect, setPaySelect] = useState('')
  const [writeUser, setWriteUser] = useState({
    name: '',
    mobile: 0,
    address: '',
    email: '',
    text: '',
  })
  const [memberUser, setMemberUser] = useState({
    name: '',
    mobile: 0,
    address: '',
    email: '',
    text: '',
  })
  const family = ['宅配', '郵寄']
  const pay = ['ATM匯款', 'LINE PAY', '信用卡']
  const handle = (e) => {
    setWriteUser({ ...writeUser, [e.target.name]: e.target.value })
  }
  const getUserInfo = () => {
    setMemberUser({
      ...memberUser,
      name: data.name,
      mobile: data.mobile,
      address: data.address,
      email: data.email,
    })
  }
  useEffect(() => {
    getUserInfo()
  }, [])
  return (
    <>
      <div className={styled.writeWrap}>
        <h2>填寫資料</h2>
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
        <div className={styled.buyPeople}>
          <h2>訂購人資料</h2>
          <div className={styled.buyInput}>
            <div>
              <label htmlFor="">姓名</label>
              <input
                type="text"
                name="name"
                value={memberUser.name}
                onChange={() => {}}
              />
            </div>
            <div>
              <label htmlFor="">手機號碼</label>
              <input
                type="text"
                name="mobile"
                value={memberUser.mobile}
                onChange={() => {}}
              />
            </div>
            <div>
              <label htmlFor="">地址</label>
              <input
                type="text"
                name="address"
                value={memberUser.address}
                onChange={() => {}}
              />
            </div>
            <div>
              <label htmlFor="">電子郵件</label>
              <input
                type="text"
                name="email"
                value={memberUser.email}
                onChange={() => {}}
              />
            </div>
            <div>
              <label htmlFor="">備註</label>
              <textarea id="" rows="5" name="text" />
            </div>
          </div>
        </div>
        <div className={styled.receive}>
          <div className={styled.text}>
            <h2>收件人資料</h2>
            <input type="checkbox" id="receive" />
            <label htmlFor="receive">同訂購人</label>
          </div>
          <div className={styled.receiveInput}>
            <div>
              <label htmlFor="">姓名</label>
              <input
                value={writeUser.name}
                type="text"
                name="name"
                onChange={(e) => {
                  handle(e)
                }}
              />
            </div>
            <div>
              <label htmlFor="">手機號碼</label>
              <input
                value={writeUser.mobile}
                type="text"
                name="mobile"
                onChange={(e) => {
                  handle(e)
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
                  handle(e)
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
                  handle(e)
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
                  handle(e)
                }}
              />
            </div>
          </div>
        </div>
        {/* <div className={styled.catchBox}>
          <h3>收貨方式</h3>
          <div className={styled.home}>
            <input type="radio" id="home" />
            <label htmlFor="home">宅配地址</label>
            <input type="radio" id="family" />
            <label htmlFor="family">全家店到店</label>
          </div>
        </div> */}
        <div className={styled.area}>
          <div className={styled.address}>
            <h3>地址</h3>
            <select name="" id="">
              <option value="">新北市</option>
            </select>
            <select name="" id="">
              <option value="">木柵區</option>
            </select>
          </div>
          <input type="text" />
        </div>
      </div>
    </>
  )
}

export default WriteData
