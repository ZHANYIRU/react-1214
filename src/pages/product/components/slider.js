import { useState, useEffect } from 'react'
import '../../../styles/product-scss/slider.scss'
function Slider({ data, fixedd }) {
  const [currentId, setCurrentId] = useState(0)
  const jumpTo = (id) => {
    setCurrentId(id)
  }
  useEffect(() => {
    const a = setInterval(() => {
      if (currentId >= 0 && currentId <= 1) setCurrentId(currentId + 1)
      if (currentId == 2) {
        setCurrentId(0)
      }
    }, 2500)
    return () => {
      clearInterval(a)
    }
  }, [currentId])

  return (
    <div className={fixedd ? 'sliderFixedd' : 'slider'}>
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
            key={id}
          />
        ))}
      </div>
    </div>
  )
}
export default Slider
