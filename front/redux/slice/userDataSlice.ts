import { GetUserData, LoginProps } from './../../interfaces/index.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postLogin } from '../../services/auth-calls';
import { WritableDraft } from 'immer/dist/internal';

export interface UserDataState {
  data: GetUserData | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: UserDataState = {
  data: {
  access_token: '',
  user: {
    username: '',
    email: '',
    role: [],
  }},
  error: null,
  isLoading: true,
};

const userDataSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getData: (state , action: PayloadAction<GetUserData>) => {
      state.data = action.payload;
      localStorage.setItem('token', JSON.stringify(state.data.access_token));
      return;
    },
    logout: (state) => {
      state = initialState
      localStorage.removeItem('token');
      return;
    }
  },
});

export const { getData, logout } = userDataSlice.actions;

export default userDataSlice.reducer;
