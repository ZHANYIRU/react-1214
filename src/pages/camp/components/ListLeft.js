import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import style from '../../../styles/camp-scss/campcat.module.scss'
import axios from 'axios'
import ProCartContext from '../../../contexts/ProCartContext'

function ListLeft({ setFilter }) {
  const { filterCon, setFilterCon } = useContext(ProCartContext)
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
            <Link
              className={style.leftLink}
              to={`/camp/filter`}
              key={i}
              onClick={() => {
                setFilterCon(v.camptype_sid)
              }}
            >
              {v.campaign_type_name}
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default ListLeft
