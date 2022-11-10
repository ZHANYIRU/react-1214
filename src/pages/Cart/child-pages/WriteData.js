import styled from '../../../styles/cart-scss/writeData.module.scss'
import { useEffect } from 'react'
function WriteData({ step, setStep }) {
  //進這元件的時候，滾動到視窗最上面
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className={styled.writeWrap}>
      填寫資料
      <button
        onClick={() => {
          setStep(step - 1)
        }}
      >
        上一步
      </button>
      <button
        onClick={() => {
          setStep(step + 1)
        }}
      >
        確認結帳
      </button>
    </div>
  )
}

export default WriteData
