import { useState, useRef } from 'react'
import style from '../../styles/home-scss/bird.module.scss'

function Bird({ show, setShow, couponData, setCouponData }) {
  //複製折扣碼 取得value
  const couponCode = useRef(null)

  //問題集
  const [question, setQuestion] = useState([
    { Q: '請問你今年幾歲', Ans: ['18歲', '25歲', '35歲'] },
    { Q: '請問你養過幾隻狗', Ans: ['1隻', '2隻', '3隻'] },
    { Q: '請問你今年幾歲', Ans: ['18歲', '25歲', '35歲'] },
  ])

  //設定目前為第幾題
  const [num, setNum] = useState(0)

  //切換下一題 ＆ 送出 按鈕
  const [btnSwitch, setBtnSwitch] = useState(false)

  //切換折扣碼頁面
  const [couponPage, setCouponPage] = useState(false)

  const coupon_id = Math.floor(Math.random() * 3)

  return (
    <>
      <div className={style.bgc}>
        <div className={style.birdWrap}>
          <div
            className={style.imgWrap}
            onClick={() => {
              setShow(true)
              console.log('test', couponData[0])
              console.log('number', coupon_id)
            }}
          ></div>
        </div>

        <div
          className={style.lightBox}
          style={{ visibility: show ? 'visible' : 'hidden' }}
        >
          <div className={style.close}>
            <i
              className="fa-solid fa-xmark"
              onClick={() => {
                setShow(false)
                setNum(0)
                setBtnSwitch(false)
                setCouponPage(false)
              }}
            ></i>
          </div>
          {!couponPage ? (
            <div className={style.cardWrap}>
              <div className={style.cardContent}>
                <div className={style.title}>
                  <span>{num + 1}</span>
                </div>
                <p>{question[num].Q}</p>
                <div className={style.options}>
                  <label>
                    <input type="radio" name={question[num].Q} />
                    {question[num].Ans[0]}
                  </label>
                  <label>
                    <input type="radio" name={question[num].Q} />
                    {question[num].Ans[1]}
                  </label>
                  <label>
                    <input type="radio" name={question[num].Q} />
                    {question[num].Ans[2]}
                  </label>
                </div>
                <div className={style.buttons}>
                  <button
                    onClick={() => {
                      if (num > 0 && num < question.length) {
                        setNum(num - 1)
                        setBtnSwitch(false)
                      }
                    }}
                    style={{ visibility: num !== 0 ? 'visible' : 'hidden' }}
                  >
                    上一題
                  </button>
                  <button
                    onClick={() => {
                      if (num < question.length - 1) {
                        setNum(num + 1)
                        if (num === 1) {
                          console.log('btn', num)
                          setBtnSwitch(true)
                        }
                      }
                      //執行送出表單 給折扣碼
                      if (num === 2) {
                        console.log('折扣碼', num)
                        setCouponPage(true)
                      }
                    }}
                  >
                    {!btnSwitch ? '下一題' : '送出'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className={style.cardWrap}>
              <div className={style.container}>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>

                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>

                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>

                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.confetti}></div>
                <div className={style.couponCard}>
                  <p>恭喜獲得優惠券</p>
                  <div className={style.coupon}>
                    <p>{couponData[coupon_id].coupon_name}</p>
                    <div className={style.copy}>
                      <span
                        ref={couponCode}
                        value={couponData[coupon_id].coupon_code}
                      >
                        {couponData[coupon_id].coupon_code}
                      </span>
                      <button
                        className={style.copyBtn}
                        onClick={() => {
                          console.log('copy', couponCode.current)
                        }}
                      >
                        複製
                      </button>
                    </div>
                  </div>
                  <div className={style.detail}>
                    <span>
                      有效期限：{couponData[coupon_id].coupon_validation}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setNum(0)
                      setShow(false)
                      setCouponPage(false)
                      setBtnSwitch(false)
                    }}
                  >
                    關閉
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Bird
