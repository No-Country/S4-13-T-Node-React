import { GetUserData, ILike, IPost, LoginProps } from './../../interfaces/index.d';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postLogin } from '../../services/auth-calls';
import { WritableDraft } from 'immer/dist/internal';
import { getUserLikes } from '../../services/api-calls';
import { useDispatch } from 'react-redux';

// const fetchUserLikes = createAsyncThunk(
//   'user/likes',
//   async (id: number) => {
//     const res = await getUserLikes(id);
//     return res;
//   }
// )
export interface UserDataState {
  data: GetUserData | null;
  likes: ILike[];
  error: string | null;
  logged: boolean;
}

const initialState: UserDataState = {
  data: {
  access_token: '',
  user: {
    id: '',
    username: '',
    email: '',
    role: [],
    avatar_url: '',
  }},
  likes: [],
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
    getLikes: (state, action: PayloadAction<ILike[]>) => {
      state.likes = action.payload;
    },
    addRemoveLike: (state, action: PayloadAction<ILike>) => {
      if (!state.likes.find(like => like.post.id === action.payload.post.id)) {
        state.likes.push(action.payload)
      } else {
        const likesArray = state.likes.filter(like => like.post.id !== action.payload.post.id)
        console.log(likesArray);
      }
    },
    logout: (state) => {
      state.data = initialState.data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.logged = false;
      return;
    },
    loadAuthData: (state, action: PayloadAction<ILike[]>) => {
      if (localStorage.getItem('token')) {
        const access_token = JSON.parse(localStorage.getItem('token') || '');
        const user = JSON.parse(localStorage.getItem('user') || '');
        state.data = {access_token, user};
        state.logged = true;
        state.likes = action.payload;
      }
    }
  },
});

export const { getData, getLikes, addRemoveLike, logout, loadAuthData } = userDataSlice.actions;

export default userDataSlice.reducer;
