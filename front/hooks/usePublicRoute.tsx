import { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { UserDataState } from '../redux/slice/userDataSlice';
import { RootState } from '../redux/store';

export const usePublicRoute = () => {
  const { data } = useSelector<RootState, UserDataState>(state => {
    return state.userDataReducer;
  });

  useEffect(() => {
    if (localStorage.getItem('token')) Router.push('/');
  }, [data]);
  return data;
};
