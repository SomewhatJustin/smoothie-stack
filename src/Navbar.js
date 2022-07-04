import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar(props) {

  return (
    <nav>
      <NavLink to="/create" onClick={props.startOver} className={({ isActive }) => isActive ? "active-nav" : "inactive-nav"}>Create</NavLink>
      <NavLink to="/recipes" className={({ isActive }) => isActive ? "active-nav" : "inactive-nav"}>Discover</NavLink>
    </nav>
  )
}