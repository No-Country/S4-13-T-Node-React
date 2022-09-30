import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LoginProps } from '../../interfaces';

const initialState: LoginProps = {
  username: '',
  email: '',
  password: '',
};

export const userLoginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginProps>) => {
      //todo peticion al back para que verifique si existe el usuario

      //codigo provisorio
      const credentials = action.payload;
      if (credentials.email === 'a@oba.com' && credentials.password === '123456') {
        console.log('sesion iniciada!');
        return credentials;
      }
      return;
    },
  },
});

export const { login } = userLoginSlice.actions;

export default userLoginSlice.reducer;
