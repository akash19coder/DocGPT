import React, { Component, ReactNode } from 'react'
import { LuSun } from "react-icons/lu";
import Item from './Item'

const InfoItem = ({ sectionClass, icon }: { sectionClass: string, icon: ReactNode }) => {
  return (
    <>
      <div className={`${sectionClass.toLowerCase()}`} id='content'>
        <div id='icon'>
          {icon}
          <h3>{sectionClass}</h3>
        </div>
        <Item sectionClass='Capabilities' />
      </div>

    </>
  )
}

export default InfoItem