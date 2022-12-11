import { useEffect, useState } from 'react'
import styled from '../../../styles/member-scss/MemberInfo.module.scss'
import ModalView from './ModalView'

export default function PostMap({ postList, getPostList }) {
  const [locations, setLocations] = useState([])
  const [isView, setIsView] = useState(false)
  const [currentPost, setCurrentPost] = useState(0)
  const [locationList, setLocationList] = useState([])
  const [mtnInfo, setMtnInfo] = useState({})

  useEffect(() => {
    const uniqueLocations = [
      ...new Set(postList.map((item) => item.mountain_sid)),
    ]
    setLocations(uniqueLocations)
    setLocationList(getLocationList(mtnInfo))
  }, [postList, mtnInfo])

  function leftPercent(x) {
    return ((x - 158187) / (349808 - 158187)) * 100
  }

  function bottomPercent(y) {
    // {
    //   console.log(
    //     'y=' + y + '| %=' + ((y - 2422925) / (2798819 - 2422925)) * 100
    //   )
    // }
    return ((y - 2422925) / (2798819 - 2422925)) * 100
  }

  function getLocationList(el) {
    return postList.filter((v) => v.mountain_name === el.mountain_name)
  }

  return (
    <>
      <div className={styled.postMap}>
        <img
          className={styled.magBg}
          src={'/img/taiwan.png'}
          alt="taiwanMap"
          loading="lazy"
        />
        {[...new Map(postList.map((el) => [el.mountain_sid, el])).values()].map(
          (el, i) => {
            return (
              <div
                className={styled.pinBox}
                key={i}
                style={{
                  bottom: `${bottomPercent(el.y)}%`,
                  left: `${leftPercent(el.x)}%`,
                }}
                onClick={() => {
                  setIsView(true)
                  setCurrentPost(0)
                  setLocationList(getLocationList(el))
                  setMtnInfo(el)
                }}
              >
                <i className={`fa-solid fa-location-dot ${styled.pin}`}></i>
                <p className={styled.pinInfo}>
                  {el.mountain_name}
                  <br />
                  <span style={{ fontSize: '14px' }}>{el.height}m</span>
                </p>
              </div>
            )
          }
        )}
        {/* <div className={styled.pin}></div> */}
        <h4>總計地點: {locations.length}</h4>
      </div>
      {isView && (
        <ModalView
          isView={isView}
          setIsView={setIsView}
          showData={locationList[currentPost]}
          setCurrentPost={setCurrentPost}
          currentPost={currentPost}
          listLength={locationList.length}
          getPostList={getPostList}
          setLocationList={setLocationList}
        />
      )}
    </>
  )
}
