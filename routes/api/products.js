import express from 'express';
import products from '../../api/products/index.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(products);
});

router.post('/', (req, res) => {
  const item = req.body;
  console.log(item);
  res.json(item);
});

export default router;
