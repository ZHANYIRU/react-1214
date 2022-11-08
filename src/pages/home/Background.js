import styled from '../../styles/home-scss/Background.module.scss'
function Background() {
  return (
    <>
      <div className={styled.bgc}>
        <div className={`${styled.box} ${styled.div1}`}></div>
        <div className={`${styled.box} ${styled.div2}`}></div>
        <div className={`${styled.box} ${styled.div3}`}></div>
      </div>
      <div className={styled.divWrap}>
        <div className={`${styled.box} ${styled.div4}`}></div>
        <div className={`${styled.box} ${styled.div5}`}></div>
      </div>
    </>
  )
}
export default Background
