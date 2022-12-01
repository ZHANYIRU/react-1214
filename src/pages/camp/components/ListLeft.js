import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import style from '../../../styles/camp-scss/campcat.module.scss'
import axios from 'axios'

function ListLeft({ setFilter }) {
  const [title, setTitle] = useState([
    { camptype_sid: '', campaign_type_name: '' },
  ])
  const fetchAll = async (url) => {
    try {
      const response = await axios.get(`http://localhost:3001/camp/${url}`)
      const data = response.data

      setTitle(data)
    } catch (e) {
      console.log(e.message)
    }
  }
  useEffect(() => {
    fetchAll('title')
  }, [])

  return (
    <>
      <div className={style.list}>
        {title.map((v, i) => {
          return (
            <>
              <div
                key={i}
                onClick={() => {
                  setFilter(v.camptype_sid)
                }}
              >
                {v.campaign_type_name}
              </div>
            </>
          )
        })}
      </div>
      <Link to="/camp/:camp_sid">產品單頁</Link>
    </>
  )
}

export default ListLeft
