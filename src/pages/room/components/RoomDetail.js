import style from '../../../styles/room-scss/roomDetail.module.scss'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import RoomSelectBar from './RoomSelectBar'

function RoomDetail({ detail }) {
  return (
    <>
      <div className={style.cardWrap}>
        <div className={style.top}>
          <div className={style.title}>
            <div className={style.roomName}>{detail.room_name}</div>
            <div className={style.star}>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <span className={style.commentQTY}>(2)</span>
            </div>
          </div>
          <div className={style.sideTitle}>
            <div className={style.icon}>
              <div className={style.location}>
                <span>
                  <i className="fa-solid fa-map-location-dot"></i>
                </span>
                <span>{detail.name}</span>
              </div>
              <div className={style.mountain}>
                <span>
                  <i className="fa-solid fa-mountain"></i>
                </span>
                <span>{detail.mountain_name}</span>
                <span>{detail.height}m</span>
              </div>
            </div>
            <div className={style.price}>金額：${detail.room_price}/人</div>
          </div>
        </div>
        <div className={style.slideWrap}>
          <div className={style.slide}>
            <div className={style.imgs}>
              <Carousel
                showArrows={false}
                showIndicators={false}
                showStatus={false}
              >
                <div className={style.img}>
                  <img
                    src="https://www.hotelscombined.com.tw/himg/02/a1/b6/expediav2-3633483-2c7545-091043.jpg"
                    alt=""
                  />
                </div>
                <div className={style.img}>
                  <img
                    src="https://z1.muscache.cn/pictures/2caace88-ab77-498a-9d4e-23777b70b1bc.jpg"
                    alt=""
                  />
                </div>
                <div className={style.img}>
                  <img
                    src="https://chyfun.com/wp-content/uploads/20190923235607_35.webp"
                    alt=""
                  />
                </div>
                <div className={style.img}>
                  <img
                    src="https://chyfun.com/wp-content/uploads/20190923235607_35.webp"
                    alt=""
                  />
                </div>
              </Carousel>
            </div>
          </div>
          {/* <div className={style.arrow}>
            <i class="fa-solid fa-chevron-left"></i>
            <i class="fa-solid fa-angle-right"></i>
          </div> */}
        </div>
        <div className={style.bottom}>
          <div className={style.switch}>
            <div className={style.intro}>介紹</div>
            <div className={style.comment}>評論（{'NUM'}）</div>
          </div>
          <div className={style.sec1}>
            <h4>營位/山莊</h4>
            <span>南庄小美家民宿</span>
            <span>營業時間：08:00 - 17:00</span>
            <span>電話：0919 822 379</span>
            <span>地址：353苗栗縣南庄鄉蓬萊村42份7-6號</span>
          </div>
          <div className={style.sec2}>
            <h4>登山口資訊</h4>
            <span>鹿場登山口</span>
            <span>住宿地點距離登山口：15 公里</span>
            <span>加里山登山口森林露營區</span>
            <span>地址：353苗栗縣南庄鄉東河村鹿場24鄰19-20號</span>
          </div>
          <div className={style.sec3}>
            <h4>提供設備</h4>
            <div className={style.facilityList}>
              <div className={style.facility}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1664/1664734.png"
                  alt=""
                />
                <div>淋浴</div>
              </div>
              <div className={style.facility}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1664/1664734.png"
                  alt=""
                />
                <div>淋浴</div>
              </div>
              <div className={style.facility}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1664/1664734.png"
                  alt=""
                />
                <div>淋浴</div>
              </div>
              <div className={style.facility}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1664/1664734.png"
                  alt=""
                />
                <div>淋浴</div>
              </div>
              <div className={style.facility}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1664/1664734.png"
                  alt=""
                />
                <div>淋浴</div>
              </div>
              <div className={style.facility}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1664/1664734.png"
                  alt=""
                />
                <div>淋浴</div>
              </div>
              <div className={style.facility}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1664/1664734.png"
                  alt=""
                />
                <div>淋浴</div>
              </div>
              <div className={style.facility}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1664/1664734.png"
                  alt=""
                />
                <div>淋浴</div>
              </div>
              <div className={style.facility}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1664/1664734.png"
                  alt=""
                />
                <div>淋浴</div>
              </div>
            </div>
          </div>
          <div className={style.sec4}>
            <h4> 取消 / 退款說明</h4>
            <p>
              ＊以下退款規定關於您的權益，為避免誤解與糾紛，請您充分了解並同意後再進行訂房。
              <br />
              訂金付款後若須退款，訂金須扣除「訂金扣款金額」與「單次退款手續費」，
              <br />
              詳細計算方式如下： 退款金額=訂金 x (1-訂金扣款百分比) -
              單次退款手續費（NT$100）
              <br />
              入住日前7日取消可全額退款訂金扣款百分比規定如下：
              <br />
              入住日前1天（含）退房，訂金扣款100%。
              <br />
              入住日前2天（含）退房，訂金扣款90%。
              <br />
              入住日前3天（含）退房，訂金扣款75%。
              <br />
              入住日前4天（含）退房，訂金扣款60%。
              <br />
              入住日前5天（含）退房，訂金扣款45%。
              <br />
              入住日前6天（含）退房，訂金扣款30%。
              <br />
              入住日前7天（含）以前退房，訂金扣款15%。
              <br />
              入住日前8天（含）以前退房，訂金扣款0%。
              <br />
              ATM轉帳、信用卡、銀聯卡、Paypal，訂單單次退款手續費為100新台幣。
              <br />
              若遇颱風（須中央氣象局發佈陸上颱風警報）或其他重大災害，而且民宿所在縣市宣布停止上班上課，訂金就可以選擇保留，延遲住房期限（六個月內），或扣除單次退款手續費後退還。
              <br />
              因中央疫情指揮中心發佈三級因素取消，扣除單次退款手續費後退還。
              <br />
              延期相關：延期僅以一次為限，計算方式為預約住宿日期開始180日，到期恕不另行通知
            </p>
          </div>
        </div>
      </div>
      <RoomSelectBar detail={detail} />
    </>
  )
}

export default RoomDetail
