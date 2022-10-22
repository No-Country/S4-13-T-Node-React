import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ChildrenProp, IFavorite } from '../interfaces';
import { getFavorites, loadAuthData } from '../redux/slice/userDataSlice';
import { useAxios } from '../hooks/useAxios';

const LoadAuth = (props: ChildrenProp) => {
  const dispatch = useDispatch();
  const api = useAxios();

  useEffect(() => {
    if (localStorage.getItem('user') && localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {
      const user = JSON.parse(localStorage.getItem('user')!);
      api.get(`/user/${user.id}/likes`).then(res => {
        const likes = res.data.data.user.likes;
        api.get(`/user/${user.id}/favorites`).then(res => {
          const favorites = res.data.data.user.favorites;
          dispatch(loadAuthData({ likes, favorites }));
        });
      });
    }
  }, []);

  return <>{props.children}</>;
};

export default LoadAuth;
