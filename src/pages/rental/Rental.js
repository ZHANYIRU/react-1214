import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import RentalProduct from './components/RentalProduct'
import rentalcss from '../../styles/rental-scss/rentalProducts.module.scss'

function Rental(props) {
  const [input, setInput] = useState('')
  let [data, setData] = useState(null)

  const rental_url = 'http://localhost:3001/rental/api'

  async function getList() {
    const response = await axios.get(rental_url)
    console.log(response)
    setData(response.data.rows)
  }

  const searchURL = '待補'

  const search = '待補'
  useEffect(() => {
    getList()
  }, [])
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#d9ded9' }}>
      <Search
        search={() => {
          search(searchURL)
        }}
        setInput={setInput}
      />
      <div className={rentalcss.rentalProducts}>
        {data &&
          data.map((d) => {
            return <RentalProduct data={d} />
          })}
      </div>
    </div>
  )
}

export default Rental

// function Rental(props) {
//   const [input, setInput] = useState('')
//   let [data, setData] = useState(null)
//   const auth = '563492ad6f9170000100000156fd37fe87c840a8a6f6fb79fa3e3a36'
//   const initialURL = 'https://api.pexels.com/v1/curated?page=1&per_page=16'

//   const searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`

//   const search = async (url) => {
//     const dataFetch = await fetch(url, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         Authorization: auth,
//       },
//     })

//     let parseData = await dataFetch.json()
//     setData(parseData.photos)
//   }

//   useEffect(() => {
//     search(initialURL)
//   }, [])
//   return (
//     <div style={{ minHeight: '100vh', backgroundColor: '#d9ded9' }}>
//       <Search
//         search={() => {
//           search(searchURL)
//         }}
//         setInput={setInput}
//       />
//       <div className={rentalcss.rentalProducts}>
//         {data &&
//           data.map((d) => {
//             return <RentalProduct data={d} />
//           })}
//       </div>
//     </div>
//   )
// }

// export default Rental
