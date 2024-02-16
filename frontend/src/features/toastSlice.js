import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    queue:[],
    currentToast:null
}

const toastSlice = createSlice({
    name:"toast",
    initialState,
    reducers:{
        enqueueToast:(state,action)=>{
            state.queue.push(action.payload);
        },
        dequeueToast:(state)=>{
            state.currentToast = state.queue.shift();
        }
    }
});

export const {enqueueToast,dequeueToast} = toastSlice.actions

export default toastSlice.reducer;