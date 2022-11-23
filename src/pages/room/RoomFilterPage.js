import style from '../../styles/room-scss/roomFilterPage.module.scss'
import ProCartContext from '../../contexts/ProCartContext'
import { useContext } from 'react'
function RoomFilterPage() {
  const { data } = useContext(ProCartContext)
  const { roomRows } = data

  return (
    <>
      <div className={style.warp}>
        <div className={style.filter}>
          <div className={style.location}>
            <select>
              <option>苗栗縣</option>
            </select>
          </div>
          <div className={style.mountain}>
            <select>
              <option>加里山</option>
            </select>
          </div>
          <button>查詢</button>
          <span>查詢結果：{roomRows.length} 間</span>
        </div>

        <div className={style.roomCardGroup}>
          {roomRows.map((v, i) => {
            return (
              <div className={style.cardWrap} key={v.room_sid}>
                <div className={style.cardImg}></div>
                <div className={style.detail}>
                  <div className={style.title}>
                    <div className={style.roomName}>{v.room_name}</div>
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
                      <span>{v.name}</span>
                    </div>
                    <div className={style.mountain}>
                      <span>
                        <i className="fa-solid fa-mountain"></i>
                      </span>
                      <span>{v.mountain_name}</span>
                      <span>{v.height}m</span>
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
                    <div className={style.price}>金額：${v.room_price}/人</div>
                    <button>查看詳情</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default RoomFilterPage
