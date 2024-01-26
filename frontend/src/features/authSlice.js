import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_USER_SERVICE_BASE_URI

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
       const response = await fetch(`${baseUrl}/email/${email}`);
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
                emailId: action.payload.emailId !== undefined ? action.payload.emailId : state.loggedUser.emailId,
                fullName: action.payload.fullName !== undefined ? action.payload.fullName : state.loggedUser.fullName,
                phoneNumber: action.payload.phoneNumber !== undefined ? action.payload.phoneNumber : state.loggedUser.phoneNumber,
                userId: action.payload.userId !== undefined ? action.payload.userId : state.loggedUser.userId,
                isLocked: action.payload.userId !== undefined ? action.payload.isLocked : state.loggedUser.isLocked
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
                console.log("Completed fetching..");
                state.loggedUser = action.payload;
            })
            .addCase(fetchLoggedUser.rejected, (state, action) => {
                console.log("Failed");
                state.error = action.error;
            });
    }
})

export const {updateLoggedUser,setLoggedUser} = authSlice.actions
export default authSlice.reducer;