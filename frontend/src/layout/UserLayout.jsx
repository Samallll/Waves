import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from '../components/headers/UserHeader'
import Footer from '../components/footer/Footer'

function UserLayout() {
  return (
    <>
        <UserHeader/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default UserLayout