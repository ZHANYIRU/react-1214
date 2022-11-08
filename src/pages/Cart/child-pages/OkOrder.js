import styled from '../../../styles/cart-scss/OK.module.scss'

function OkOrder(props) {
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
        <div className={styled.lookOrder}>查看我的訂單</div>
      </div>
    </>
  )
}

export default OkOrder
