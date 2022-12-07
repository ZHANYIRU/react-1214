import ReactSwipe from 'react-swipe'
import '../../styles/home-scss/carouselHome.scss'

const CarouselHome = ({ oneday }) => {
  let reactSwipeEl

  return (
    <div className='CarouselHome'>
      <ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: false }}
        ref={(el) => (reactSwipeEl = el)}
      >
        <div>PANE 1</div>
        <div>PANE 2</div>
        <div>PANE 3</div>
      </ReactSwipe>
      <button onClick={() => reactSwipeEl.next()}>Next</button>
      <button onClick={() => reactSwipeEl.prev()}>Previous</button>
    </div>
  )
}

export default CarouselHome
