import { Review } from '../models/index.js';

class ReviewsService {
  /**
   * Get a paginated reviews for a specific product Id
   * @param {Object} param paginate Object
   * @see projectPath ./src/plugins/paginator.js
   */
  static async getAllFromProduct(param) {
    const reviews = await Review.paginate(param);
    return reviews;
  }

  static async getAllFromUser(userId) {
    const reviews = await Review.find({ user: userId });
    return reviews;
  }

  static async createReview(payload) {
    const itemCreated = new Review(payload);
    const savedItem = await itemCreated.save();
    return savedItem;
  }

  static async delete(id) {
    const removed = await Review.findByIdAndDelete(id);
    return removed;
  }

  static async getAll(params) {
    const updatedParams = { ...params, populate: 'user' };
    const reviews = await Review.paginate(updatedParams);
    return reviews;
  }
}

export default ReviewsService;
