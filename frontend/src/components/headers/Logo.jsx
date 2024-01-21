import React from 'react'
import logo from '../../assets/square-logo.jpg'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to="/" className="flex items-center text-2xl font-semibold text-black">
        <img className="w-12 h-18 mr-2 rounded-xl" src={logo} alt="logo"/>
        <span className="text-base">CrowdCraft</span>      
    </Link>
  )
}

export default Logo