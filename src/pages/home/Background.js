import { useState, useEffect } from 'react'
import styled from '../../styles/home-scss/Background.module.scss'
// import { useState, useRef, useEffect } from 'react'
function Background({ ftr }) {
  const [off, setOff] = useState({
    backgroundPosition: 'center bottom -80px',
  })
  useEffect(() => {
    if (ftr) {
      setOff({ ...off, backgroundPosition: 'center bottom -350px' })
    } else {
      setOff({ ...off, backgroundPosition: 'center bottom -80px' })
    }
  }, [ftr])
  return (
    <>
      <div className={styled.bgc}>
        <div className={`${styled.box} ${styled.div1}`}></div>
        <div className={`${styled.box} ${styled.div2}`}></div>
        <div className={`${styled.box} ${styled.div3}`}></div>
      </div>
      <div className={styled.divWrap} style={off}>
        <div className={`${styled.box} ${styled.div4}`}></div>
        <div className={`${styled.box} ${styled.div5}`}></div>
      </div>
    </>
  )
}
export default Background
