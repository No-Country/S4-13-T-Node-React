import { GetUserData } from './../../interfaces/index.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: GetUserData = {
  access_token: '',
  user: {
    username: '',
    email: '',
    role: [],
  },
};

const userDataSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getData: (state, action: PayloadAction<GetUserData>) => {
      const data = action.payload;
      state = data;
    },
  },
});

export const { getData } = userDataSlice.actions;

export default userDataSlice.reducer;
