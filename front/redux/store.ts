import { configureStore } from '@reduxjs/toolkit';
import userSignupReducer from './slice/userSignupSlice';
import userLoginReducer from './slice/userLoginSlice';

export const store = configureStore({
  reducer: {
    userSignupReducer,
    userLoginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
