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

function UserRoutes() {
  return (
    <Routes>
        <Route path='' element={<UserLayout/>}>
            <Route path='/' element={<UserHome/>}/>
            <Route path='/home' element={<UserHome/>}/>
            <Route path='/:userId' element={<UserProfileLayout/>}>
              <Route path='' element={<UserProfile/>}/>
              <Route path='edit' element={<EditUserProfile/>}/>
              <Route path='bank' element={<BankDetails/>}/>
              <Route path='bank/edit' element={<EditBankDetails/>}/>
              <Route path='bank/add' element={<AddBankDetails/>}/>
            </Route>
        </Route>
    </Routes>
  )
}

export default UserRoutes