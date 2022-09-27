import { Router } from 'express';

const userRoute = Router();

userRoute.get('/post', (req, res) => {
  res.send('test');
});

export default userRoute;
