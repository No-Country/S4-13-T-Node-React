import { IPost } from '@src/interfaces/db.interfaces';
import Repositories from '../Repository';

const Post = Repositories.Post;

const createPost = async (post: IPost) => {
  try {
    return await Post.create(post);
  } catch (error) {
    return error;
  }
};

const getPosts = async () => {
  try {
    return await Post.list();
  } catch (error) {
    return error;
  }
};

const getPostById = async (id: number) => {
  try {
    return await Post.get(id);
  } catch (error) {
    return error;
  }
};

export default { createPost, getPosts, getPostById };
