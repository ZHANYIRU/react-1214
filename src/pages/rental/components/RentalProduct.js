import React from 'react'
import rentalcss from '../../../styles/rental-scss/rentalProducts.module.scss'
import { Link } from 'react-router-dom'

import Rental_detail from '../Rental_detail'
function RentalProduct({ data }) {
  console.log(data)
  return (
    <Link to={`/rental/${data.rental_product_sid}`} >
      <div className={rentalcss.rentalProduct}>
        <div className={rentalcss.imageContainer}>
          <img
            src={`http://localhost:3001/imgs/rental/${data.rental_img}`}
            alt=""
          />
        </div>
        <p>商品名稱：{data.rental_product_name}</p>
        <p>價格：${data.rental_price}</p>
      </div>
    </Link>
  )
}

export default RentalProduct

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
