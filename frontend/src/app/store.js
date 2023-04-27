import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import photosReducer from "../features/photos/photosSlice";
import commentReducer from '../features/comments/commentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    photo: photosReducer,
    comment: commentReducer
  },
});
