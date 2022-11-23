import React from 'react'
import { useState } from 'react'
import styled from '../../../styles/product-scss/starRating.module.scss'

export default function StarRating() {
  //星星數
  const [stars, setStar] = useState(0)
  //星星Hover
  const [hoverStar, setHoverStar] = useState(0)
  return (
    <div className={styled.starRating}>
      {[...Array(5)].map((star, index) => {
        index += 1
        return (
          <button
            type="button"
            key={index}
            className={
              index <= (hoverStar || stars) ? `${styled.on}` : `${styled.off}`
            }
            onClick={() => setStar(index)}
            onMouseEnter={() => setHoverStar(index)}
            onMouseLeave={() => setHoverStar(star)}
          >
            <span className="star">&#9733;</span>
          </button>
        )
      })}
    </div>
  )
}
