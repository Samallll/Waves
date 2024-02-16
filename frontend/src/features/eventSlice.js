import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: {},
  event: {},
  jobPost: null,
  userId: "",
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEventDetails: (state, action) => {
      state.event = action.payload.event || {};
      state.location = action.payload.location || {};
      state.jobPost = action.payload.jobPost || null;
      state.userId = action.payload.userId || "";
    },
    updateEventDetails: (state, action) => {
      state.event = { ...state.event, ...action.payload.event };
      state.location = { ...state.location, ...action.payload.location };
      state.jobPost = action.payload.jobPost || state.jobPost;
      state.userId = action.payload.userId || state.userId;
    },
    updateEvent: (state, action) => {
      state.event = { ...state.event, ...action.payload };
    },
    updateLocation: (state, action) => {
      state.location = { ...state.location, ...action.payload };
    },
    updateJobPost: (state, action) => {
      state.jobPost = action.payload || state.jobPost;
    },
    updateUserId: (state, action) => {
      state.userId = action.payload || state.userId;
    },
    setEvent: (state, action) => {
        state.event = action.payload || {};
    },
    setLocation: (state, action) => {
        state.location = action.payload || {};
    },
    setJobPost: (state, action) => {
        state.jobPost = action.payload || null;
    },
    setUserId: (state, action) => {
        state.userId = action.payload || "";
    },
    resetEventDetails: () => initialState,
  },
});

export const {
    addEventDetails,
    updateEventDetails,
    updateEvent,
    updateLocation,
    updateJobPost,
    updateUserId,
    resetEventDetails,
    setEvent,
    setLocation,
    setJobPost,
    setUserId
  } = eventSlice.actions;

export default eventSlice.reducer;
