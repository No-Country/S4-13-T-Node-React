import axios from 'axios';

const NODE_ENV = process.env.NODE_ENV;

let BASE_URL: string | undefined;

if (NODE_ENV === 'production') {
  BASE_URL = process.env.NEXT_PUBLIC_API_URL_PRODUCTION;
} else {
  BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT;
}

export const useAxios = (token?: string) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      access_token: token || '',
    },
  });

  // axiosInstance.interceptors.request.use(async req => {
  //   await axios.post(`${BASE_URL}/post`, {}).then(res => console.log(res));

  //   return req;
  // });

  return axiosInstance;
};
