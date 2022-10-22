import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem } from '../../../../interfaces';
import { handleModal } from '../../../../redux/slice/modalSlice';
import { UserDataState } from '../../../../redux/slice/userDataSlice';
import { RootState } from '../../../../redux/store';

export const ItemMenu = (props: MenuItem) => {
  const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);

  const dispatch = useDispatch();
  const router = useRouter();

  const openModal = () => {
    if (!data?.access_token && props.text === 'favoritos') {
      dispatch(handleModal(true));
    }
  };

  return (
    <div
      className={`flex justify-center items-center w-[180px] h-[42px] lg:w-auto lg:px-4 transition-all duration-300 ${
        router.pathname == props.href ? 'border-2 border-secondary rounded-3xl' : ''
      } ${props.open ? 'block' : 'hidden'} lg:flex`}
      onClick={openModal}
    >
      <Link href={props.href}>
        <a className="cursor-pointer text-white capitalize font-orelega text-[20px] font-normal">{props.text}</a>
      </Link>
    </div>
  );
};
