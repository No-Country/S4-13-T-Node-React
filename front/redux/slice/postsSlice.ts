import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../../interfaces';

export interface PostsState {
  posts: IPost[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  isLoading: true,
  error: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    requestPosts: state => {
      state.isLoading = true;
      state.posts = [];
      return;
    },
    getPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
      state.isLoading = false;
      return;
    },
    requestFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    handleLoading: state => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { getPosts, requestPosts, requestFailure, handleLoading } = postsSlice.actions;

export default postsSlice.reducer;
