import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, UserDataState } from '../../redux/slice/userDataSlice';
import { RootState } from '../../redux/store';
import Avatar from './avatar/Avatar';
import DataUser from './dataUser/DataUser';

const UserContainer = ({ user, id }: { user: any; id: number }) => {
  const dispatch = useDispatch();
  const route = useRouter();

  const { data, logged } = useSelector<RootState, UserDataState>(state => state.userDataReducer);

  const handleLogout = () => {
    route.push('/');
    dispatch(logout());
  };

  return (
    <>
      <div className="flex gap-x-36 justify-center items-center mt-[56px]">
        <div className="flex flex-col mt-5">
          <h1 className="text-text font-normal text-2xl font-orelega">Perfil</h1>
          {id == data?.user.id && (
            <h6 className="text-accent text-xs">
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </h6>
          )}
        </div>
        {/* {id == data?.user.id && ( */}
        <button
          className={`h-[40px] mt-4 font-roboto font-bold text-primary text-base leading-[19px] border-2 border-primary rounded-lg py-1 px-4 active:text-secondary active:border-secondary ${
            id === data?.user.id || 'opacity-0 cursor-default'
          }`}
        >
          Subir meme
        </button>
        {/* )} */}
      </div>
      <div className="flex row">
        <DataUser user={user} id={id} />
        <Avatar user={user} />
      </div>
    </>
  );
};

export default UserContainer;
