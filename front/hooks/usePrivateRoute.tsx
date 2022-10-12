import { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { UserDataState } from '../redux/slice/userDataSlice';
import { RootState } from '../redux/store';

export const usePrivateRoute = () => {
  const { data } = useSelector<RootState, UserDataState>(state => {
    return state.userDataReducer;
  });
  useEffect(() => {
    // if (!data?.access_token) Router.push('/login');
    if (!localStorage.getItem('token')) Router.push('/login');
  }, [data]);
  return data;
};
