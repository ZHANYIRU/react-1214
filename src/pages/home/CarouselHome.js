import ReactSwipe from 'react-swipe'
import '../../styles/home-scss/carouselHome.scss'

const CarouselHome = ({ oneday }) => {
  let reactSwipeEl

  const imageStyles = {
    margin: '0 auto',
    width: '100%',
    height: '400px',
  }
  const imgs = oneday.detailImages
  return (
    <>
      {imgs && imgs.length !== 0 && (
        <div className="CarouselGroup">
          <div className="groupbutton" onClick={() => reactSwipeEl.prev()}>
            <i className="fa-solid fa-angle-left"></i>
          </div>
          <ReactSwipe
            className="carousel"
            swipeOptions={{ continuous: true }}
            ref={(el) => (reactSwipeEl = el)}
          >
            <div className="item">
              <img
                style={imageStyles}
                alt=''
                src={`http://localhost:3001/n7/campmain/${oneday.mainImage}`}
              />
            </div>
            <div className="item">
              <img
                style={imageStyles}
                alt=''
                src={
                  imgs &&
                  imgs.length !== 0 &&
                  `http://localhost:3001/n7/${imgs[0]}`
                }
              />
            </div>
            <div className="item">
              <img
                style={imageStyles}
                alt=''
                src={
                  imgs &&
                  imgs.length !== 0 &&
                  `http://localhost:3001/n7/${imgs[1]}`
                }
              />
            </div>
            <div className="item">
              <img
                style={imageStyles}
                alt=''
                src={
                  imgs &&
                  imgs.length !== 0 &&
                  `http://localhost:3001/n7/${imgs[2]}`
                }
              />
            </div>
          </ReactSwipe>
          <div className="groupbutton" onClick={() => reactSwipeEl.next()}>
            <i className="fa-solid fa-angle-right"></i>
          </div>
        </div>
      )}
    </>
  )
}

export default CarouselHome
