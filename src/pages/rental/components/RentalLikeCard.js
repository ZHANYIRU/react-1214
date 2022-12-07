import React from 'react'
import styled from '../../../styles/rental-scss/rentalLike.module.scss'
import { Link } from 'react-router-dom'
function RentalLikeCard({ data }) {
  return (
    <Link to={`/rental/${data.sid}`} style={{ width: '30.333%' }}>
      {/* 外層 */}

      <div className={styled.cardBody}>
        <div className={styled.imageContainer}>
          <img
            src={`http://localhost:3001/rental_img/${data.rental_img[0]}`}
            alt=""
          />
        </div>
        <div className={styled.rental_product_name}>
          <p>{data.rental_name}</p>
        </div>
        <div className={styled.price}>
          <p>
            金額：<span>{data.rental_price}</span>
          </p>
          <p>
            品牌：<span>{data.rental_brand}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default RentalLikeCard
