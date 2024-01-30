import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import AdminHome from '../pages/AdminHome'
import UserManagement from '../pages/Admin/UserManagement'
import HostRequestManagement from '../pages/Admin/HostRequestManagement'
import HostRequestDetails from '../pages/Admin/HostRequestDetails'

function AdminRoutes() {
return (
    <Routes>
        <Route path='' element={<AdminLayout/>}>
            <Route path='/' element={<AdminHome/>}/>
            <Route path='/home' element={<AdminHome/>}/>
            <Route path='/:adminId' element={<AdminHome/>}/>
            <Route path='/user-management' element={<UserManagement/>}/>
            <Route path='/host-requests' element={<HostRequestManagement/>}/>
            <Route path='/host-requests/:hostRequestId' element={<HostRequestDetails/>}/>
        </Route>
    </Routes>
    )
}

export default AdminRoutes