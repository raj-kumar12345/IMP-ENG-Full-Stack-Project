import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import courseReducer from '../features/courseSlice'


export const store = configureStore({
  reducer: {
    auth: userReducer,
    course: courseReducer,
  },
});