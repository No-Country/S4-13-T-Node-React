import { LoginProps } from '../interfaces';
import useAxios from '../hooks/useAxios';

const api = useAxios();

export const postLogin = async (data: LoginProps) => {
  try {
    return await api.post('/login', data).then(res => res);
  } catch (err) {
    console.log(err);
  }
};
