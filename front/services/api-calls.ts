import useAxios from '../hooks/useAxios';
import { AxiosGetPost, AxiosGetPostById, PostPropsAxios } from '../interfaces';

const api = useAxios();

export const getPost = async () => {
  try {
    return await api.get('/post').then(({ data }: AxiosGetPost) => data.data.posts);
  } catch (error) {
    console.error(error);
  }
};

export const getPostById = async (id: number | string) => {
  try {
<<<<<<< HEAD
    return await api.get(`/post/${id}`).then(({ data }: AxiosGetPostById) => data.data.post);
=======
    return await api.get(`/post/${id}`).then(({data}: AxiosGetPostById) => data.data.post);
>>>>>>> d40b08905245a41eb125d59ecc54d34b03be26ef
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
