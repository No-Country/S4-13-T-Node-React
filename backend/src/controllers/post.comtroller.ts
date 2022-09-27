import { Request,Response } from "express";
//import { post } from "typeorm";

export const getPosts = async (req: Request, res: Response) => {
    const{title,vide,likesCount,commentsCount,tags,user_id} = req.body;
    const post = await Post.create({
        title,
        vide,
        likesCount,
        commentsCount,
        tags,
        user_id
    }).save();
    res.json(post);
}