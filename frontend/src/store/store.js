import { configureStore } from "@reduxjs/toolkit";
import otpReducer from '../features/otpSlice'
import authReducer from '../features/authSlice'
import toastReducer from '../features/toastSlice'
import eventReducer from '../features/eventSlice'

const store = configureStore({
    reducer:{
        otp: otpReducer,
        auth: authReducer,
        toast: toastReducer,
        event: eventReducer
    },
})

export default store;