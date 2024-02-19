import React from 'react'
import { Routes,Route } from 'react-router-dom'
import UserLayout from '../layout/UserLayout'
import UserHome from '../pages/UserHome'
import EventRegistration from '../pages/Host/EventRegistration'
import EventDetails from '../pages/User/EventDetails'
import EventManagement from '../pages/Host/EventManagement'
import EventUpdation from '../pages/Host/EventUpdation'

function HostRoutes() {
  return (
    <Routes>
      <Route path='' element={<UserLayout/>}>
            <Route path='/' element={<UserHome/>}/>
            <Route path='/home' element={<UserHome/>}/>
            <Route path='/:adminId' element={<UserHome/>}/>
            <Route path='/register-event' element={<EventRegistration/>}/>
            <Route path='/event/:eventId' element={<EventDetails/>}/>
            <Route path='/update-event/:eventId' element={<EventUpdation/>}/>
            <Route path='/event-management' element={<EventManagement/>}/>
        </Route>
    </Routes>
  )
}

export default HostRoutes