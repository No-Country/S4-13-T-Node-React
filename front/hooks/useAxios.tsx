import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      // "access_token": //lo agarra de redux
    },
  });

  // axiosInstance.interceptors.request.use(async req => {
  //   await axios.post(`${BASE_URL}/post`, {}).then(res => console.log(res));

  //   return req;
  // });

  return axiosInstance;
};

export default useAxios;
