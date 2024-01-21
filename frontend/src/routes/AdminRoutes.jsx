import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import AdminHome from '../pages/AdminHome'

function AdminRoutes() {
return (
    <Routes>
        <Route path='' element={<AdminLayout/>}>
            <Route path='/' element={<AdminHome/>}/>
            <Route path='/home' element={<AdminHome/>}/>
            <Route path='/:adminId' element={<AdminHome/>}/>
        </Route>
    </Routes>
    )
}

export default AdminRoutes