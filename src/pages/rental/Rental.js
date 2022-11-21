import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import RentalCard from './components/RentalCard'
import rentalcss from '../../styles/rental-scss/rentalProducts.module.scss'

function Rental(props) {
  let [data, setData] = useState(null)

  const rental_url = 'http://localhost:3001/rental/api'

  async function getList() {
    const response = await axios.get(rental_url)
    console.log(response)
    setData(response.data.rows)
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#d9ded9' }}>
      <Search setData={setData} />

      <div className={rentalcss.rentalProducts}>
        {data &&
          data.map((d) => {
            return <RentalCard data={d} />
          })}
      </div>
    </div>
  )
}

export default Rental

