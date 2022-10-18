import { postLogin } from './../../services/auth-calls';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LoginProps } from '../../interfaces';

const initialState: LoginProps = {
  username: '',
  password: '',
};

export const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginProps>) => {
      //todo peticion al back para que verifique si existe el usuario
      state = action.payload;
      postLogin(state).then(resp => {
        const userData = resp;
        console.log(userData);
        return userData;
      });
      return;
    },
  },
});

export const { login } = userLoginSlice.actions;

export default userLoginSlice.reducer;
