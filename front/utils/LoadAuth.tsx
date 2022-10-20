import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IFav } from '../interfaces';
import { getFavorites, loadAuthData } from '../redux/slice/userDataSlice';
import { getUserFavorites, getUserLikes } from '../services/api-calls';

const LoadAuth = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('user') && localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {
      const user = JSON.parse(localStorage.getItem('user') || '');
      getUserLikes(user.id).then(res => res && dispatch(loadAuthData(res)));
      getUserFavorites(user.id).then(res => res && dispatch(getFavorites(res.favorites.map((fav: IFav) => fav.post))));
    }
  }, []);

  return <>{children}</>;
};

export default LoadAuth;
