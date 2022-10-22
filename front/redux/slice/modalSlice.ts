import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalToOpen =
  | 'login'
  | 'loginSuccessful'
  | 'signup'
  | 'signupSuccessFul'
  | 'editProfile'
  | 'loading'
  | 'upload'
  | 'logout'
  | 'deletePost'
  | 'deleteComment';

export interface ModalState {
  isOpen: boolean;
  modalToOpen: ModalToOpen;
  postToDelete: number | null;
  commentToDelete: number | null;
}

const initialState: ModalState = {
  isOpen: false,
  modalToOpen: 'login',
  postToDelete: null,
  commentToDelete: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    handleModal: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
      if (state.isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        state.modalToOpen = 'login';
        document.body.style.overflow = 'auto';
      }
      return;
    },
    handleToOpen: (state, action: PayloadAction<ModalToOpen>) => {
      state.modalToOpen = action.payload;
      return;
    },
    changePostToDelete: (state, action: PayloadAction<number>) => {
      state.postToDelete = action.payload;
    },
    changeCommentToDelete: (state, action: PayloadAction<number>) => {
      state.commentToDelete = action.payload;
    },
  },
});

export const { handleModal, handleToOpen, changePostToDelete, changeCommentToDelete } = modalSlice.actions;

export default modalSlice.reducer;
