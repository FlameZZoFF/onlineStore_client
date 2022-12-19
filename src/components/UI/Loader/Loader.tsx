import React from 'react'
import './Loader.scss'
import Spinner from '../../images/Spinner/Spinner.svg'
export default function Loader() {
  return (
    <div className='Loader'>
      <div className='Spinner'>
          <img className='Spinner_img' src={Spinner}></img>
      </div>
    </div>
  )
}
