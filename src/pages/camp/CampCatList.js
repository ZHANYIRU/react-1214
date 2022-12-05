import React, { useEffect, useState, useContext } from 'react'
import ProCartContext from '../../contexts/ProCartContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import style from '../../styles/camp-scss/campcat.module.scss'
import ListCardBig from './components/ListCardBig'
import ListLeft from './components/ListLeft'
import axios from 'axios'

function CampCatList({ filter }) {
  const { filterCon } = useContext(ProCartContext)
  const navigate = useNavigate()
  //存navigate的sid

  //all活動產品資料
  const [campData, setCampData] = useState([
    {
      sid: '1',
    },
  ])

  let all = 'all'
  const fetchAll = async (url) => {
    try {
      const response = await axios.get(`http://localhost:3001/camp/${url}`)
      const data = response.data
      console.log('title')

      setCampData(data)
    } catch (e) {
      console.log(e.message)
    }
  }
  //查詢分類結果的長度
  let filteredData
  if (+filter) {
    filteredData = campData.filter((v, i) => {
      return v.campaign_type_sid === filter
    })
  } else {
    filteredData = campData.filter((v, i) => {
      return v.campaign_type_sid === filterCon
    })
  }
  const campAlreadyFilter = campData.filter((v, i) => {
    return v.campaign_type_sid === filter
  })

  const f = campData.filter((v, i) => {
    return v.campaign_type_sid === filterCon
  })

  useEffect(() => {
    fetchAll('all')
  }, [])
  return (
    <div className={style.cat}>
      <div className={style.catright}>
        <div>
          登山難度<select></select>
          天數<select></select>
          <button>查詢</button>
        </div>
        <div>查詢結果 {campAlreadyFilter.length}</div>
        <div>麵包屑/麵包屑/麵包屑/麵包屑</div>
        <div className={style.cards}>
          {filteredData.map((v, i) => {
            return (
              <>
                <div className={style.listcardbig} key={v.sid}>
                  <div className={style.listcardimg}>
                    <img
                      src={`http://localhost:3001/n7/campmain/${v.mainImage}`}
                    />
                  </div>
                  <div className={style.listcardbigtext}>
                    <p>{v.camp_name}</p>
                    <p>金額：${v.price}</p>
                    <div> 評價：stars</div>
                    <button
                      onClick={() => {
                        navigate(`/camp/${v.sid}`)
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
