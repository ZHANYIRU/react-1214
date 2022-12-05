import styled from '../../../styles/cart-scss/OK.module.scss'
import ProCartContext from '../../../contexts/ProCartContext'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useContext } from 'react'
function OkOrder({ forOk, setWriteUser }) {
  const { cleanCart, moneyFormat } = useContext(ProCartContext)
  const navigate = useNavigate()
  useEffect(() => {
    cleanCart()
    //清空收件人資料
    setWriteUser({
      ...setWriteUser,
      name: '',
      mobile: 0,
      address: '',
      email: '',
      text: '',
    })
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div className={styled.empty1}></div>
      <p className={styled.ok}>成功下訂，感謝您的訂購！</p>
      <div className={styled.okCard}>
        <div className={styled.okText}>
          <h2>訂單編號：{forOk.orderN}</h2>
          <p>配送方式：{forOk.family}</p>
          <p>付款方式：{forOk.pay}</p>
          <p>訂單日期：{forOk.orderDay}</p>
          <p>訂單總額：{moneyFormat(forOk.totalPrice)}</p>
        </div>
        <div className={styled.okBottom}>
          <Link to="/" className={styled.forHome}>
            回首頁
          </Link>
          <div
            className={styled.lookOrder}
            onClick={() => {
              navigate('/member/orders')
            }}
          >
            查看我的訂單
          </div>
        </div>
      </div>
    </>
  )
}

export default OkOrder
