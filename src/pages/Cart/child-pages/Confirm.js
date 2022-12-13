import axios from 'axios'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
function Confirm() {
  const location = useLocation()
  useEffect(() => {
    const transID = new URLSearchParams(location.search).get('transactionId')
    const orderID = new URLSearchParams(location.search).get('orderId')
    if (transID) {
      axios
        .get(
          `http://localhost:3001/order/pay/confirm?transactionId=${transID}&orderId=${orderID}`
        )
        .then(async (res) => {
          window.opener.focus()
          // 通知opener(原付款視窗已付款完成)
          const event = new CustomEvent('paid', {
            detail: transID,
          })

          window.opener.document.dispatchEvent(event)
          //自己關閉視窗
          window.close()
        })
        .catch((error) => console.log(error))
    }
  }, [])
  return (
    <>
      <div style={{ width: '100%', height: '150px' }}></div>
      <div>已完成付款</div>
    </>
  )
}

export default Confirm
