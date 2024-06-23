import React from 'react'
import { Spinner, SpinnerBlue, SpinnerGreen, SpinnerRed } from '../data/css/Spinner'

const LoadingDiv = () => {
  return (
    <div style={{textAlign:"center", paddingTop:"30px", width:"100%"}}>
    <Spinner>
    <SpinnerRed  />
    <SpinnerBlue  />
    <SpinnerGreen />
    </Spinner>

    </div>
  )
}

export default LoadingDiv