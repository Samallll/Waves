import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from '../components/headers/UserHeader'

function UserLayout() {

  return (
    <>
        <UserHeader/>
        <Outlet/>
    </>
  )
}

export default UserLayout