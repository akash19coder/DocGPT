import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, actions) => {
      state = actions.payload;
    },
    removeUser: (state) => {
      state = null;
    },
  },
});
const userReducer = userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
export default userReducer;
