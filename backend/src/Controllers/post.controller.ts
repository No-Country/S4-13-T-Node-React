import { Request, Response } from 'express';
import services from '../Services';

const createPost = async (req: Request, res: Response) => {
  try {
    const post = req.body;
    const result = await services.post.createPost(post);
    res.json({ message: 'Post Created Successfully.', post: result });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await services.post.getPosts();
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default { createPost, getPosts };
