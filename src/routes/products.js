import express from 'express';
import config from '../config/index.js';
import ProductService from '../services/products.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await ProductService.getAllProducts(req.query);
    res.json(products);
  } catch (error) {
    //Error: Error: pageOutOfRange, Error
    if (error.message.includes('pageOutOfRange')) {
      const url = `${config['baseURL']}/products/?page=1`;
      res.redirect(303, url);
    } else {
      next(error);
    }
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const item = await ProductService.getOne(id);
  if (!item) return next({ message: 'No existe el item, verificar ID' });
  res.json(item).end();
});

router.post('/', async (req, res, next) => {
  try {
    const itemCreated = await ProductService.createOneProduct(req.body);
    res.status(201).json(itemCreated);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedItem = await ProductService.updateOne(id, req.body);
    res.status(202).json(updatedItem);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const item = await ProductService.deleteOne(id);
  if (!item) return next('Verificar ID, no existe item');
  res.json({ status: 'ELIMINADO', item });
});

export default router;
