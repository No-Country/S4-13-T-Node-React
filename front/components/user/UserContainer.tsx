import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slice/userDataSlice';
import Avatar from './avatar/Avatar';
import DataUser from './dataUser/DataUser';

const UserContainer = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex gap-x-32 justify-start content-between">
        <div className="flex flex-col mt-5">
          <h1 className="text-text font-normal text-2xl font-orelega">Perfil</h1>
          <h6 className="text-accent text-xs">
            <button onClick={() => dispatch(logout())}>Cerrar Sesión</button>
          </h6>
        </div>
        <button className="mt-4 font-roboto font-bold text-primary text-base leading-[19px] border-2 border-primary rounded-lg py-1 px-4 active:text-secondary active:border-secondary">
          Subir meme
        </button>
      </div>
      <div className="flex flex row">
        <DataUser />
        <Avatar />
      </div>
    </>
  );
};

export default UserContainer;
