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

  return (
    <div className="flex flex-col gap-4">
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
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
      <FacebookProvider appId="848423013179412">
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
