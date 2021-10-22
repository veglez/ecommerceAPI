import express from 'express';
import handleAuth from '../middlewares/handleAuthorization.js';
import ProductService from '../services/products.js';
import ReviewsService from '../services/reviews.js';

const reviewsRouter = express.Router();

reviewsRouter.post(
  '/:productId',
  handleAuth(['user', 'admin']),
  async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user.sub;
    //payload follows the review model Schema
    const payload = { ...req.body, user: userId, product: productId };
    try {
      const review = await ReviewsService.createReview(payload);
      res.status(201).json(review).end();
      //after responding update the average score of product
      const { data } = await ReviewsService.getAllFromProduct({
        product: productId,
        selection: 'score',
      });
      const average =
        data.reduce((pv, item) => pv + item.score, 0) / data.length;
      await ProductService.updateOne(productId, { score: average.toFixed(2) });
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
