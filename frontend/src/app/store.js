import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import photosReducer from "../features/photos/photosSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    photo: photosReducer,
  },
});
