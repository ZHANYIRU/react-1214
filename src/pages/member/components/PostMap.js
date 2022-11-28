import { useEffect, useState} from 'react'
import styled from '../../../styles/member-scss/MemberInfo.module.scss'

export default function PostMap(postList) {

const [locations, setLocations] = useState([])

useEffect(()=>{
  const uniqueLocations = [...new Set(postList.postList.map(item => item.mountain_sid))]
  setLocations(uniqueLocations)
}, [postList])

  return (
    <>
      <div className={styled.postMap}>
        <h4>總計地點: {locations.length}</h4>
      </div>
    </>
  )
}
