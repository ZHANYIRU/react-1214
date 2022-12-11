import React from 'react'
import CustomDisplay from './components/CustomDisplay'
import CustomSetting from './components/CustomSetting'
import styled from '../../styles/product-scss/Custom.module.scss'
export default function CustomDashboard() {
  return (
    <>
     <div>55555</div>
     <div>55555</div>
     <div>55555</div>
     <div>55555</div>
     <div>55555</div>
      <div className={styled.container}>
        <CustomDisplay />
        <CustomSetting />
      </div>
    </>
  )
}
