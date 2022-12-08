import ReactSwipe from 'react-swipe'
import '../../styles/home-scss/carouselHome.scss'

const CarouselHome = ({ oneday }) => {
  let reactSwipeEl

  const imageStyles = {
    margin: '0 auto',
    width: '100%',
    height: '400px',
  }
  return (
    <div className="CarouselGroup">
      <div className="groupbutton" onClick={() => reactSwipeEl.prev()}>
        <i className="fa-solid fa-angle-left"></i>
      </div>
      <ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: false }}
        ref={(el) => (reactSwipeEl = el)}
      >
        <div className="item">
          <img
            style={imageStyles}
            // alt={`slide${i}`}
            src={`http://localhost:3001/room_img/HeHuan.jpg`}
          />
        </div>
        <div className="item">
          <img
            style={imageStyles}
            // alt={`slide${i}`}
            src={`http://localhost:3001/room_img/HeHuan2.jpg`}
          />
        </div>
        <div className="item">
          <img
            style={imageStyles}
            // alt={`slide${i}`}
            src={`http://localhost:3001/room_img/MaWu.jpg`}
          />
        </div>
      </ReactSwipe>
      <div className="groupbutton" onClick={() => reactSwipeEl.next()}>
        <i className="fa-solid fa-angle-right"></i>
      </div>
    </div>
  )
}

export default CarouselHome
