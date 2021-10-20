import Review from '../models/review';

class ReviewsService {
  static async getAllFromProduct(productId) {
    const reviews = await Review.find({ product: productId });
    return reviews;
  }

  static async getAllFromUser(userId) {
    const reviews = await Review.find({ user: userId });
    return reviews;
  }
}

export default ReviewsService;
