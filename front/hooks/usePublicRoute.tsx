import { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { UserDataState } from '../redux/slice/userDataSlice';
import { RootState } from '../redux/store';

export const usePublicRoute = () => {
  const { data, logged } = useSelector<RootState, UserDataState>(state => {
    return state.userDataReducer;
  });

  useEffect(() => {
    if (logged) Router.push('/');
  }, [logged]);
  return data;
};
