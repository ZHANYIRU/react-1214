import { useState } from 'react'
import Background from './Background'
import Main from './Main'
import style from '../../styles/home-scss/csService.module.scss'
import AI from '../rental/AI'

function Home() {
  const [ftr, setFtr] = useState(false)
  const [cs, setCs] = useState(false)

  return (
    <>
      <Background ftr={ftr} />
      <Main setFtr={setFtr} />
      <div className={style.csService}>
        <div className={style.fake}>
          <img
            src="/img/csIcon.png"
            alt=""
            onClick={() => {
              if (cs) {
                setCs(false)
              } else {
                setCs(true)
              }
            }}
          />
        </div>
        {cs && (
          <div className={style.csWrap}>
            <AI cs={cs} setCs={setCs} />
          </div>
        )}
      </div>
    </>
  )
}

export default Home
