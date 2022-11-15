import styled from '../../../styles/cart-scss/OK.module.scss'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
function OkOrder(props) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <p className={styled.ok}>成功下訂，感謝您的訂購！</p>
      <div className={styled.okCard}>
        <div className={styled.okText}>
          <h2>訂單編號：20222222222</h2>
          <p>配送方式：全家大安店</p>
          <p>付款方式：ＡＴＭ匯款</p>
          <p>訂單日期：2022/12/14</p>
          <p>訂單總額：47,282</p>
        </div>
        <div className={styled.okBottom}>
          {/* <div className={styled.forHome}> */}
          <Link to="/" className={styled.forHome}>
            回首頁
          </Link>
          {/* </div> */}
          <Link to="/order" className={styled.lookOrder}>
            查看我的訂單
          </Link>
        </div>
      </div>
    </>
  )
}

export default OkOrder
