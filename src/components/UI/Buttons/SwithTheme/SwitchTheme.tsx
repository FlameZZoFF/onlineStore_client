import React, { useEffect, useState } from 'react'
import styles from './SwithTheme.module.css'
export default function SwitchTheme() {
    const [theme,setTheme] = useState(localStorage.getItem('theme') == 'light' ? 'Dark' : 'Ligth')
     


    const DarkTheme = () =>{
        if(document.documentElement.getAttribute('data-theme') == 'dark'){
          document.documentElement.setAttribute('data-theme','light')
          setTheme('Dark')
          localStorage.setItem('theme','light')
        }else{
          document.documentElement.setAttribute('data-theme','dark')
          setTheme('Ligth')
          localStorage.setItem('theme','dark')
        }
      }
  return (
    <button className={styles.switchTheme} onClick={DarkTheme}>
        
        {theme}

    </button>
  )
}
