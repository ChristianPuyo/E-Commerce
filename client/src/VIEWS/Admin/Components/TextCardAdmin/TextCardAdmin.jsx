import React from 'react'
import Style from './TextCardAdmin.module.css'
import { NavLink } from 'react-router-dom'


const TextCardAdmin = ({name, info, to}) => {

  return (
    <NavLink to={`/${to}`} style={{textDecoration: "none", color:"black", fontWeight: "bold"}} className={Style.Card}>
        <p className={Style.p1}>{name}</p>
        <p className={Style.p2} style={{fontSize: "200%", color: "#582f0e"}} >{info}</p>
    </NavLink>
  )
}

export default TextCardAdmin