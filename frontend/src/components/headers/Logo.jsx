import React from 'react'
import { Link } from 'react-router-dom'
 
function Logo() {
  return (
    <Link to="/" className="flex items-center text-2xl font-semibold text-black">
        <img className="w-12 h-18 mr-2 rounded-xl" src="/assets/square-logo.jpg" alt="logo"/>
        <span className="text-base">CrowdCraft</span>      
    </Link>
  )
}

export default Logo