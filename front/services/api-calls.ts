import useAxios from '../hooks/useAxios';
import { PostPropsAxios } from '../interfaces';

const api = useAxios();

export const getPost = async () => {
  try {
    let response = await api.get('/post');
    let data = response.data;
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
export const getPostById = async (id: number | string) => {
  try {
    await api.get(`/post/${id}`).then(res => {
      console.log(res.data);
      return res;
    });
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
