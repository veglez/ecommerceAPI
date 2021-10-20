import Product from '../models/product.js';

class ProductService {
  /**
   * return requested documents paginated
   * @param {object} query Is an Object of type express.request.query
   * @returns {Paginator}
   */
  static async getAllProducts(query) {
    try {
      const paginator = await Product.paginate(query);
      return paginator;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getOne(id) {
    const item = await Product.findById(id);
    return item;
  }

  static async updateOne(id, payload) {
    const item = await Product.findByIdAndUpdate(id, payload, { new: true });
    return item;
  }

  static async createOneProduct(payload) {
    const item = new Product(payload);
    const savedItem = await item.save();
    return savedItem;
  }

  static async deleteOne(id) {
    const removed = await Product.findByIdAndDelete(id);
    return removed;
  }
}

export default ProductService;
