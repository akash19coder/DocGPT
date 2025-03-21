import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      if (action.payload !== null || action.payload !== undefined) {
        state.messages.push(action.payload);
      }
    },
  },
});

const chatReducer = chatSlice.reducer;

export const { addMessage } = chatSlice.actions;

export default chatReducer;
