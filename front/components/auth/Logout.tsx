import React from 'react';
import { useSelector } from 'react-redux';
import { UserDataState } from '../../redux/slice/userDataSlice';
import { RootState } from '../../redux/store';
import LayoutProfile from '../layout/LayoutProfile';
import Modal from '../modal/Modal';

const Logout = () => {
  const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);

  return (
    <Modal>
      <LayoutProfile heading="Cerrar sesión">
        <div className="flex flex-col justify-center items-center gap-y-4 p-[32px]">
          <div className="flex flex-col justify-center items-center font-orelega">
            <h2 className="w-[200px] text-2xl text-center">Hasta la próxima {data?.user.username}</h2>
            <h3 className="text-xl text-center">Vas a cerrar la sesión</h3>
          </div>
          <p className="font-roboto w-[200px] text-center my-3">Los memes siempre aquí dispuestos a divertirte</p>
          <div className="font-roboto w-full flex justify-around gap-x-8">
            <button className="font-bold text-primary text-base leading-[19px] active:text-secondary">Cancelar</button>
            <button className="font-bold text-primary text-base leading-[19px] border-2 border-primary rounded-lg py-2 px-4 active:text-secondary active:border-secondary">
              Continuar
            </button>
          </div>
        </div>
      </LayoutProfile>
    </Modal>
  );
};

export default Logout;