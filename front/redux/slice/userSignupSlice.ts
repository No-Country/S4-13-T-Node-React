import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RegisterProps } from '../../interfaces';

const initialState: RegisterProps = {
  username: '',
  email: '',
  password: '',
};

export const userSignUpSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<RegisterProps>) => {
      //todo peticion al back para verificar q no exista el usuario y crearlo

      //codigo provisorio
      const { username, email, password } = action.payload;
      if (username && email && password) {
        let newUser = { username, email, password };
        state = newUser;
      }
      console.log('cuenta creada!', state);
    },
  },
});

export const { signup } = userSignUpSlice.actions;

export default userSignUpSlice.reducer;
