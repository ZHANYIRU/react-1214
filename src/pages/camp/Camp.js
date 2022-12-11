import { useContext, useEffect, useState } from 'react'
import ProCartContext from '../../contexts/ProCartContext'
import { Link } from 'react-router-dom'
import style from '../../styles/camp-scss/camphome.module.scss'
import CampSlider from './CampSlider'
import CampHomeList from './CampHomeList'
import axios from 'axios'

function Camp() {
  const { setFilterCon } = useContext(ProCartContext)

  //title資料
  const [campTitle, setCampTitle] = useState([{}])

  const fetchAll = async (url) => {
    try {
      const response = await axios.get(`http://localhost:3001/camp/${url}`)
      const data = response.data

      setCampTitle(data)
    } catch (e) {
      console.log(e.message)
    }
  }
  useEffect(() => {
    fetchAll('title')
  }, [])
  return (
    <>
      <h2 className={style.title}>
        {campTitle
          .filter((v, i) => {
            return v.campaign_type_name !== '一日單攻報名行程'
          })
          .map((v, i) => {
            if (i < 1)
              return (
                <Link
                  to={`/camp/filter`}
                  key={i}
                  onClick={() => {
                    setFilterCon(4)
                  }}
                >
                  一日單攻報名行程
                </Link>
              )
          })}
      </h2>
      <CampSlider />
      <CampHomeList />
    </>
  )
}

export default Camp
