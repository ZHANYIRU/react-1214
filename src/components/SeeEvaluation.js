import { useContext } from 'react'
import styled from '../styles/order-scss/OrderNum.module.scss'
import ProCartContext from '../contexts/ProCartContext'
import MemberContext from '../contexts/MemberContext'
import dayjs from 'dayjs'
function SeeEvaluation({ el }) {
  const { lookLightBox, setLookLightBox, setStar } = useContext(ProCartContext)
  const { data } = useContext(MemberContext)
  const photo = (el) => {
    let img
    if (el.product_img) {
      img = `http://localhost:3001/imgs/zx/${el.product_img}`
    }
    if (el.room_img) {
      img = `http://localhost:3001/room_img/${el.room_img}`
    }
    if (el.rental_img) {
      img = `http://localhost:3001/rental_img/${el.rental_img}`
    }
    if (el.mainImage) {
      img = `http://localhost:3001/room_img/${el.mainImage}`
    }
    return img
  }
  return (
    <div
      className={styled.lightBgc}
      onClick={(e) => {
        setStar(1)
        setLookLightBox(!lookLightBox)
      }}
      key={el.order_sid}
    >
      <div
        className={styled.lightbox}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className={styled.lightName}>
          <div className={styled.lightImg}>
            <img src={photo(el)} alt="" />
          </div>
          <p>{el.product_name || el.rental_name || el.name || el.room_name}</p>
        </div>
        <div className={styled.lookMember}>
          <div className={styled.memberLeft}>
            <div className={styled.memImgWrap}>
              {data && data.avatar ? (
                <img
                  src={`http://localhost:3001/uploads/avatar_${data.avatar}`}
                  alt="avatar"
                ></img>
              ) : (
                <img
                  src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
                  alt="postImg"
                ></img>
              )}
            </div>
            <div className={styled.memberText}>
              <p>{data && data.nickname} 銀級玩家</p>
              <span>{dayjs(el.messageTime).format('YYYY-MM-DD')}</span>
            </div>
          </div>
          <div className={styled.starRating}>
            {[...Array(5)].map((star, index) => {
              const totalStars = el.star
              index += 1
              return (
                <p
                  key={index}
                  className={
                    index <= totalStars ? `${styled.on}` : `${styled.off}`
                  }
                >
                  <span className="star">&#9733;</span>
                </p>
              )
            })}
          </div>
        </div>
        <div className={styled.lookBottom}>
          <p>{el.message}</p>
          <button
            className={styled.close}
            onClick={(e) => {
              setLookLightBox(!lookLightBox)
            }}
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  )
}

export default SeeEvaluation
