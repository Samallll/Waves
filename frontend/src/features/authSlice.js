import { createSlice } from "@reduxjs/toolkit";

const getLoggedUserFromLocalStorage = () => {
    try{
        return JSON.parse(localStorage.getItem('logged_user') || '')
    }
    catch{
        return null;
    }
};

const initialState = {
    loggedUser: getLoggedUserFromLocalStorage(),
    isAuthenticated: false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLoggedUser(state,action){
            state.loggedUser = action.payload;
            localStorage.setItem('logged_user', JSON.stringify(state.loggedUser));
        },
        setAuthenticated(state,action){
            state.isAuthenticated = action.payload;
        },
        updateLoggedUser(state,action){
            state.loggedUser = {
                ...state.loggedUser,
                role: action.payload.role !== undefined ? action.payload.role : state.loggedUser.role,
                email: action.payload.email !== undefined ? action.payload.email : state.loggedUser.email,
              };
              localStorage.setItem('logged_user', JSON.stringify(state.loggedUser));
        }
    }
})

export const {setAuthenticated,setLoggedUser} = authSlice.actions
export default authSlice.reducer;