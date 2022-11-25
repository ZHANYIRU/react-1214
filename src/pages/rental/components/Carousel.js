import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styled from '../../../styles/rental-scss/carousel.module.scss'

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
        <img
          src="https://cs-b.ecimg.tw/items/DEBQ4PA900C3OD9/000001_1668392962.jpg"
          alt=""
        />
      </div>
      <div className={styled.carouselWrap}>
        <img
          src="https://media.vogue.com.tw/photos/6287573b68b331917429c0a7/master/w_1600%2Cc_limit/%25E5%258D%2597%25E6%258A%2595%25E5%25B3%2587%25E5%25B5%2590%25E6%259D%2589%25E4%25B8%2598%25E5%25BE%259E%25E7%2587%2588%25E5%2585%25B7%25E3%2580%2581%25E6%25B2%2599%25E7%2599%25BC%25E3%2580%2581%25E5%259C%25B0%25E6%25AF%25AF%25E4%25B9%259F%25E9%2583%25BD%25E7%25B6%2593%25E7%2589%25B9%25E5%2588%25A5%25E6%258C%2591%25E9%2581%25B8%25EF%25BC%258C%25E5%2591%2588%25E7%258F%25BE%25E6%25BB%25BF%25E6%25BB%25BF%25E5%25BA%25A6%25E5%2581%2587%25E6%2584%259F%25EF%25BC%258C%25E8%25AE%2593%25E6%25AF%258F%25E5%2580%258B%25E8%25A7%2592%25E8%2590%25BD%25E9%2583%25BD%25E8%25B6%2585%25E5%25A5%25BD%25E6%258B%258D.jpg"
          alt=""
        />
      </div>
      <div className={styled.carouselWrap}>
        <img
          src="https://i1.momoshop.com.tw/1668451463/goodsimg/0008/494/669/8494669_R.webp"
          alt=""
        />
      </div>
    </Slider>
  )
}
