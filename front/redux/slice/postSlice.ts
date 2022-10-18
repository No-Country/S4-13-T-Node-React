import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../../interfaces';

export interface PostState {
    post: IPost | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: PostState = {
  post: null,
  isLoading: true,
  error: "",
};

const postsSlice = createSlice({
  name: 'post',
    initialState,
  reducers: {
    getPost: (state, action: PayloadAction<IPost>) => {
        state.post = action.payload;
        state.isLoading = false;
        return
    }
  },
});

export const { getPost } = postsSlice.actions;

export default postsSlice.reducer;
