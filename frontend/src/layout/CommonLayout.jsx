import React from 'react'
import { Outlet } from 'react-router-dom'

function CommonLayout() {
  return (
    <>
      <Outlet/>
    </>
  )
}

export default CommonLayout