import React from 'react'
import styles from './pagination.module.css'
export default function Pagination({ItemsPerPage, totalItems,Pagination,currentPage}:any) {
  const pagenumbers = []
  for(let i =1;i < Math.ceil(totalItems / ItemsPerPage) + 1;i++){
    pagenumbers.push(i)
  }
  
  const OnMouseOver = (e:any) =>{
    e.target.classList.add(styles.active)
}
const OnMouseOut = (e:any) =>{
    e.target.classList.remove(styles.active)
}

 
  return (
    <div>
      <ul className={styles.Pagination}>
          {
            pagenumbers.map(number=>(
                <li  className={styles.li} key={number}>
                    <h1  className={currentPage === number ? styles.liCurrent  : styles.pagelink }  onMouseOver={OnMouseOver}  onMouseOut={OnMouseOut} onClick={(e) =>{ Pagination(number)
                    }}>
                        {number}
                    </h1>
                </li>
            ))
          }
      </ul>
    </div>
  )
}
