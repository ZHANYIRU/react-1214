import styled from '../../../styles/cart-scss/BuyCart.module.scss'
function BuyCart({ step, setStep }) {
  if (step === 1) {
    return (
      <>
        <div className={styled.buyCart}>
          <div className={styled.wrap}>
            <button>繼續選購</button>
            <button
              onClick={() => {
                setStep(step + 1)
              }}
            >
              買單去
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default BuyCart
