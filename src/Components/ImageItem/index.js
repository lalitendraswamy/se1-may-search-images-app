import React from 'react'
import '../Home/style.css'

export default function index(props) {
    const {obj}=props
    const imgurl= obj.urls.regular
  return (
    <li>
      <img src={imgurl} alt='img-li'/>
    </li>
  )
}
