import { configureStore } from "@reduxjs/toolkit";
import otpReducer from '../features/otpSlice'
import authReducer from '../features/authSlice'

const store = configureStore({
    reducer:{
        otp: otpReducer,
        auth: authReducer,
    }
})

export default store;