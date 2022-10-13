import { GetUserData, LoginProps } from './../../interfaces/index.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postLogin } from '../../services/auth-calls';
import { WritableDraft } from 'immer/dist/internal';

export interface UserDataState {
  data: GetUserData | null;
  error: string | null;
  logged: boolean;
}

const initialState: UserDataState = {
  data: {
  access_token: '',
  user: {
    username: '',
    email: '',
    role: [],
    avatar_url: '',
  }},
  error: null,
  logged: false,
};

const userDataSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getData: (state , action: PayloadAction<GetUserData>) => {
      state.data = action.payload;
      localStorage.setItem('token', JSON.stringify(state.data.access_token));
      localStorage.setItem('user', JSON.stringify(state.data.user));
      state.logged = true;
      return;
    },
    logout: (state) => {
      state.data = initialState.data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.logged = false;
      return;
    },
    loadAuthData: (state) => {
      if (localStorage.getItem('token')) {
        const access_token = JSON.parse(localStorage.getItem('token') || '');
        const user = JSON.parse(localStorage.getItem('user') || '');
        state.data = {access_token, user};
        state.logged = true;
      }
    }
  },
});

export const { getData, logout, loadAuthData } = userDataSlice.actions;

export default userDataSlice.reducer;
