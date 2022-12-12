import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styled from '../../../styles/rental-scss/carousel.module.scss'
import { Link } from 'react-router-dom'

import React from 'react'
import Slider from 'react-slick'

export default function Carousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  }
  return (
    <Slider {...settings} className={styled.carouselBox}>
      <div className={styled.carouselWrap}>
        <Link to={`/rental/35`}>
          <img src="a帳篷_工作區域 1.png" alt="" />
        </Link>
      </div>

      <div className={styled.carouselWrap}>
        <Link to={`/rental/5`}>
          <img src="/b睡袋_工作區域 1.png" alt="" />
        </Link>
      </div>
      <div className={styled.carouselWrap}>
        <Link to={`/rental/249`}>
          <img src="/c電扇_工作區域 1.png" alt="" />
        </Link>
      </div>
    </Slider>
  )
}
