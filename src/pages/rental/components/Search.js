import React, { useState } from 'react'
import axios from 'axios'
import styled from '../../../styles/rental-scss/search.module.scss'

const Search = ({ conditions, setConditions }) => {
  const [input, setInput] = useState('')
  const InputHandler = (e) => {
    setInput(e.target.value)
  }
  return (
    <div className={styled.search}>
      <input type="text" onChange={InputHandler} placeholder="商品搜尋"/>
      <button
        onClick={() => {
          setConditions({ ...conditions, search: input, page: 1 })
        }}
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  )
}

export default Search
