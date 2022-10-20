import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem } from '../../../../interfaces';
import { handleModal } from '../../../../redux/slice/modalSlice';
import { UserDataState } from '../../../../redux/slice/userDataSlice';
import { RootState } from '../../../../redux/store';

export const ProfileItem = (props: MenuItem) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data } = useSelector<RootState, UserDataState>(state => {
    return state.userDataReducer;
  });

  const openModal = () => {
    if (!data?.access_token) {
      dispatch(handleModal(true));
    }
  };

  return (
    <div
      className={`flex justify-center items-center w-[180px] h-[42px] lg:w-auto lg:px-4 ${
        router.asPath == props.href ? 'border-2 border-secondary rounded-3xl' : ''
      }`}
      onClick={openModal}
    >
      <Link href={props.href}>
        <a className="flex flex-row gap-2 text-white items-center justify-center text-[20px]">
          <h2 className="capitalize font-orelega">{props.text}</h2>
          {props.icon}
        </a>
      </Link>
    </div>
  );
};
