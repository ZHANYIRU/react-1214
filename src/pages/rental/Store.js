import React, { useState, useEffect } from 'react'
import styled from '../../styles/rental-scss/store.module.scss'
import axios from 'axios'

const Store = () => {
  const [zone, setZone] = useState(['北區', '中區', '南區', '東區'])
  const [zoneChoice, setZoneChoice] = useState('北區')
  const [store, setStore] = useState([])
  const [showStore, setshowStore] = useState({})

  const store_url = `http://localhost:3001/rental/getStore`

  const showStoreFilter = (e) => {
    const filterData = store.filter((d, i) => {
      return d.store_name === e
    })
    console.log(filterData)
    setshowStore(filterData[0])
  }

  async function get_store() {
    const response = await axios.get(store_url)
    console.log(response.data.rows)
    setStore(response.data.rows)
    setshowStore(response.data.rows[0])
  }

  useEffect(() => {
    get_store()
  }, [])
  return (
    <>
      <div className={styled.empty}> </div>
      <div className={styled.container}>
        <div className={styled.middlecontainer}>
          <div className={styled.left}>
            {zoneChoice === '北區' && (
              <div
                className={`${styled.redball}`}
                style={{ top: '70px', left: '330px' }}
              >
                大安
              </div>
            )}
            {zoneChoice === '北區' && (
              <div
                className={`${styled.redball}`}
                style={{ top: '73px', left: '290px' }}
              >
                八德
              </div>
            )}
            {zoneChoice === '中區' && (
              <div
                className={`${styled.redball}`}
                style={{ top: '150px', left: '240px' }}
              >
                臺中
              </div>
            )}
            {zoneChoice === '南區' && (
              <div
                className={`${styled.redball}`}
                style={{ top: '370px', left: '200px' }}
              >
                高雄
              </div>
            )}
            {zoneChoice === '東區' && (
              <div
                className={`${styled.redball}`}
                style={{ top: '200px', left: '330px' }}
              >
                花蓮
              </div>
            )}
          </div>
          <div className={styled.right}>
            <div className={`${styled.flex}`}>
              <div>
                <h2 className={styled.storetitle}>全台各大店點</h2>
              </div>
              <div>
                <select
                  onChange={(e) => {
                    const value = e.target.value
                    const newS = store.filter((d, i) => {
                      return d.store_address_zone === value
                    })
                    setshowStore(newS[0])
                    setZoneChoice(e.target.value)
                  }}
                  style={{ margin: '0 20px 0 0' }}
                >
                  {zone.map((e, i) => {
                    return <option value={e}>{e}</option>
                  })}
                </select>

                <select
                  onChange={(e) => {
                    const value = e.target.value
                    showStoreFilter(value)
                  }}
                >
                  {store
                    .filter((e, i) => {
                      return e.store_address_zone === zoneChoice
                    })
                    .map((d, i) => {
                      return (
                        <option key={i} value={d.store_name}>
                          {d.store_name}
                        </option>
                      )
                    })}
                  {/* {store.store_address_zone === zoneChoice &&
                    store.map((d, i) => {
                      return (
                        <option key={i} value={d.store_name}>
                          {d.store_name}
                        </option>
                      )
                    })} */}
                </select>
              </div>
            </div>
            <div className={`${styled.flex} ${styled.seconddiv}`}>
              <div>
                {/* <h2>大安店</h2> */}
                <h2>{showStore.store_name}</h2>
                <p>地址:{showStore.store_address}</p>
              </div>
              <div>
                <div>
                  <img src={`/${showStore.store_img}`} alt="" />
                </div>
              </div>
            </div>
            <div className={`${styled.flex} ${styled.thirddiv}`}>
              <pre>{showStore.store_introduction}</pre>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Store
