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

const getPostById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const post = await services.post.getPostById(id);
    return res.json({ post });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const post=await services.post.updatePost(id,data);
    return res.json({post});
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default { createPost, getPosts, getPostById,updatePost };
