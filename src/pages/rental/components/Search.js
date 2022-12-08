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
      <input type="text" onChange={InputHandler} placeholder="商品搜尋" />
      <button
        onClick={() => {
          setConditions({
            ...conditions,
            category: '',
            search: input,
            low_price: undefined,
            high_price: undefined,
            page: 1,
            order_by: '',
            brand: [],
            label: [],
          })
        }}
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  )
}

export default Search
