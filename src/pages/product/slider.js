import { useState } from 'react'
import '../../styles/product.scss/slider.scss'
function Slider({ data }) {
  const [currentId, setCurrentId] = useState(0)

  const jumpTo = (id) => {
    setCurrentId(id)
  }

  return (
    <div className="slider">
      {data.map((el, id) => (
        <div
          className={`slider-slide ${
            currentId === id ? 'slider-slide-active' : ' '
          }`}
          key={el.key}
        >
          <img className="slider-img" src={el.src} alt="" />
        </div>
      ))}
      <div className="slider-dots">
        {data.map((el, id) => (
          <div
            onClick={jumpTo.bind(this, id)}
            className={`slider-dot ${
              currentId === id ? 'slider-dot-active' : ''
            } `}
          />
        ))}
      </div>
    </div>
  )
}
export default Slider
