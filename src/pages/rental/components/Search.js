import React, { useState } from 'react'

import styled from '../../../styles/rental-scss/search.module.scss'

const Search = ({ search, setInput }) => {
  const InputHandler = (e) => {
    setInput(e.target.value)
  }
  return (
    <div className={styled.search}>
      <input type="text" onChange={InputHandler} />
      <button onClick={search}>查詢</button>
    </div>
  )
}

export default Search
