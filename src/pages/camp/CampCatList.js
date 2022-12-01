import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import style from '../../styles/camp-scss/campcat.module.scss'
import ListCardBig from './components/ListCardBig'
import ListLeft from './components/ListLeft'
import axios from 'axios'

function CampCatList({ filter }) {
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
        <div>查詢結果</div>
        <div>麵包屑/麵包屑/麵包屑/麵包屑</div>
        <div className={style.cards}>
          {campData
            .filter((v, i) => {
              return v.campaign_type_sid === filter
            })
            .map((v, i) => {
              return (
                <>
                  <div className={style.listcardbig} key={v.sid}>
                    <div className={style.listcardimg}>
                      <img src="https://s3.amazonaws.com/imagescloud/images/medias/annexes/annexe-camping-2022.jpg" />
                    </div>
                    <div className={style.listcardbigtext}>
                      <p>{v.name}</p>
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
