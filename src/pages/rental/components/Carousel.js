import React from 'react'
import styled from '../../../styles/rental-scss/carousel.module.scss'
import '../../../styles/rental-scss/carousel.module.scss'

const Carousel = () => {
  const data = [
    {
      key: 1,
      src: './img/img1.jpg',
    },
    {
      key: 2,
      src: './img/img2.jpg',
    },
    {
      key: 3,
      src: './img/img3.jpg',
    },
  ]
  return (
    <>
      <div>test</div>
      {data.map((e,i) => {
        return (
          <div key={i} className={styled.slider}>
            <img width="100px" height="100px" src={e.src} alt="" />
          </div>
        )
      })}
    </>
  )
}

export default Carousel
