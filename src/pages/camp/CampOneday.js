import React, { useEffect, useState } from 'react'
import CampCatList from './CampCatList'
import ListLeft from './components/ListLeft'
import style from '../../styles/camp-scss/campcat.module.scss'

function CampOneday() {
  const [filter, setFilter] = useState(0)
  useEffect(()=>{
    setFilter()
  },[])
  return (
    <div className={style.filter}>
      <ListLeft setFilter={setFilter} />
      <CampCatList filter={filter} />
      {console.log(filter)};
    </div>
  )
}

export default CampOneday
