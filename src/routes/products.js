import express from 'express';
import config from '../config/index.js';
import ProductService from '../services/products.js';
import handleAuth from '../middlewares/handleAuthorization.js';
import ReviewsService from '../services/reviews.js';

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
  try {
    const { id } = req.params;
    const item = await ProductService.getOne(id);
    if (!item) return next('No existe el producto');
    res.json(item).end();
  } catch (error) {
    next(error);
  }
});

router.get('/:id/reviews', async (req, res, next) => {
  const { id } = req.params;
  const item = await ProductService.getOne(id);
  if (!item) return next('No existe el item con id ', id);
  //its what needs Review schema
  const obj = { ...req.query, populate: 'user', product: id };
  try {
    const reviews = await ReviewsService.getAllFromProduct(obj);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.post('/', handleAuth(['admin']), async (req, res, next) => {
  try {
    const itemCreated = await ProductService.createOneProduct(req.body);
    res.status(201).json(itemCreated);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', handleAuth(['admin']), async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedItem = await ProductService.updateOne(id, req.body);
    res.status(202).json(updatedItem);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', handleAuth(['admin']), async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await ProductService.deleteOne(id);
    res.json({ status: 'ELIMINADO', item });
  } catch (error) {
    next(error);
  }
});

export default router;
