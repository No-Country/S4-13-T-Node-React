import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAxios } from '../../hooks/useAxios';
import { handleModal, ModalState } from '../../redux/slice/modalSlice';
import { RootState } from '../../redux/store';
import LayoutProfile from '../layout/LayoutProfile';

function DeleteComment() {
  const { commentToDelete } = useSelector<RootState, ModalState>(state => state.modalReducer);

  const api = useAxios();
  const dispatch = useDispatch();
  const router = useRouter();
  const deleteComment = () => {
    api
      .delete(`/comment/${commentToDelete}`)
      .then(res => {
        console.log(res);
        router.reload();
      })
      .catch(err => console.log(err));
  };
  const closeModal = () => {
    dispatch(handleModal(false));
  };
  return (
    <LayoutProfile heading="Eliminar">
      <div className="flex flex-col justify-center items-center gap-y-4 p-[32px]">
        <div className="flex flex-col justify-center items-center font-orelega">
          <h3 className="text-xl text-center">Vas a eliminar el comentario</h3>
        </div>
        <p className="font-roboto w-[200px] text-center my-3">Una vez eliminado no se recupera</p>
        <div className="font-roboto w-full flex justify-around gap-x-8">
          <button
            className="font-bold text-primary text-base leading-[19px] active:text-secondary cursor-pointer"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            className="font-bold text-primary text-base leading-[19px] border-2 border-primary rounded-lg py-2 px-4 active:text-secondary active:border-secondary"
            onClick={deleteComment}
          >
            Continuar
          </button>
        </div>
      </div>
    </LayoutProfile>
  );
}

export default DeleteComment;
