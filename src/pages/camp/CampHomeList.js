import { useContext, useEffect, useState } from 'react'
import ProCartContext from '../../contexts/ProCartContext'
import style from '../../styles/camp-scss/camphome.module.scss'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CampHomeList(sliderdata) {
  const { filterCon, setFilterCon } = useContext(ProCartContext)

  console.log(filterCon)

  const navigate = useNavigate()

  //title資料
  const [campTitle, setCampTitle] = useState([{}])
  //all活動產品資料
  const [campData, setCampData] = useState([{}])

  let title = 'title'
  let all = 'all'
  const fetchAll = async (url) => {
    try {
      const response = await axios.get(`http://localhost:3001/camp/${url}`)
      const data = response.data
      console.log('all')
      if (url === 'title') {
        setCampTitle(data)
      } else if (url === 'all') {
        setCampData(data)
      }
    } catch (e) {
      console.log(e.message)
    }
  }
  useEffect(() => {
    fetchAll('title')
    fetchAll('all')
  }, [])

  return (
    <div className={style.list}>
      <h2 className={style.title}>
        {campTitle
          .filter((v, i) => {
            return v.campaign_type_name !== '一日單攻報名行程'
          })
          .map((v, i) => {
            return (
              <div key={i}>
                <Link
                  to={`/camp/filter`}
                  onClick={() => {
                    setFilterCon(v.camptype_sid)
                  }}
                >
                  {v.campaign_type_name}
                </Link>
                <div className={style.listbox}>
                  {campData
                    .filter((v2, i2) => {
                      return v.camptype_sid == v2.camptype_sid
                    })
                    .map((v2, i2) => {
                      if (i2 < 4) {
                        return (
                          <div
                            key={i2}
                            className={style.listcard}
                            onClick={() => {
                              navigate(`/camp/${v2.c_sid}`)
                            }}
                          >
                            <div>
                              <img
                                src={`http://localhost:3001/n7/campmain/${v2.mainImage}`}
                                alt=""
                              />
                            </div>
                            <div className={style.listcardtext}>
                              <p>{v2.camp_name}</p>
                              <p>金額：{v2.price}</p>
                              <div>
                                {' '}
                                評價：
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                              </div>
                            </div>
                          </div>
                        )
                      } else {
                        return
                      }
                    })}
                </div>
              </div>
            )
          })}
      </h2>
    </div>
  )
}

export default CampHomeList
