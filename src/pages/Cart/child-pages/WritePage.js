import styled from '../../../styles/cart-scss/WritePage.module.scss'
import CheckData from '../components/CheckData'
import WriteData from '../components/WriteData'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
function WritePage({
  step,
  setStep,
  familySelect,
  setFamilySelect,
  paySelect,
  setPaySelect,
  useCoupon,
  setUseCoupon,
  same,
  setSame,
  writeUser,
  setWriteUser,
}) {
  // //填寫資料旋轉狀態
  const [rotate, setRotate] = useState({
    transform: 'rotateY(180deg)',
  })
  //write,確認按鍵狀態
  const [check, setCheck] = useState('填寫資料')
  //結帳按鈕出現與否
  const [buy, setBuy] = useState(false)
  const buyPay = () => {
    if (familySelect === '') {
      Swal.fire({
        icon: 'error',
        title: '請選擇取件方式',
        showConfirmButton: false,
        timer: 1500,
      })
      return
    }
    if (paySelect === '') {
      Swal.fire({
        icon: 'error',
        title: '請選擇付款方式',
        showConfirmButton: false,
        timer: 1500,
      })
      return
    }
    if (
      writeUser.name === '' ||
      writeUser.mobile === '' ||
      writeUser.address === '' ||
      writeUser.email === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: '請輸入完整的收件人資料',
        showConfirmButton: false,
        timer: 1500,
      })
    } else {
      setStep(step + 1)
    }
  }
  //進這元件的時候，滾動到視窗最上面
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
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
      </div>
      <div className={styled.camera}>
        <div className={styled.threeD} style={rotate}>
          <CheckData />
          <WriteData
            familySelect={familySelect}
            setFamilySelect={setFamilySelect}
            paySelect={paySelect}
            setPaySelect={setPaySelect}
            useCoupon={useCoupon}
            setUseCoupon={setUseCoupon}
            same={same}
            setSame={setSame}
            writeUser={writeUser}
            setWriteUser={setWriteUser}
          />
        </div>
      </div>
      {buy && (
        <div className={styled.goBuy}>
          <button
            onClick={() => {
              buyPay()
            }}
          >
            付款去
          </button>
        </div>
      )}
    </>
  )
}

export default WritePage
