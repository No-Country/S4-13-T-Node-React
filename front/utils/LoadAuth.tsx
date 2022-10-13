import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadAuthData } from '../redux/slice/userDataSlice';

const LoadAuth = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAuthData());
  }, [dispatch]);

  return <>{children}</>;
};

export default LoadAuth;
