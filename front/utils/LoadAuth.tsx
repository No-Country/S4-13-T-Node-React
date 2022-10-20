import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
<<<<<<< HEAD
import { IFav } from '../interfaces';
import { getFavorites, loadAuthData } from '../redux/slice/userDataSlice';
import { useAxios } from '../hooks/useAxios';
=======
import { useAxios } from '../hooks/useAxios';
import { loadAuthData } from '../redux/slice/userDataSlice';
>>>>>>> dev

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
<<<<<<< HEAD
      api.get(`/user/${user.id}/favorites`).then(res => {
        const favorites = res.data.data.user.favorites.map((fav: IFav) => fav.post);
        dispatch(getFavorites(favorites));
      });
=======
>>>>>>> dev
    }
  }, []);

  return <>{children}</>;
};

export default LoadAuth;
