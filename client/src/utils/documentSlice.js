import { createSlice } from "@reduxjs/toolkit";

const documentSlice = createSlice({
  name: "document",
  initialState: {
    document: null,
  },
  reducers: {
    addDocument: (state, action) => {
      state.messages = action.payload;
    },
  },
});

const documentReducer = documentSlice.reducer;

export const { addDocument } = documentSlice.actions;

export default documentReducer;
