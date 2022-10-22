import React from 'react';
import { useSelector } from 'react-redux';
import { ChildrenProp } from '../../interfaces';
import { ModalState } from '../../redux/slice/modalSlice';
import { RootState } from '../../redux/store';
import Login from '../auth/Login';
import LoginSuccesful from '../auth/LoginSuccesful';
import Logout from '../auth/Logout';
import Signup from '../auth/Signup';
import Footer from '../footer/Footer';
import FormEditProfile from '../formEditProfile/FormEditProfile';
import UploadSuccesful from '../formUpload/UploadSuccesful';
import Loading from '../loading/Loading';
import Modal from '../modal/Modal';
import NavContainer from '../navbar/NavContainer';

function Layout(props: ChildrenProp) {
  const { isOpen, modalToOpen } = useSelector<RootState, ModalState>(state => state.modalReducer);

  return (
    <div className="min-h-screen flex flex-col items-center select-none ">
      {isOpen && modalToOpen === 'login' && <Modal children={<Login />} />}
      {isOpen && modalToOpen === 'loginSuccessful' && <Modal children={<LoginSuccesful />} />}
      {isOpen && modalToOpen === 'signup' && <Modal children={<Signup />} />}
      {isOpen && modalToOpen === 'editProfile' && <Modal children={<FormEditProfile />} />}
      {isOpen && modalToOpen === 'loading' && <Modal canClose={false} children={<Loading />} />}
      {isOpen && modalToOpen === 'upload' && <Modal children={<UploadSuccesful />} />}
      {isOpen && modalToOpen === 'logout' && <Modal children={<Logout />} />}
      <NavContainer />
      {props.children}
      <Footer />
    </div>
  );
}

export default Layout;
