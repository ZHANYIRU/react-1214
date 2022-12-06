import { useEffect, useState } from 'react'
import styled from '../../../styles/member-scss/MemberInfo.module.scss'

export default function PostMap(postList) {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const uniqueLocations = [
      ...new Set(postList.postList.map((item) => item.mountain_sid)),
    ]
    setLocations(uniqueLocations)
  }, [postList])

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

  return (
    <>
      <div className={styled.postMap}>
        <img
          className={styled.magBg}
          src={'/img/taiwan.png'}
          alt="taiwanMap"
          loading="lazy"
        />
        {postList.postList.map((el, i) => {
          return (
            <div
              className={styled.pinBox}
              key={i}
              style={{
                bottom: `${bottomPercent(el.y)}%`,
                left: `${leftPercent(el.x)}%`,
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
        })}
        {/* <div className={styled.pin}></div> */}
        <h4>總計地點: {locations.length}</h4>
      </div>
    </>
  )
}
