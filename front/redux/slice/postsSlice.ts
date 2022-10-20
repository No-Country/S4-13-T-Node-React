import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../../interfaces';

export interface PostsState {
  posts: IPost[];
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  error: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    requestPosts: state => {
      state.posts = [];
      return;
    },
    getPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
      return;
    },
    requestFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { getPosts, requestPosts, requestFailure } = postsSlice.actions;

export default postsSlice.reducer;
