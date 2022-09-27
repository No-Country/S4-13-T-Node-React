import { IPost } from '@src/interfaces/db.interfaces';
import Repositories from '../Repository';

const Post = Repositories.Post;

const createPost = async (post: IPost) => {
  try {
    return await Post.createObject(post);
  } catch (error) {
    return error;
  }
};

const getPosts = async () => {
  try {
    return await Post.getObjects();
  } catch (error) {
    return error;
  }
};

export default { createPost, getPosts };
