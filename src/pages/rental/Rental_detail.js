import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styled from '../../styles/rental-scss/rentalDetail.module.scss'
import Commnent from './components/Commnent'
import dayjs from 'dayjs'

const Rental_detail = () => {
  const testData = [0, 1, 2, 3, 4, 5]
  const { sid } = useParams()
  console.log(sid)
  //裝商品資料
  const [Detail, setDetail] = useState()
  console.log(Detail)
  //介紹或評論狀態
  const [productIntroduce, setProductIntroduce] = useState(true)

  const dateFormat = 'YYYY-MM-DD'
  const today = dayjs().format(dateFormat)
  const tomorrow = dayjs(Date.now() + 24 * 3600 * 1000).format(dateFormat)
  const dayMax = dayjs(Date.now() + 14 * 24 * 3600 * 1000).format(dateFormat)
  //設定天數
  const [day, setDay] = useState({
    today,
    backDay: tomorrow,
  })

  //評論資料
  const [commnentData, setDommnentData] = useState([])

  //下面是利用useEffect去要資料
  const rental_url = `http://localhost:3001/rental/getDetailData/${sid}`

  async function get_rental_detail() {
    const response = await axios.get(rental_url)
    console.log(response.data.rows[0])
    setDetail(response.data.rows[0])
  }

  useEffect(() => {
    get_rental_detail()
  }, [])

  return (
    <>
      {Detail && (
        <>
          <div className={styled.empty}></div>

          <div className={styled.container}>
            <div className={styled.section1}>
              <div className={styled.left}>
                <div className={styled.imgmain}>
                  <img
                    src={`http://localhost:3001/rental_img/${Detail.rental_img[0]}`}
                    alt=""
                  />
                </div>
                <div className={styled.smallpic}>
                  <div>
                    <img
                      src={`http://localhost:3001/rental_img/${Detail.rental_img[0]}`}
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src={`http://localhost:3001/rental_img/${Detail.rental_img[1]}`}
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src={`http://localhost:3001/rental_img/${Detail.rental_img[2]}`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className={styled.right}>
                <h2>商品名稱：{Detail.rental_name}</h2>
                <p>每日租金：{Detail.rental_price}</p>
                <div className={styled.flex}>
                  <div>
                    <span>租借起始日：</span>

                    {/* <select name="" id="">
                      <option value="">請選擇</option>
                      <option value="">請選擇一</option>
                    </select> */}
                    <input
                      type="date"
                      min={day.today}
                      max={dayMax}
                      value={day.today}
                      onChange={(e) => {
                        setDay({ ...day, today: e.currentTarget.value })
                      }}
                    />
                  </div>
                  <div>
                    <span>租借歸還日：</span>
                    <input
                      type="date"
                      min={day.backDay}
                      max={dayMax}
                      value={day.backDay}
                      onChange={(e) => {
                        setDay(...day, { backDay: e.target.value })
                      }}
                    />
                  </div>
                </div>
                <div className={styled.flex}>
                  <div>
                    <span>取件店點：</span>
                    <select name="" id="">
                      <option value="">請選擇</option>
                      <option value="">大安店</option>
                      <option value="">八德店</option>
                      <option value="">台南店</option>
                      <option value="">花蓮店</option>
                    </select>
                  </div>
                  <div>
                    <span>歸還店點：</span>
                    <select name="" id="">
                      <option value="">請選擇</option>
                      <option value="">大安店</option>
                      <option value="">八德店</option>
                      <option value="">台南店</option>
                      <option value="">花蓮店</option>
                    </select>
                  </div>
                </div>
                <div className={styled.flex}>
                  <div>租借費用:＄{Detail.rental_price}</div>{' '}
                  <div>跨店費用:＄1200</div>
                </div>
                <div className={styled.flex}>
                  <div>
                    <span>商品數量：</span>
                    <button>-</button>
                    <button className={styled.middlebutton}>1</button>
                    <button>＋</button>
                  </div>

                  <span>總金額：</span>
                </div>
                <button className={styled.addcart}>加入購物車</button>
              </div>
            </div>

            <div className={styled.section2}>
              <h2
                onClick={() => setProductIntroduce(true)}
                className={styled.title}
                // className={productIntroduce? {styled.title}:{styled.title1}
              >
                商品介紹
              </h2>
              <h2 onClick={() => setProductIntroduce(false)}>商品評論</h2>
            </div>

            {productIntroduce && (
              <div className={styled.section3}>
                <div>
                  <h3>商品規格</h3>
                  <p>
                    規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格
                  </p>
                </div>
                <div>
                  <h3>特色說明</h3>
                  <p>
                    規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格
                  </p>
                </div>
              </div>
            )}

            {!productIntroduce && (
              <div className={styled.sectionCommnent}>
                <div className={styled.star}>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className={styled.commnentCardBox}>
                  {testData.map((v, i) => {
                    return <Commnent key={i} />
                  })}
                </div>
              </div>
            )}

            <div className={styled.section4}>
              <h3>猜你喜歡</h3>
              <div className={styled.cardbox}>
                <div className={styled.card}>
                  <div className={styled.imgwrap}>
                    <img
                      src="http://localhost:3001/imgs/rental/b1aaf36de607b30fbe5cc07515339236.jpg"
                      alt=""
                    />
                  </div>
                  <p>nike長毛象經典登山鞋好好看喔大家快來買</p>
                  <p>金額：3,960</p>
                </div>
                <div className={styled.card}>
                  <div className={styled.imgwrap}>
                    <img
                      src="http://localhost:3001/imgs/rental/b1aaf36de607b30fbe5cc07515339236.jpg"
                      alt=""
                    />
                  </div>
                  <p>nike長毛象經典登山鞋好好看喔大家快來買</p>
                  <p>金額：3,960</p>
                </div>
                <div className={styled.card}>
                  <div className={styled.imgwrap}>
                    <img
                      src="http://localhost:3001/imgs/rental/b1aaf36de607b30fbe5cc07515339236.jpg"
                      alt=""
                    />
                  </div>
                  <p>nike長毛象經典登山鞋好好看喔大家快來買</p>
                  <p>金額：3,960</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Rental_detail
