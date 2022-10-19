import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook';
import { useDispatch } from 'react-redux';
import { useAxios } from '../../hooks/useAxios';
import { APIResponseSuccess } from '../../interfaces';
import { getData } from '../../redux/slice/userDataSlice';

export const MediaContainer = () => {
  const api = useAxios();
  const dispatch = useDispatch();
  const googleID = process.env.NEXT_PUBLIC_GOOGLE;
  const facebookID = process.env.NEXT_PUBLIC_FACEBOOK;

  return (
    <div className="flex flex-col gap-4">
      <GoogleOAuthProvider clientId={googleID!}>
        <GoogleLogin
          onSuccess={async credentialResponse => {
            await api
              .post('/login/social', { token: credentialResponse.credential })
              .then(({ data }: APIResponseSuccess) => {
                dispatch(getData(data.data));
              })
              .catch(res => {
                console.log(res);
              });
          }}
          type="icon"
          shape="square"
          size="large"
        />
      </GoogleOAuthProvider>
      <FacebookProvider appId={facebookID}>
        <LoginButton
          onSuccess={(response: any) => {
            console.log(response);
          }}
          scope="email"
        >
          Continuar con Facebook
        </LoginButton>
      </FacebookProvider>
      {/* <MediaButton social="facebook" /> */}
    </div>
  );
};
