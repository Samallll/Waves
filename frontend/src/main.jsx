import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route,RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import CommonLayout from './layout/CommonLayout'
import Home from "./pages/Home"
import SignUpForm from './components/forms/SignUpForm'
import UserRoutes from './routes/UserRoutes'
import OtpForm from './components/forms/OtpForm'
import { Provider } from 'react-redux'
import store from './store/store'
import Redirect from './components/Redirect'
import AdminRoutes from './routes/AdminRoutes'

const router = createBrowserRouter(
  createRoutesFromElements(
    
      <Route path='/' element={<CommonLayout />}>
        <Route path='' element={<Redirect />}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<SignUpForm/>}/>
        <Route path='/otp' element={<OtpForm submitURL="http://127.0.0.1:8090/user/"/>}/>
        <Route path='user/*' element={<UserRoutes />} />
        <Route path='admin/*' element={<AdminRoutes />} />
      </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)