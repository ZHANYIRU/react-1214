import { useState } from 'react'
import style from '../../styles/home-scss/bird.module.scss'
function Bird() {
  const [show, setShow] = useState(false)
  return (
    <>
      <div className={style.bgc}>
        <div className={style.birdWrap}>
          <div
            className={style.imgWrap}
            onClick={() => {
              setShow(true)
            }}
          ></div>
        </div>
        {/* <div className={style.lightBox}>
          <div className={style.cardWrap}>
            <div className={style.title}>
              <span>2</span>
            </div>
            <p>
              837登山趣837登山趣837登山趣837登山趣837登山趣837登山趣837登山趣837登山趣837登山趣837登山趣837登山趣837登山趣837登山趣837登山趣837登山趣837登山趣837登山趣837登山趣837登山趣
            </p>
            <div className={style.options}>
              <label>
                <input type="radio" />
                Answer1
              </label>
              <label>
                <input type="radio" />
                Answer2
              </label>
              <label>
                <input type="radio" />
                Answer3
              </label>
            </div>
            <div className={style.buttons}>
              <button>上一題</button>
              <button>下一題</button>
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default Bird
