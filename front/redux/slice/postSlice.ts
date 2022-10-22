import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment, IPost } from '../../interfaces';

export interface PostState {
  post: IPost | null;
  comments: IComment[];
  error: string | null;
}

export interface PayloadAddComment {
  comment: string;
  email: string;
  username: string;
  avatar_url: string;
}

const initialState: PostState = {
  post: null,
  comments: [],
  error: '',
};

const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPost: (state, action: PayloadAction<IPost>) => {
      state.post = action.payload;
      state.comments = action.payload.comments!;
      return;
    },
    addComment: (state, action: PayloadAction<PayloadAddComment>) => {
      const date = new Date();
      state.comments = [
        ...state.comments,
        {
          comment: action.payload.comment,
          user: {
            email: action.payload.email,
            username: action.payload.username,
            avatar_url: action.payload.avatar_url,
          },
          created_at: date,
          // id: action.payload.id
        },
      ];

      return;
    },
    handleLikesCount: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.post = { ...state.post!, likesCount: state.post?.likesCount! + 1 };
      } else {
        state.post = { ...state.post!, likesCount: state.post?.likesCount! - 1 };
      }
    },
  },
});

export const { getPost, addComment, handleLikesCount } = postsSlice.actions;

export default postsSlice.reducer;
