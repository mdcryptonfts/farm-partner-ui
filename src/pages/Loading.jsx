import React from 'react'
import { Spinner, SpinnerBlue, SpinnerGreen, SpinnerRed } from '../data/css/Spinner'

const Loading = () => {
  return (
    <div style={{textAlign:"center", height:"100vh", paddingTop:"30%", width:"100vw"}}>
    <Spinner>
    <SpinnerRed  />
    <SpinnerBlue  />
    <SpinnerGreen />
    </Spinner>
    <br/>
    <span className='text-white'>
    Loading...
    </span>
    </div>
  )
}

export default Loading