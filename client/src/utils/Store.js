import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import chatReducer from "./chatSlice";
import documentReducer from "./documentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    document: documentReducer,
  },
});
export default store;
