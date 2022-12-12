import { useEffect, useRef, useState } from 'react'
import styled from '../../../styles/member-scss/MemberInfo.module.scss'
import ModalView from './ModalView'
import dayjs from 'dayjs'
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Tooltip,
} from 'react-leaflet'
import L from 'leaflet'
import { proj4, EPSG3826, EPSG4326, EPSG3828 } from './convertXYToLatLng'

export default function LeafletMap({ postList, getPostList, totalHeight }) {
  const [locations, setLocations] = useState([])
  const [isView, setIsView] = useState(false)
  const [currentPost, setCurrentPost] = useState(0)
  const [locationList, setLocationList] = useState([])

  useEffect(() => {
    const uniqueLocations = [
      ...new Set(postList.map((item) => item.mountain_sid)),
    ]
    setLocations(uniqueLocations)
  }, [postList])

  const mapRef = useRef()

  function getLocationList(el) {
    return postList.filter((v) => v.mountain_name === el.mountain_name)
  }

  //   ;[...new Map(postList.map((el) => [el.mountain_sid, el])).values()].map(
  //     (v, i) => {
  //       return console.log(proj4(EPSG3828, EPSG4326, [v.x, v.y]))
  //     }
  //   )
  //   proj4(現在的坐標系統, 欲轉換過去的坐標系統, [x, y])

  function showModal(e) {
    // console.log(e.target.options.mid)
    const currentPostList = []

    postList.map((v, i) => {
      if (v.mountain_sid === e.target.options.mid) {
        return currentPostList.push(v)
      }
    })
    // console.log(currentPostList)
    setIsView(true)
    setCurrentPost(0)
    setLocationList(currentPostList)
  }

  function flyToLocation(x, y) {
    const flyToTarget = proj4(EPSG3828, EPSG4326, [x, y])
    // console.log(flyToTarget)
    // console.log(mapRef.current)
    mapRef.current.flyTo([flyToTarget[1], flyToTarget[0]], 10)
  }

  return (
    <div className={styled.leafletMap}>
      <div className={styled.sidePan}>
        <h4 className={styled.showTotal}>總計高度:{totalHeight.height}m</h4>
        <h4 className={styled.showTotal}>總計地點:{locations.length}</h4>
        {[...new Map(postList.map((el) => [el.mountain_sid, el])).values()].map(
          (v, i) => {
            return (
              <div
                key={i}
                className={styled.item}
                onClick={() => {
                  flyToLocation(v.x, v.y)
                }}
              >
                <h4>{v.mountain_name}</h4>
                <p
                  style={{
                    color: '#E50',
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '5px',
                    marginBottom: '5px',
                  }}
                >
                  {v.height}m
                </p>
                {postList.map((e, index) => {
                  if (e.mountain_name === v.mountain_name) {
                    return (
                      <p key={index} style={{ color: 'gray' }}>
                        {dayjs(e.created_at).format('YYYY-MM-DD')}
                      </p>
                    )
                  }
                })}
              </div>
            )
          }
        )}
      </div>
      <MapContainer
        className={styled.mapBox}
        center={[23.58, 120.58]}
        zoom={7}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[25.034, 121.54]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        {/* <Marker position={[24.18096237091893, 121.24401949964029]}>
          <Tooltip>西合歡山: 3145m</Tooltip>
        </Marker>*/}
        {[...new Map(postList.map((el) => [el.mountain_sid, el])).values()].map(
          (v, i) => {
            const pos = proj4(EPSG3828, EPSG4326, [v.x, v.y])
            return (
              <Marker
                key={i}
                position={[pos[1], pos[0]]}
                eventHandlers={{ click: showModal }}
                mid={v.mountain_sid}
              >
                <Tooltip>
                  {v.mountain_name}: {v.height}m
                </Tooltip>
              </Marker>
            )
          }
        )}
      </MapContainer>
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
    </div>
  )
}
