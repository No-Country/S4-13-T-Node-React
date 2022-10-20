import { LoginProps, RegisterProps, RegisterResponseError, APIResponseSuccess } from '../interfaces';
import { useAxios } from '../hooks/useAxios';
import { AxiosResponse } from 'axios';

const api = useAxios();

// export const postLogin = async (data: LoginProps) => {
//   try {
//     return await api.post('/login', data).then(res => res.data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getLoginGoogle = async () => {
//   try {
//     return await api.get('login/google').then(res => console.log(res));
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getLoginFacebook = async () => {
//   try {
//     return await api.get('/login/facebook').then(res => console.log(res));
//   } catch (err) {
//     console.log(err);
//   }
// };

export const register = async (data: RegisterProps) => {
  return await api
    .post('/register', data)
    .then((response: APIResponseSuccess) => {
      return response.data;
    })
    .catch((response: RegisterResponseError) => {
      return response.response.data;
    });
};
