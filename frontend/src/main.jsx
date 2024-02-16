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
import ForgotPassword from './components/forms/ForgotPassword'
import OtpValidation from './components/forms/OtpValidation'
import ConfirmPasswordForm from './components/forms/ConfirmPasswordForm'
import HostRoutes from './routes/HostRoutes'
import Events from './pages/Events'
import "react-image-crop/dist/ReactCrop.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    
      <Route path='/' element={<CommonLayout />}>
        <Route path='' element={<Redirect />}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<SignUpForm/>}/>
        <Route path='/otp' element={<OtpForm/>}/>
        <Route path='user/*' element={<UserRoutes />} />
        <Route path='admin/*' element={<AdminRoutes />} />
        <Route path='host/*' element={<HostRoutes />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/otpValidate' element={<OtpValidation />} />
        <Route path='/password-confirmation' element={<ConfirmPasswordForm/>}/>
        <Route path='/events' element={<Events/>}/>
      </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
