import { createSlice } from "@reduxjs/toolkit";

//TODO: rename it to authSlice and convert reducers into login and logout
const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: null,
  },
  reducers: {
    addUser: (state, actions) => {
      state.userDetails = actions.payload;
    },
    removeUser: (state) => {
      state = null;
    },
  },
});
const userReducer = userSlice.reducer;
export const { addUser, removeUser, setIsAuthenticated } = userSlice.actions;
export default userReducer;
