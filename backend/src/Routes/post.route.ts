import { Router } from 'express';
import controllers from '../Controllers';

const postRoute = Router();

postRoute.route('/post').post(controllers.post.createPost);

export default postRoute;
