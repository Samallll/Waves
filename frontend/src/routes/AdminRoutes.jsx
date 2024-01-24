import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import AdminHome from '../pages/AdminHome'
import UserManagement from '../pages/Admin/UserManagement'

function AdminRoutes() {
return (
    <Routes>
        <Route path='' element={<AdminLayout/>}>
            <Route path='/' element={<AdminHome/>}/>
            <Route path='/home' element={<AdminHome/>}/>
            <Route path='/:adminId' element={<AdminHome/>}/>
            <Route path='/user-management' element={<UserManagement/>}/>
        </Route>
    </Routes>
    )
}

export default AdminRoutes