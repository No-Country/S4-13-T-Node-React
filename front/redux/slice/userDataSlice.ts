import { GetUserData, IFavorite, ILike, IPost } from './../../interfaces/index.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  favorites: IFavorite[];
  error: string | null;
  logged: boolean;
}

const initialState: UserDataState = {
  data: {
    access_token: '',
    refresh_token: '',
    user: {
      id: null,
      username: '',
      email: '',
      role: [],
      avatar_url: '',
      created_at: null,
      deleted_at: null,
      facebook_id: null,
      google_id: null,
      updated_at: null,
    },
  },
  likes: [],
  favorites: [],
  error: null,
  logged: false,
};

const userDataSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getData: (state, action: PayloadAction<GetUserData>) => {
      state.data = action.payload;
      localStorage.setItem('access_token', JSON.stringify(state.data.access_token));
      localStorage.setItem('refresh_token', JSON.stringify(state.data.refresh_token));
      localStorage.setItem('user', JSON.stringify(state.data.user));
      state.logged = true;
      return;
    },
    getLikes: (state, action: PayloadAction<ILike[]>) => {
      state.likes = action.payload;
    },
    addRemoveLike: (state, action: PayloadAction<{ post: { id: number }; liked: boolean }>) => {
      if (action.payload.liked) {
        state.likes.push(action.payload);
      } else {
        const likesArray = state.likes.filter(like => like.post.id !== action.payload.post.id);
        state.likes = likesArray;
      }
    },
    getFavorites: (state, action: PayloadAction<IFavorite[]>) => {
      state.favorites = action.payload;
    },
    addRemoveFav: (state, action: PayloadAction<{ post: { id: number }; favorited: boolean }>) => {
      if (action.payload.favorited) {
        state.favorites.push(action.payload);
      } else {
        const favoritesArray = state.favorites.filter(favorite => favorite.post.id !== action.payload.post.id);
        state.favorites = favoritesArray;
      }
    },
    logout: state => {
      state.data = initialState.data;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      state.likes = initialState.likes;
      state.favorites = initialState.favorites;
      state.logged = false;
      return;
    },
    loadAuthData: (state, action: PayloadAction<{ likes: ILike[]; favorites: IFavorite[] }>) => {
      if (localStorage.getItem('access_token')) {
        const access_token = JSON.parse(localStorage.getItem('access_token') || '');
        const refresh_token = JSON.parse(localStorage.getItem('refresh_token') || '');
        const user = JSON.parse(localStorage.getItem('user') || '');
        state.data = { access_token, user, refresh_token };
        state.logged = true;
        state.likes = action.payload.likes;
        state.favorites = action.payload.favorites;
      }
    },
    setTokens: (state, action: PayloadAction<{ access_token: string; refresh_token: string }>) => {
      state.data!.access_token = action.payload.access_token;
      state.data!.refresh_token = action.payload.refresh_token;
      return;
    },
    changeUserData: (state, action: PayloadAction<{ username?: string; avatar_url?: string; email?: string }>) => {
      const { avatar_url, email, username } = action.payload;
      console.log(avatar_url, email, username);
      if (username) state.data!.user.username = username;
      if (email) state.data!.user.email = email;
      if (avatar_url) state.data!.user.avatar_url = avatar_url;
    },
  },
});

export const {
  getData,
  getLikes,
  addRemoveLike,
  getFavorites,
  addRemoveFav,
  logout,
  loadAuthData,
  setTokens,
  changeUserData,
} = userDataSlice.actions;

export default userDataSlice.reducer;
