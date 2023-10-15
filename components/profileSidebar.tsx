import React, {useState} from 'react'
import { Container } from '@mui/material'

export default function profileSidebar(props : any) {

  return (
    <div>
         <h1 className='heading profileHeading'>MY PROFILE</h1>
         <ul>
             <li className={`profileList ${props.tab===0?"activeProfileList" : ""}`} onClick={(e)=>props.handleClick(0)}>My details</li>
             <li className={`profileList ${props.tab===1?"activeProfileList" : ""}`} onClick={(e)=>props.handleClick(1)}>My order History</li>
             <li className={`profileList ${props.tab===2?"activeProfileList" : ""}`} onClick={(e)=>props.handleClick(2)}>My address</li>
         </ul>
    </div>
  )
}
