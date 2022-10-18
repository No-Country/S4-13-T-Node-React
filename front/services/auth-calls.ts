import { LoginProps } from '../interfaces';
import {useAxios} from '../hooks/useAxios';

const api = useAxios();

export const postLogin = async (data: LoginProps) => {
  try {
    return await api.post('/login', data).then(res => res.data);
  } catch (err) {
    console.log(err);
  }
};

export const getLoginGoogle = async () => {
  try {
    return await api.get('login/google').then(res => console.log(res));
  } catch (err) {
    console.log(err)
  }
}

export const getLoginFacebook = async () => {
  try {
    return await api.get('/login/facebook').then(res => console.log(res));
  } catch (err) {
    console.log(err)
  }
}