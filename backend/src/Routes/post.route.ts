import { Router } from 'express';
import controllers from '../Controllers';

const postRoute = Router();

postRoute.route('/post').post(controllers.post.createPost).get(controllers.post.getPosts);

postRoute.route('/post/:id').get(controllers.post.getPostById).put(controllers.post.updatePost);

export default postRoute;
