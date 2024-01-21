import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    otp:"",
    startTime:"",
    expiryTime:""
}

const otpSlice = createSlice({
    name:'otp',
    initialState,
    reducers:{
        generateOtp(state,action){
            state.otp = action.payload;
            state.startTime = Date.now();
            state.expiryTime = state.startTime + 3 * 60 * 1000;
        },
        resetOtp(state){
            Object.assign(state, initialState);
        }
    }
})

export const { generateOtp, resetOtp } = otpSlice.actions;
export default otpSlice.reducer;