import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAxios } from '../../hooks/useAxios';
import { APIResponseSuccess } from '../../interfaces';
import { handleModal } from '../../redux/slice/modalSlice';
import { getData, getFavorites, getLikes } from '../../redux/slice/userDataSlice';

export const MediaContainer = () => {
  const api = useAxios();
  const dispatch = useDispatch();
  const googleID = process.env.NEXT_PUBLIC_GOOGLE;
  const [error, setError] = useState<string>();

  return (
    <div className="flex flex-col gap-4">
      {error && <span className="text-error text-sm font-roboto">{error}</span>}
      <GoogleOAuthProvider clientId={googleID!}>
        <GoogleLogin
          onSuccess={async credentialResponse => {
            await api
              .post('/login/social', { token: credentialResponse.credential })
              .then(({ data }: APIResponseSuccess) => {
                const userData = data.data;
                dispatch(getData(userData));
                dispatch(handleModal(false));
                const id = userData.user.id;
                api
                  .get(`/user/${id}/likes`)
                  .then(response => {
                    const likes = response.data.data.user.likes;
                    dispatch(getLikes(likes));
                  })
                  .catch(err => console.log(err));
                api
                  .get(`/user/${id}/favorites`)
                  .then(response => {
                    const favorites = response.data.data.user.favorites;
                    dispatch(getFavorites(favorites));
                  })
                  .catch(err => console.log(err));
              })
              .catch(res => {
                setError('El email ya existe. Proba creandote una cuenta.');
              });
          }}
          type="icon"
          shape="square"
          size="large"
          useOneTap
        />
      </GoogleOAuthProvider>
    </div>
  );
};
