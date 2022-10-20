import React from 'react';
import { useDispatch } from 'react-redux';
import { ChildrenProp } from '../../interfaces';
import { handleModal } from '../../redux/slice/modalSlice';

const Modal = (props: ChildrenProp) => {
  const dispatch = useDispatch();

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (target.id === 'modal') {
      dispatch(handleModal(false));
    }
  };

  return (
    <div
      className="fixed z-[100] h-full w-full min-h-[100vh] min-w-[100vw] flex flex-col justify-center items-center bg-black/[.35]"
      id="modal"
      onClick={closeModal}
    >
      {props.children}
    </div>
  );
};

export default Modal;
