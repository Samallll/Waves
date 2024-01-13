import { configureStore } from "@reduxjs/toolkit";
import pkceReducer from "./slices/pkceSlice";

const store = configureStore({
    reducer:{
        pkce:pkceReducer,
    }
});

export default store;