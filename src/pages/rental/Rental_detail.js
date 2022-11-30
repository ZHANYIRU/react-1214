import React, { useEffect, useState, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styled from '../../styles/rental-scss/rentalDetail.module.scss'
import Commnent from './components/Commnent'
import dayjs from 'dayjs'
import ProCartContext from '../../contexts/ProCartContext'
import RentalLikeCard from './components/RentalLikeCard'
import { Link } from 'react-router-dom'

const Rental_detail = () => {
  const { addRenCart } = useContext(ProCartContext)
  const picRef = useRef()
  const testData = [0, 1, 2, 3, 4, 5]
  const { sid } = useParams()
  console.log(sid)
  const [checkPic, setCheckPic] = useState(0)
  //裝商品資料
  const [Detail, setDetail] = useState()
  console.log(Detail)
  //介紹或評論狀態
  const [productIntroduce, setProductIntroduce] = useState(true)

  //設定天數格式化資料
  const dateFormat = 'YYYY-MM-DD'
  const today = dayjs().format(dateFormat)
  // const tomorrow = dayjs(Date.now() + 24 * 3600 * 1000).format(dateFormat)
  const tomorrow = dayjs(today).add(1, 'day').format(dateFormat)
  const dayMax = dayjs(Date.now() + 14 * 24 * 3600 * 1000).format(dateFormat)
  //設定天數 要送去給購物車 ！！！！！！！！！！！！！！！！！！！！！！！
  const [day, setDay] = useState({
    borrowDay: today,
    backDay: tomorrow,
  })
  //數量狀態 要送去給購物車 ！！！！！！！！！！！！！！！！！！！！！！！
  const [number, setNumber] = useState(1)
  //設定租借費用 要送去給購物車 ！！！！！！！！！！！！！！！！！！！！！！！
  const [borrowMoney, setBorrowMoney] = useState(0)

  //設定店點資料
  const [store, setStore] = useState([])

  //設定給購物車的店點資料 要送去給購物車 ！！！！！！！！！！！！！！！！！！！！！！！
  const [cartStore, setCartStore] = useState({
    borrowStore: '大安店',
    backStore: '大安店',
    borow_fee_level: 0,
    back_fee_level: 0,
  })

  //跨店運費狀態 要送去給購物車 ！！！！！！！！！！！！！！！！！！！！！！！
  const [deliveryFee, setDeliveryFee] = useState(0)

  //評論資料
  // const [commnentData, setDommnentData] = useState([])
  //下面是利用useEffect去要資料
  const rental_url = `http://localhost:3001/rental/getDetailData/${sid}`
  //要商品資料
  async function get_rental_detail() {
    const response = await axios.get(rental_url)
    // console.log(response.data.rows[0])
    setDetail(response.data.rows[0])
    setBorrowMoney(response.data.rows[0].rental_price)
  }
  const store_url = `http://localhost:3001/rental/getstore`

  async function get_store() {
    const response = await axios.get(store_url)
    console.log(response.data.rows)
    setStore(response.data.rows)
  }

  const [like, setLike] = useState({})
  const like_url = `http://localhost:3001/rental/getLike`
  async function get_Like() {
    const response = await axios.get(like_url)
    console.log(response.data.rows)
    setLike(response.data.rows)
  }
  useEffect(() => {
    get_rental_detail()
    get_store()
    get_Like()
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
                    ref={picRef}
                  />
                </div>
                <div className={styled.smallpic}>
                  {Detail.rental_img &&
                    Detail.rental_img.map((pic, i) => {
                      if (i < 3) {
                        return (
                          <div
                            key={i}
                            style={{
                              border: `${
                                checkPic === i ? '1px solid black' : 'none'
                              }`,
                            }}
                          >
                            <img
                              src={`http://localhost:3001/rental_img/${Detail.rental_img[i]}`}
                              alt=""
                              onClick={() => {
                                picRef.current.setAttribute(
                                  'src',
                                  `http://localhost:3001/rental_img/${Detail.rental_img[i]}`
                                )
                                setCheckPic(i)
                              }}
                            />
                          </div>
                        )
                      }
                    })}
                </div>
              </div>
              <div className={styled.right}>
                <div className={styled.flex}>
                  <h2>商品名稱：{Detail.rental_name}</h2>
                </div>

                <div className={styled.flex}>
                  <div>
                    <span className={styled.rental_price}>
                      每日租金：{Detail.rental_price}
                    </span>
                  </div>
                  <div>
                    <span>品牌：{Detail.rental_brand}</span>
                  </div>
                </div>

                {/* 租借日設定 */}
                <div className={styled.flex}>
                  <div>
                    <span>租借起始日：</span>
                    <input
                      type="date"
                      min={today}
                      max={dayMax}
                      value={day.borrowDay}
                      onChange={(e) => {
                        const changeDay = Date.parse(e.currentTarget.value)
                        setDay({
                          ...day,
                          borrowDay: dayjs(changeDay).format(dateFormat),
                        })

                        setBorrowMoney(
                          (Detail.rental_price *
                            number *
                            (Date.parse(day.backDay) - changeDay)) /
                            86400000
                        )
                      }}
                    />
                  </div>
                  {/* 歸還日設定 */}
                  <div>
                    <span>租借歸還日：</span>
                    <input
                      type="date"
                      min={tomorrow}
                      max={dayMax}
                      value={day.backDay}
                      onChange={(e) => {
                        const changeDay = Date.parse(e.currentTarget.value)
                        setDay({
                          ...day,
                          backDay: dayjs(changeDay).format(dateFormat),
                        })

                        setBorrowMoney(
                          (Detail.rental_price *
                            number *
                            (changeDay - Date.parse(day.borrowDay))) /
                            86400000
                        )
                      }}
                    />
                  </div>
                </div>
                {/* 取件跟歸還店點設定 */}
                <div className={styled.flex}>
                  <div>
                    <span>取件店點：</span>
                    <select
                      onChange={(e) => {
                        const store_value = e.target.value.split(',')
                        const new_store = {
                          ...cartStore,
                          borrowStore: store_value[0],
                          borow_fee_level: store_value[1],
                        }
                        console.log(store_value)
                        setCartStore(new_store)
                        setDeliveryFee(
                          60 *
                            Math.abs(cartStore.back_fee_level - store_value[1])
                        )
                      }}
                    >
                      {store.length !== 0 &&
                        store.map((e, i) => {
                          return (
                            <option
                              value={[e.store_name, e.delivery_fee_level]}
                              key={i}
                            >
                              {e.store_name}
                            </option>
                          )
                        })}
                    </select>
                  </div>
                  <div>
                    <span>歸還店點：</span>
                    <select
                      onChange={(e) => {
                        const store_value = e.target.value.split(',')
                        const new_store = {
                          ...cartStore,
                          backStore: store_value[0],
                          back_fee_level: store_value[1],
                        }
                        console.log(store_value)
                        setCartStore(new_store)
                        setDeliveryFee(
                          60 *
                            Math.abs(cartStore.borow_fee_level - store_value[1])
                        )
                      }}
                    >
                      {store.length !== 0 &&
                        store.map((e, i) => {
                          return (
                            <option
                              value={[e.store_name, e.delivery_fee_level]}
                              key={i}
                            >
                              {e.store_name}
                            </option>
                          )
                        })}
                    </select>
                  </div>
                </div>
                <div className={styled.flex}>
                  <div>租借費用:＄{borrowMoney}</div>{' '}
                  <div>跨店費用:＄{deliveryFee}</div>
                </div>
                {/* 商品數量跟金額 設定 */}
                <div className={styled.flex}>
                  <div>
                    <span>商品數量：</span>
                    <button
                      onClick={() => {
                        let NewNumber = number - 1 <= 1 ? 1 : number - 1
                        setNumber(NewNumber)

                        setBorrowMoney(
                          (Detail.rental_price *
                            NewNumber *
                            (Date.parse(day.backDay) -
                              Date.parse(day.borrowDay))) /
                            86400000
                        )
                      }}
                    >
                      -
                    </button>
                    <button className={styled.middlebutton}>{number}</button>
                    <button
                      onClick={() => {
                        const NewNumber = number + 1
                        setNumber(NewNumber)
                        setBorrowMoney(
                          (Detail.rental_price *
                            NewNumber *
                            (Date.parse(day.backDay) -
                              Date.parse(day.borrowDay))) /
                            86400000
                        )
                      }}
                    >
                      ＋
                    </button>
                  </div>

                  <span>總金額：{borrowMoney + deliveryFee}</span>
                </div>
                <button
                  className={styled.addcart}
                  onClick={() => {
                    const test = [
                      Detail.sid,
                      Detail.rental_name,
                      day.borrowDay,
                      day.backDay,
                      cartStore.borrowStore,
                      cartStore.backStore,
                      deliveryFee,
                      borrowMoney,
                      number,
                      Detail.rental_img[0],
                    ]
                    console.log(test)
                    addRenCart(...test)
                  }}
                >
                  加入購物車
                </button>
              </div>
            </div>

            <div className={styled.section2}>
              <h2
                onClick={() => setProductIntroduce(true)}
                className={productIntroduce ? styled.title : styled.title1}
              >
                商品介紹
              </h2>
              <h2
                onClick={() => setProductIntroduce(false)}
                className={!productIntroduce ? styled.title : styled.title1}
              >
                商品評論
              </h2>
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
                {like.length > 0 &&
                  like.map((e, i) => {
                    return <RentalLikeCard data={e} key={i} />
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Rental_detail
