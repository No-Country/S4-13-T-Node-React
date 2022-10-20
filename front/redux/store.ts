import { configureStore } from '@reduxjs/toolkit';
import userDataReducer from './slice/userDataSlice';
import postsReducer from './slice/postsSlice';
import postReducer from './slice/postSlice';

export const store = configureStore({
  reducer: {
    userDataReducer,
    postsReducer,
    postReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
