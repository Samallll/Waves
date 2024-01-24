import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from '../components/headers/UserHeader'
import { useSelector } from 'react-redux'

function UserLayout() {

  const loggedUser = useSelector((state) => state.auth.loggedUser)
  console.log(loggedUser)

  return (
    <>
        <UserHeader/>
        <Outlet/>
    </>
  )
}

export default UserLayout