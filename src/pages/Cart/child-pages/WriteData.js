import styled from '../../../styles/cart-scss/writeData.module.scss'
function WriteData({ step, setStep }) {
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
