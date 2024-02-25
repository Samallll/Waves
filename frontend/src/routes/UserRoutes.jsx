import React from 'react'
import { Routes,Route } from 'react-router-dom'
import UserLayout from '../layout/UserLayout'
import UserHome from '../pages/UserHome'
import UserProfileLayout from '../layout/UserProfileLayout'
import UserProfile from '../pages/User/UserProfile'
import EditUserProfile from '../pages/User/EditUserProfile'
import BankDetails from '../pages/User/BankDetails'
import EditBankDetails from '../pages/User/EditBankDetails'
import AddBankDetails from '../pages/User/AddBankDetails'
import HostRegistration from '../components/forms/HostRegistration'
import EventDetails from '../pages/User/EventDetails'
import OrganizeCheckout from '../pages/User/OrganizeCheckout'
import ParticipateCheckout from '../pages/User/ParticipateCheckout'

function UserRoutes() {
  return (
    <Routes>
        <Route path='' element={<UserLayout/>}>
            <Route path='/' element={<UserHome/>}/>
            <Route path='/home' element={<UserHome/>}/>
            <Route path='/host-registration' element={<HostRegistration/>}/>
            <Route path='/event-details/:eventId' element={<EventDetails/>}/>
            <Route path='/:userId' element={<UserProfileLayout/>}>
              <Route path='' element={<UserProfile/>}/>
              <Route path='edit' element={<EditUserProfile/>}/>
              <Route path='bank' element={<BankDetails/>}/>
              <Route path='bank/edit' element={<EditBankDetails/>}/>
              <Route path='bank/add' element={<AddBankDetails/>}/>
            </Route>
            <Route path='/job-request/:jobRequestId' element={<OrganizeCheckout/>}/>
            <Route path='/organize-event/:eventId' element={<OrganizeCheckout/>}/>
            <Route path='/participate-event/:eventId' element={<ParticipateCheckout/>}/>
        </Route>
    </Routes>
  )
}

export default UserRoutes