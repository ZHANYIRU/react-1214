import React, { useState } from 'react'

const RentalFilter = () => {
  const [price, setPrice] = useState({ lowPrice: '', highPrice: '' })
  const filterPrice = (e) => {
    setPrice({ ...price, [e.target.name]: e.target.value })
  }
  return (
    <div className="rentalFilter">
      <input
        type="text"
        name="lowPrice"
        onChange={filterPrice}
        value={price.lowPrice}
      />
      到
      <input
        type="text"
        name="highPrice"
        onChange={filterPrice}
        value={price.highPrice}
      />
      <button onClick="">篩選</button>
    </div>
  )
}

export default RentalFilter
