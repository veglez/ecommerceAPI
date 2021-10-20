import mongoose from 'mongoose';
import paginate from '../plugins/paginator.js';

const Image = new mongoose.Schema({
  src: String,
  alt: String,
});

Image.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: async function (name) {
          try {
            const item = await this.constructor.findOne({ name });
            if (item && item.name === name) {
              return false;
            }
            return true;
          } catch (e) {
            return false;
          }
        },
        message: `{VALUE} already exists in database`,
      },
    },
    thumbnail: { type: Image, required: true },
    score: { type: Number, default: 0 },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    percentageOff: { type: Number, default: 0 },
    images: [{ type: Image, required: true }],
    specifications: [
      {
        key: { type: String, required: true, lowercase: true, trim: true },
        value: { type: String, required: true },
      },
    ],
    options: [
      {
        header: { type: String, required: true },
        values: [{ type: String, required: true }],
      },
    ],
    description: { type: String, default: '', trim: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(paginate);

productSchema.set('toJSON', {
  transform: (document, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
