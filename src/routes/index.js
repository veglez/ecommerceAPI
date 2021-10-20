import { Router } from 'express';
import authRouter from './auth.js';
import productRouter from './products.js';

const router = Router();

const DefineRoutes = (app) => {
  app.use('/api/v1', router);
  router.use('/products', productRouter);
  router.use('/auth', authRouter);
};

export default DefineRoutes;
