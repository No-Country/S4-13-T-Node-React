import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleModal, handleToOpen } from '../../redux/slice/modalSlice';
import { UserDataState } from '../../redux/slice/userDataSlice';
import { RootState } from '../../redux/store';
import LayoutFormPages from '../layout/LayoutFormPages';

const LoginSuccesful = () => {
  const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(handleModal(false));
  };
  return (
    <LayoutFormPages heading="ingreso">
      <div className="flex flex-col justify-center items-center gap-y-4 p-[32px]">
        <div className="flex flex-col justify-center items-center font-orelega">
          <h2 className="w-[200px] text-2xl text-center">¡Hola {data?.user.username}!</h2>
          <h3 className="text-xl text-center">Ingresaste con éxito</h3>
        </div>
        <p className="font-roboto w-[230px] text-center my-3">Es un buen día para subir un meme.</p>
        <div className="font-roboto w-full flex justify-center">
          <button
            className="font-bold text-primary text-base leading-[19px] active:text-secondary"
            onClick={closeModal}
          >
            Continuar
          </button>
        </div>
      </div>
    </LayoutFormPages>
  );
};

export default LoginSuccesful;
