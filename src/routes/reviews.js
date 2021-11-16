import express from 'express';
import config from '../config/index.js';
import handleAuth from '../middlewares/handleAuthorization.js';
import handleImageUpload from '../middlewares/handleImageUpload.js';
import ProductService from '../services/products.js';
import ReviewsService from '../services/reviews.js';

const reviewsRouter = express.Router();

reviewsRouter.get('/', async (req, res, next) => {
  try {
    const reviews = await ReviewsService.getAll(req.query);
    res.json(reviews).end();
  } catch (error) {
    next(error);
  }
});

reviewsRouter.post(
  '/:productId',
  handleAuth(['user', 'admin']),
  handleImageUpload.array(config.fileInput),
  async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user.sub;
    //check if product exists
    const product = await ProductService.getOne(productId);
    if (!product) return next('No existe el producto');
    let images = [];
    //adding the user photos
    req.files.forEach((p) => {
      const src = `${config.host}:${config.port}/savedImages/${p.filename}`;
      const alt = `${p.originalname} photo from ${
        req.user.username
      } on ${new Date().toISOString()}`;
      const photo = {
        src,
        alt,
      };
      images = [...images, photo];
    });
    //payload follows the review model Schema
    const payload = { ...req.body, images, user: userId, product: product.id };
    try {
      const review = await ReviewsService.createReview(payload);
      res.status(201).json(review).end();
      //after responding update the average score of product
      const { data } = await ReviewsService.getAllFromProduct({
        product: product.id,
        selection: 'score',
      });
      const average =
        data.reduce((pv, item) => pv + item.score, 0) / data.length;
      await ProductService.updateOne(product.id, { score: average.toFixed(2) });
    } catch (error) {
      next(error);
    }
  }
);

reviewsRouter.delete(
  '/:reviewId',
  handleAuth(['user', 'admin']),
  async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const removed = await ReviewsService.delete(reviewId);
      res.json({ message: 'item deleted successfully', item: removed });
    } catch (error) {
      next(error);
    }
  }
);

export default reviewsRouter;
