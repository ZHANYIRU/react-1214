import React, { useState } from 'react'
import axios from 'axios'
import styled from '../../../styles/rental-scss/search.module.scss'

const Search = ({ search, setData, setTotalPages }) => {
  const [input, setInput] = useState('')

  const InputHandler = (e) => {
    setInput(e.target.value)
  }

  const searchURL = 'http://localhost:3001/rental/pageApi?search='
  async function search() {
    const response = await axios.get(searchURL + `${input}`)
    console.log(response)
    setData(response.data.rows)
    setTotalPages(response.data.totalPages)
  }

  return (
    <div className={styled.search}>
      <input type="text" onChange={InputHandler} />
      <button onClick={search}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  )
}

export default Search
