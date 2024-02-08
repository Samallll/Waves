import React from 'react'
import { Routes,Route } from 'react-router-dom'
import UserLayout from '../layout/UserLayout'
import UserHome from '../pages/UserHome'
import EventRegistration from '../pages/Host/EventRegistration'

function HostRoutes() {
  return (
    <Routes>
      <Route path='' element={<UserLayout/>}>
            <Route path='/' element={<UserHome/>}/>
            <Route path='/home' element={<UserHome/>}/>
            <Route path='/:adminId' element={<UserHome/>}/>
            <Route path='/register-event' element={<EventRegistration/>}/>
            <Route path='/host-requests' element={<UserHome/>}/>
            <Route path='/host-requests/:hostRequestId' element={<UserHome/>}/>
        </Route>
    </Routes>
  )
}

export default HostRoutes