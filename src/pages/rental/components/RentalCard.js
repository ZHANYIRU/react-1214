import React, { useContext } from 'react'
import rentalcss from '../../../styles/rental-scss/rental.module.scss'
import { Link } from 'react-router-dom'
import ProCartContext from '../../../contexts/ProCartContext'
// import Rental_detail from '../Rental_detail'

function RentalCard({ data }) {
  // console.log(data)

  const { moneyFormat } = useContext(ProCartContext)
  return (
    <div className={rentalcss.rentalProduct}>
      <Link to={`/rental/${data.sid}`}>
        <div className={rentalcss.cardBody}>
          <div className={rentalcss.imageContainer}>
            <img
              src={`http://localhost:3001/rental_img/${data.rental_img[0]}`}
              alt=""
            />
          </div>
          <div className={rentalcss.rental_product_name}>
            <p>{data.rental_name}</p>
          </div>
          <div className={rentalcss.price}>
            <p>
              金額：<span>{moneyFormat(data.rental_price)}</span>
            </p>
            <p>
              品牌：<span>{data.rental_brand}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default RentalCard
