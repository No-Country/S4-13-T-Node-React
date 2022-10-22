import React from 'react';
import { useSelector } from 'react-redux';
import { UserDataState } from '../../redux/slice/userDataSlice';
import { RootState } from '../../redux/store';
import LayoutFormPages from '../layout/LayoutFormPages';

const SignupSuccesful = () => {
  const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);

  return (
    <LayoutFormPages heading="registro">
      <div className="flex flex-col justify-center items-center gap-y-4 p-[32px]">
        <div className="flex flex-col justify-center items-center font-orelega">
          <h2 className="w-[200px] text-2xl text-center">¡Hola {data?.user.username}!</h2>
          <h3 className="text-xl text-center">Te registraste con éxito</h3>
        </div>
        <p className="font-roboto w-[200px] text-center my-3">
          Te podés entretener en tu perfil sumando me gusta de los memes que subas.
        </p>
        <div className="font-roboto w-full flex justify-center">
          <button className="font-bold text-primary text-base leading-[19px] active:text-secondary">Continuar</button>
        </div>
      </div>
    </LayoutFormPages>
  );
};

export default SignupSuccesful;
