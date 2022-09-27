import { Router } from 'express';
import controllers from '../Controllers';

const postRoute = Router();

postRoute.route('/post').post(controllers.post.createPost).get(controllers.post.getPosts);

export default postRoute;
