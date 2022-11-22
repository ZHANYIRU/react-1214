import React from 'react'
import rentalcss from '../../../styles/rental-scss/rentalProducts.module.scss'
import { Link } from 'react-router-dom'
import Rental_detail from '../Rental_detail'

function RentalCard({ data }) {
  console.log(data)
  return (
    <Link to={`/rental/${data.rental_product_sid}`}>
      {/* 外層 */}
      <div className={rentalcss.rentalProduct}>
        <div className={rentalcss.cardBody}>
          <div className={rentalcss.imageContainer}>
            <img
              src={`http://localhost:3001/imgs/rental/${data.rental_img}`}
              alt=""
            />
          </div>
          <div className={rentalcss.rental_product_name}>
            <p>{data.rental_product_name}</p>
          </div>
          <div className={rentalcss.price}>
            <p>
              金額：<span>{data.rental_price}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RentalCard

// import React from 'react'
// import rentalcss from '../../../styles/Rental/rentalProducts.module.scss'

// function RentalProduct({ data }) {
//   return (
//     <div className={rentalcss.rentalProduct}>
//       <div className={rentalcss.imageContainer}>
//         <img src={data.src.large} alt="" />
//       </div>
//       <p>商品名稱：{data.photographer}</p>
//       <p>價格：$100</p>
//     </div>
//   )
// }

// export default RentalProduct
