import React from 'react'
import { Routes,Route } from 'react-router-dom'
import UserLayout from '../layout/UserLayout'
import UserHome from '../pages/UserHome'

function UserRoutes() {
  return (
    <Routes>
        <Route path='' element={<UserLayout/>}>
            <Route path='/' element={<UserHome/>}/>
            <Route path='/home' element={<UserHome/>}/>
            <Route path='/:userId' element={<UserHome/>}/>
        </Route>
    </Routes>
  )
}

export default UserRoutes