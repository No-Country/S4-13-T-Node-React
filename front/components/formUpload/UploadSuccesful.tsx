import React from 'react';
import { useSelector } from 'react-redux';
import { UserDataState } from '../../redux/slice/userDataSlice';
import { RootState } from '../../redux/store';
import LayoutProfile from '../layout/LayoutProfile';

const UploadSuccesful = () => {
  const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);

  return (
    <LayoutProfile heading="Meme subido">
      <div className="flex flex-col justify-center items-center gap-y-4 p-[32px]">
        <div className="flex flex-col justify-center items-center font-orelega">
          <h2 className="w-[200px] text-2xl text-center">Subida exitosa</h2>
          <h3 className="text-xl text-center text-accent">Tu meme ya está en Memex</h3>
        </div>
        <p className="font-roboto w-[200px] text-center my-3">¿Cuántos me gusta acumulará?</p>
        <div className="font-roboto w-full flex justify-center">
          <a
            href={`/profile?id=${data?.user.id}`}
            className="font-bold text-primary text-base leading-[19px] active:text-secondary"
          >
            Continuar
          </a>
        </div>
      </div>
    </LayoutProfile>
  );
};

export default UploadSuccesful;
