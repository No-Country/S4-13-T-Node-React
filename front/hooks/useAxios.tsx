import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { setTokens } from '../redux/slice/userDataSlice';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
const NODE_ENV = process.env.NODE_ENV;
let BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const useAxios = (access_token?: string, refresh_token?: string, dispatch?: Dispatch<AnyAction>) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      access_token: access_token || '',
      refresh_token: refresh_token || '',
    },
  });

  axiosInstance.interceptors.request.use(async req => {
    if (access_token && dispatch) {
      req.headers!['access_token'] = access_token;
      const tokenDecoded: any = jwt_decode(access_token);
      const isExpired = dayjs.unix(tokenDecoded!.exp).diff(dayjs()) < 1;
      if (!isExpired) return req;

      const res = await axios.post(
        `${BASE_URL}/refresh`,
        {},
        {
          withCredentials: true,
          headers: {
            refresh_token: refresh_token!,
          },
        }
      );

      dispatch!(setTokens({ access_token: res.data.data.access_token, refresh_token: res.data.data.refresh_token }));

      req.headers!['access_token'] = res.data.data.access_token;
    }

    return req;
  });

  return axiosInstance;
};
