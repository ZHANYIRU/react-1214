import React, { useEffect, useState, useContext } from 'react'
import ProCartContext from '../../contexts/ProCartContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import style from '../../styles/camp-scss/campcat.module.scss'
import axios from 'axios'

function CampCatList({ filter }) {
  const { filterCon } = useContext(ProCartContext)
  const navigate = useNavigate()
  //存navigate的sid

  //all活動產品資料
  const [campData, setCampData] = useState([
    {
      c_sid: '1',
    },
  ])

  //select天數資料
  const [campDay, setCampDay] = useState([])

  //select難度資料
  // const [campLevel, setCampLevel] = useState([])

  //存select選中的天數
  const [seldays, setSeldays] = useState('')

  let all = 'all'
  let select = 'select'
  let level = 'level'

  const fetchAll = async (url) => {
    try {
      const response = await axios.get(`http://localhost:3001/camp/${url}`)
      const data = response.data
      console.log('all')
      if (url === 'select') {
        setCampDay(data)
      } else if (url === 'all') {
        setCampData(data)
      }
      // else if (url === 'level') {
      //   setCampLevel(data)
      // }
    } catch (e) {
      console.log(e.message)
    }
  }

  let filteredData
  if (+filter) {
    filteredData = campData.filter((v, i) => {
      return v.campaign_type_sid === filter
    })
  } else {
    filteredData = campData.filter((v, i) => {
      return v.campaign_type_sid === filterCon
    })
    if (seldays) {
      filteredData = filteredData.filter((v, i) => {
        return v.campaign_days_sid === +seldays
      })
    }
  }

  //查詢分類結果的長度
  let campAlreadyFilter = campData.filter((v, i) => {
    return v.campaign_type_sid === filterCon
  })
  if (seldays) {
    campAlreadyFilter = filteredData.filter((v, i) => {
      return v.campaign_days_sid === +seldays
    })
  }

  // const f = campData.filter((v, i) => {
  //   return v.campaign_type_sid === filterCon
  // })

  useEffect(() => {
    fetchAll('all')
    fetchAll('select')
    fetchAll('level')
  }, [])
  return (
    <div className={style.cat}>
      <div className={style.catright}>
        篩選活動天數
        <select
          value={seldays}
          onChange={(e) => {
            const D = e.currentTarget.value
            setSeldays(D)
          }}
        >
          <option value="">請選擇</option>
          {console.log(seldays)}
          {campDay.map((v, i) => {
            return <option value={v.campday_sid}>{v.dayname}</option>
          })}
        </select>
        {/* 山的難度
        <select>
          {console.log(campLevel)}
          {campLevel.map((v2, i) => {
            if (v2.level == 1) {
              v2.level = '簡單'
            } else if (v2.level == 2) {
              v2.level = '中階'
            } else if (v2.level == 3) {
              v2.level = '困難'
            }
            return <option>{v2.level}</option>
          })}
        </select> */}
        <div>查詢結果 {campAlreadyFilter.length}</div>
        {console.log(campAlreadyFilter)}
        <div className={style.cards}>
          {filteredData.map((v, i) => {
            return (
              <>
                <div className={style.listcardbig} key={v.c_sid}>
                  <div className={style.listcardimg}>
                    <img
                      src={`http://localhost:3001/n7/campmain/${v.mainImage}`} alt=""
                    />
                  </div>
                  <div className={style.listcardbigtext}>
                    <p>{v.camp_name}</p>
                    <p>金額：${v.price}</p>
                    <div>
                      評價：<span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                    </div>
                    <button
                      onClick={() => {
                        navigate(`/camp/${v.c_sid}`)
                      }}
                    >
                      查看更多
                    </button>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CampCatList
