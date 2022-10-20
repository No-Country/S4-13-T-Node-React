import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAxios } from '../hooks/useAxios';
import { loadAuthData } from '../redux/slice/userDataSlice';

const LoadAuth = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const api = useAxios();

  useEffect(() => {
    if (localStorage.getItem('user') && localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {
      const user = JSON.parse(localStorage.getItem('user')!);
      api.get(`/user/${user.id}/likes`).then(res => {
        const likes = res.data.data.user.likes;
        dispatch(loadAuthData(likes));
      });
    }
  }, []);

  return <>{children}</>;
};

export default LoadAuth;
