import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import './TapPay.scss'
function getTPDirect() {
  return new Promise((resolve, reject) => {
    if (typeof window.TPDirect !== 'undefined') {
      return resolve(window.TPDirect)
    } else {
      const script = window.document.createElement('script')
      script.src = 'https://js.tappaysdk.com/sdk/tpdirect/v5.14.0'
      script.async = true
      script.onload = () => {
        if (typeof window.TPDirect !== 'undefined') {
          resolve(window.TPDirect)
        } else {
          reject(new Error('failed to load TapPay sdk'))
        }
      }
      script.onerror = reject
      window.document.body.appendChild(script)
    }
  })
}
function Tappay() {
  const a = useRef(null)
  const b = useRef(null)
  const c = useRef(null)
  const paymentSetUp = () => {
    getTPDirect().then((TPDirect) => {
      console.log(TPDirect)
      TPDirect.setupSDK(
        11327,
        'app_whdEWBH8e8Lzy4N6BysVRRMILYORF6UxXbiOFsICkz0J9j1C0JUlCHv1tVJC',
        'sandbox'
      )
      TPDirect.card.setup({
        // Display ccv field
        fields: {
          number: {
            // element: '.form-control.card-number',
            element: a.current,
            placeholder: '**** **** **** ****',
          },
          expirationDate: {
            // element: document.getElementById('tappay-expiration-date'),
            element: b.current,
            placeholder: 'MM / YY',
          },
          ccv: {
            // element: '.form-control.ccv',
            element: c.current,
            placeholder: 'ccv',
          },
        },
        styles: {
          input: {
            color: 'gray',
          },
          ':focus': {
            color: 'black',
          },
          '.valid': {
            color: 'green',
          },
        },
        // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
        isMaskCreditCardNumber: true,
        maskCreditCardNumberRange: {
          beginIndex: 6,
          endIndex: 11,
        },
      })
      TPDirect.card.onUpdate((update) => {
        console.log(update)
      })
    })
  }
  const submit = (e) => {
    e.preventDefault()
    getTPDirect().then((TPDirect) => {
      TPDirect.card.getPrime(async (result) => {
        console.log(result)
        const res = await axios.post(
          'http://localhost:3001/order/TapPay',
          result.card
        )
      })
    })
  }
  const [change, setChange] = useState({
    a: '',
    b: '',
    c: '',
  })
  useEffect(() => {
    paymentSetUp()
  }, [])
  return (
    <>
      <form style={{ width: '80%', paddingTop: '100px' }}>
        <input
          type="text"
          name="a"
          value={change.a}
          onChange={(e) => {
            setChange({ ...change, [e.target.name]: e.target.value })
          }}
        />
        <p
          className="a"
          ref={a}
          onKeyDown={(e) => {
            console.log(e.key)
          }}
          onClick={() => console.log(123)}
        ></p>
        <div className="b" ref={b}></div>
        <div className="c" ref={c}></div>
        <button
          type="submit"
          className="btn btn-default"
          onClick={(e) => {
            submit(e)
          }}
        >
          Pay
        </button>
      </form>
    </>
  )
}

export default Tappay
