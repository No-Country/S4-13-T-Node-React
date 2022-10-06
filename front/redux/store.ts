import { configureStore } from '@reduxjs/toolkit';
import userSignupReducer from './slice/userSignupSlice';
import userLoginReducer from './slice/userLoginSlice';
import userDataReducer from './slice/userDataSlice';

export const store = configureStore({
  reducer: {
    userSignupReducer,
    userLoginReducer,
    userDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
