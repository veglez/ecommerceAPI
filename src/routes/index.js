import { Router } from 'express';
import authRouter from './auth.js';
import productRouter from './products.js';
import reviewsRouter from './reviews.js';

const router = Router();

const DefineRoutes = (app) => {
  app.use('/api/v1', router);
  router.use('/products', productRouter);
  router.use('/auth', authRouter);
  router.use('/reviews', reviewsRouter);
};

export default DefineRoutes;
