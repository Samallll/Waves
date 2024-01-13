import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    codeVerifier: '',
    codeChallenge: '',
  };
  
  const pkceSlice = createSlice({
    name: 'pkce',
    initialState,
    reducers: {
      setCodeVerifier: (state, action) => {
        state.codeVerifier = action.payload;
      },
      setCodeChallenge: (state, action) => {
        state.codeChallenge = action.payload;
      },
    },
  });

export const { setCodeVerifier, setCodeChallenge } = pkceSlice.actions;
export default pkceSlice.reducer;