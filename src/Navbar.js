import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {

  return (
    <nav>
      <Link to="/">Create</Link>
      <Link to="/recipes">Discover</Link>
    </nav>
  )
}