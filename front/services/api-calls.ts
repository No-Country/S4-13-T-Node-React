import { useAxios } from '../hooks/useAxios';
import { AxiosGetPost, AxiosGetPostById, PostPropsAxios } from '../interfaces';

const api = useAxios();

// Calls to posts

export const getPost = async () => {
  try {
    return await api.get('/post').then(({ data }: AxiosGetPost) => data.data.posts);
  } catch (error) {
    console.error(error);
  }
};

export const getPostById = async (id: number | string) => {
  try {
    return await api.get(`/post/${id}`).then(({ data }: AxiosGetPostById) => data.data.post);
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

// Calls to users

export const getUserPosts = async (id: number | string) => {
  try {
    if (id) {
      const response = await api.get(`/user/${id}/posts`);
      return response.data.data.user;
    }
    return 
  } catch (error) {
    console.error(error);
  }
};

export const getUserLikes = async (id: number | string) => {
  try {
    if (id) {
      const response = await api.get(`/user/${id}/likes`);
      return response.data.data.user.likes;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUserFavorites = async (id: number | string) => {
  try {
    if (id) {
      const response = await api.get(`/user/${id}/favorites`)
      return response.data.data.user;
    }
  } catch (error) {
    console.error(error);
  }
};
