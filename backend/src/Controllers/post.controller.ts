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

export default { createPost };
