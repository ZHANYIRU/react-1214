import React from 'react'
import styled from '../../../styles/product-scss/totop.module.scss'
export default function ToTop() {
  return (
    <>
      <div
        className={styled.toTop}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        }}
      >
        <div className={styled.arrow}>
          <div className={styled.tt1}></div>
          <div className={styled.tt2}></div>
        </div>
      </div>
    </>
  )
}
