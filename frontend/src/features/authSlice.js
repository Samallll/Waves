import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const getLoggedUserFromLocalStorage = () => {
    try{
        return JSON.parse(localStorage.getItem('logged_user') || '')
    }
    catch{
        return null;
    }
};

export const fetchLoggedUser = createAsyncThunk("auth/fetchLoggedUser", async (email) => {
    try {
       const response = await fetch(`http://127.0.0.1:8090/api/v1/user/email/${email}`);
       const loggedUser = await response.json();
       localStorage.setItem('logged_user',JSON.stringify(loggedUser));
       return loggedUser;
    } catch (error) {
       console.error('Error fetching logged user:', error);
       throw error; 
    }
   });
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
            state.isAuthenticated = true;
            localStorage.setItem('logged_user', JSON.stringify(state.loggedUser));
        },
        updateLoggedUser(state,action){
            state.loggedUser = {
                ...state.loggedUser,
                role: action.payload.role !== undefined ? action.payload.role : state.loggedUser.role,
                email: action.payload.email !== undefined ? action.payload.email : state.loggedUser.email,
              };
              localStorage.setItem('logged_user', JSON.stringify(state.loggedUser));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoggedUser.pending, (state, action) => {
                console.log("Fetching the data from backend");
            })
            .addCase(fetchLoggedUser.fulfilled, (state, action) => {
                console.log("Fetching completed..");
                state.loggedUser = action.payload;
                console.log(action.payload);
                console.log("Success");
            })
            .addCase(fetchLoggedUser.rejected, (state, action) => {
                console.log("Failed");
                state.error = action.error;
            });
    }
})

export const {updateLoggedUser,setLoggedUser} = authSlice.actions
export default authSlice.reducer;