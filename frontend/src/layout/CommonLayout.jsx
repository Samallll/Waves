import React from 'react'
import CommonHeader from '../components/headers/CommonHeader'
import Footer from '../components/footer/Footer'
import { Outlet } from 'react-router-dom'

function CommonLayout() {
  return (
    <>
      <Outlet/>
    </>
  )
}

export default CommonLayout