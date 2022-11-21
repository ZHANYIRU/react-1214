import React, { useState } from 'react'
import axios from 'axios'
import styled from '../../../styles/rental-scss/search.module.scss'

const Search = ({ search, setData }) => {
  const [input, setInput] = useState('')

  const InputHandler = (e) => {
    setInput(e.target.value)
  }

  const searchURL = 'http://localhost:3001/rental/getSearchData?search='
  async function search() {
    const response = await axios.get(searchURL + `${input}`)
    console.log(response)
    setData(response.data.rows)
  }

  return (
    <div className={styled.search}>
      <input type="text" onChange={InputHandler} />
      <button onClick={search}>查詢</button>
    </div>
  )
}

export default Search
