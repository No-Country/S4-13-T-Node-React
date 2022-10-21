import React from 'react';
import { useSelector } from 'react-redux';
import { ChildrenProp } from '../../interfaces';
import { ModalState } from '../../redux/slice/modalSlice';
import { RootState } from '../../redux/store';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import Footer from '../footer/Footer';
import Modal from '../modal/Modal';
import NavContainer from '../navbar/NavContainer';

function Layout(props: ChildrenProp) {
  const { isOpen, modalToOpen } = useSelector<RootState, ModalState>(state => state.modalReducer);

  return (
    <div className="min-h-full flex flex-col items-center select-none ">
      {isOpen && modalToOpen === 'login' && <Modal children={<Login />} />}
      {isOpen && modalToOpen === 'signup' && <Modal children={<Signup />} />}
      <NavContainer />
      {props.children}
      <Footer />
    </div>
  );
}

export default Layout;
