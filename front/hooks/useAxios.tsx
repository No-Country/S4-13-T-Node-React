import axios from 'axios';
import { useSelector } from 'react-redux';
import { UserDataState } from '../redux/slice/userDataSlice';
import { RootState } from '../redux/store';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const useAxios = () => {
  // const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);
  // const access_token = data?.access_token || '';

  // console.log(data);

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      // access_token: token,
    },
  });

  // axiosInstance.interceptors.request.use(async req => {
  //   await axios.post(`${BASE_URL}/post`, {}).then(res => console.log(res));

  //   return req;
  // });

  return axiosInstance;
};
