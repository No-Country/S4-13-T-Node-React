import axios from 'axios';
import { PostPropsAxios } from '../interfaces';

const BASE_URL = process.env.API_URL;

const useAxios = (post?: PostPropsAxios) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  axiosInstance.interceptors.request.use(async req => {
    await axios.post(`${BASE_URL}/post`, { post }).then(res => console.log(res));

    return req;
  });

  axiosInstance.interceptors.response.use(async res => {
    await axios(`${BASE_URL}/post/:id`);

    return res;
  });
};

export default useAxios;
