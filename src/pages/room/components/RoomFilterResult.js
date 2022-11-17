import style from '../../../styles/room-scss/roomFilterResult.module.scss'

function RoomFilterResult() {
  return (
    <>
      <div className={style.cardWrap}>
        <div className={style.cardImg}></div>
        <div className={style.detail}>
          <div className={style.title}>
            <div className={style.roomName}>南庄小美家民宿</div>
            <div className={style.star}>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <span className={style.commentQTY}>(2)</span>
            </div>
          </div>
          <div className={style.icon}>
            <div className={style.location}>
              <span>
                <i className="fa-solid fa-map-location-dot"></i>
              </span>
              <span>苗栗</span>
              <span>南庄區</span>
            </div>
            <div className={style.mountain}>
              <span>
                <i className="fa-solid fa-mountain"></i>
              </span>
              <span>加里山</span>
            </div>
          </div>
          <div className={style.facility}>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1664/1664734.png"
                alt=""
              />
              <span>淋浴</span>
            </div>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/911/911511.png"
                alt=""
              />
              <span>空調</span>
            </div>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1664/1664734.png"
                alt=""
              />
              <span>淋浴</span>
            </div>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/911/911511.png"
                alt=""
              />
              <span>空調</span>
            </div>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1664/1664734.png"
                alt=""
              />
              <span>淋浴</span>
            </div>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/911/911511.png"
                alt=""
              />
              <span>空調</span>
            </div>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1664/1664734.png"
                alt=""
              />
              <span>淋浴</span>
            </div>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/911/911511.png"
                alt=""
              />
              <span>空調</span>
            </div>
          </div>
          <div className={style.text}>
            <span>距離登山口：{'15'}公里</span>
            <span>地址：353苗栗縣南庄鄉蓬萊村42份7-6號</span>
            <span>電話：0919 822 379</span>
          </div>
          <div className={style.bottom}>
          <div className={style.price}>金額：{'650'}/人</div>
          <button>查看詳情</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default RoomFilterResult
