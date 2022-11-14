import styled from '../../../styles/cart-scss/WritePage.module.scss'
import CheckData from '../components/CheckData'
import WriteData from '../components/WriteData'
import { useEffect, useState } from 'react'
function WritePage({ step, setStep }) {
  //旋轉狀態
  const [rotate, setRotate] = useState({
    transform: 'rotateY(180deg)',
  })
  //write,確認按鍵狀態
  const [check, setCheck] = useState('填寫資料')
  //結帳按鈕出現與否
  const [buy, setBuy] = useState(false)
  //進這元件的時候，滾動到視窗最上面
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div className={styled.btnGroup}>
        <button
          onClick={() => {
            setStep(step - 1)
          }}
        >
          上一步
        </button>
        <button
          onClick={() => {
            if (rotate.transform === 'rotateY(180deg)') {
              setRotate({ ...rotate, transform: 'rotateY(360deg)' })
            } else {
              setRotate({ ...rotate, transform: 'rotateY(180deg)' })
            }
            if (check === '填寫資料') {
              setCheck('確認商品')
              setBuy(true)
            } else {
              setCheck('填寫資料')
              setBuy(false)
            }
          }}
        >
          {check}
        </button>

        {buy && (
          <button
            onClick={() => {
              setStep(step + 1)
            }}
          >
            付款去
          </button>
        )}
      </div>
      <div className={styled.camera}>
        <div className={styled.threeD} style={rotate}>
          <CheckData />
          <WriteData />
        </div>
      </div>
    </>
  )
}

export default WritePage
