import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalToOpen = 'login' | 'signup';

export interface ModalState {
  isOpen: boolean;
  modalToOpen: ModalToOpen;
}

const initialState: ModalState = {
  isOpen: false,
  modalToOpen: 'login',
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
    handleToOpen: (state, action: PayloadAction<'login' | 'signup'>) => {
      state.modalToOpen = action.payload;
      return;
    },
  },
});

export const { handleModal, handleToOpen } = modalSlice.actions;

export default modalSlice.reducer;
