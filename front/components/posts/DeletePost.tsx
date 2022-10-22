import React from 'react';
import { useDispatch } from 'react-redux';
import { handleModal } from '../../redux/slice/modalSlice';
import LayoutFormPages from '../layout/LayoutFormPages';
import Modal from '../modal/Modal';

const DeletePost = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(handleModal(false));
  };
  return (
    <Modal>
      <LayoutFormPages heading="Eliminar">
        <div className="flex flex-col justify-center items-center gap-y-4 p-[32px]">
          <div className="flex flex-col justify-center items-center font-orelega">
            <h3 className="text-xl text-center">Vas a eliminar el meme</h3>
          </div>
          <p className="font-roboto w-[200px] text-center my-3">Una vez eliminado no se recupera.</p>
          <div className="font-roboto w-full flex justify-around gap-x-5">
            <button
              className="font-bold text-primary text-base leading-[19px] active:text-secondary cursor-pointer"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button className="font-bold text-primary text-base leading-[19px] border-2 border-primary rounded-lg py-2 px-4 active:text-secondary active:border-secondary">
              Eliminar
            </button>
          </div>
        </div>
      </LayoutFormPages>
    </Modal>
  );
};

export default DeletePost;
