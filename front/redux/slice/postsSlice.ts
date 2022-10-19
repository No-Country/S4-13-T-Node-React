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
  error: "",
};

const postsSlice = createSlice({
  name: 'posts',
    initialState,
  reducers: {
    requestPosts: (state) => {
      state.isLoading = true;
      state.posts = [];
      return
    },
    getPosts: (state, action: PayloadAction<IPost[]>) => {
        state.posts = action.payload
        state.isLoading = false;
        return
    }
  },
});

export const { getPosts, requestPosts } = postsSlice.actions;

export default postsSlice.reducer;
