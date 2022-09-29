import { AxiosError, AxiosResponse } from 'axios';
import useAxios from '../hooks/useAxios';
import { PostPropsAxios } from '../interfaces';

const api = useAxios();

export interface IPost {
  id: number;
  title: string;
  mediaURL: string;
  tag: string;
  likesCount: number;
  commentsCount: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

interface AxiosGetPost extends AxiosResponse {
  data: {
    posts: IPost[];
  };
}

export const getPost = async () => {
  try {
    // let response = await api.get('/post').then(res => res);
    // let data = response.data;
    // return data
    return await api.get('/post').then(({ data }: AxiosGetPost) => data.posts);
  } catch (error) {
    console.error(error);
  }
};
export const getPostById = async (id: number | string) => {
  try {
    await api.get(`/post/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const postearPost = async (postData: PostPropsAxios) => {
  try {
    await api.post('/post', { postData });
  } catch (err) {
    console.log(err);
  }
};

export const putPostById = async (title: string, tag: string, id: number | string) => {
  try {
    await api.put(`/post/${id}`, { title, tag });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (id: number | string) => {
  try {
    await api.delete(`/post/${id}`);
  } catch (err) {
    console.log(err);
  }
};
