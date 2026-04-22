import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [], // Changed from null to [] for safety
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      // If state is an array, .filter works perfectly
      return state.filter((r) => r._id !== action.payload);
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;