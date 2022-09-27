import { Router } from 'express';

const postRoute = Router();

postRoute.get('/user', (req, res) => {
  res.send('test');
});

export default postRoute;
